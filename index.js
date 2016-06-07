import {ContainerPlugin, Log, Events} from 'clappr'
import get from 'lodash.get'

const PLAYING = 0, PAUSED = 1, BUFFERING = 2
const REPORT_EVENT = 'clappr:stats:report'

export default class ClapprStats extends ContainerPlugin {
  get name() { return 'clappr_stats' }

  get _playbackName() {return this.container.playback.name}
  get _playbackType() {return this.container.getPlaybackType()}
  _now() {
    var hasPerformanceSupport = performance && typeof(performance.now) === "function"
    return (hasPerformanceSupport)?performance.now():new Date()
  }
  _inc(counter) {this._metrics.counters[counter] += 1}
  _start(timer) {this[`_start${timer}`] = this._now()}
  _stop(timer) {this._metrics.timers[timer] += this._now() - this[`_start${timer}`]}
  _defaultReport(metrics) {console.log(metrics)}

  constructor(container) {
    super(container)
    this._runEach = get(container, 'options.clapprStats.runEach', 5000)
    this._onReport = get(container, 'options.clapprStats.onReport', this._defaultReport)
    this._uriToMeasureLatency = get(container, 'options.clapprStats.uriToMeasureLatency')

    this._metrics = {
      counters: {
	play: 0, pause: 0, error: 0, buffering: 0, decodedFrames: 0, droppedFrames: 0,
	fps: 0, changeLevel: 0, seek: 0, fullscreen: 0, dvrUsage: 0
      },
      timers: {
	startup: 0, watch: 0, pause: 0, buffering: 0, session: 0, latency: 0
      },
      extra: {playbackName: '', playbackType: '', lastBitrate: ''} //buffersize, all playbacks???
    }

    this.on(REPORT_EVENT, this._onReport)
  }

  bindEvents() {
    this.listenTo(this.container, Events.CONTAINER_BITRATE, this.onBitrate)
    this.listenTo(this.container, Events.CONTAINER_STOP, this.stopReporting)
    this.listenTo(this.container, Events.CONTAINER_ENDED, this.stopReporting)
    this.listenToOnce(this.container, Events.CONTAINER_PLAY, this.startTimers)
    this.listenTo(this.container, Events.CONTAINER_PLAY, () => this._state === PAUSED && this.playAfterPause())
    this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay)
    this.listenTo(this.container, Events.CONTAINER_PAUSE, this.onPause)
    this.listenToOnce(this.container, Events.CONTAINER_TIMEUPDATE, this.startStartup)
    this.listenTo(this.container, Events.CONTAINER_TIMEUPDATE, () => this._state === PLAYING && this.onContainerUpdateWhilePlaying())
    this.listenToOnce(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering)
    this.listenTo(this.container, Events.CONTAINER_SEEK, () => this._inc('seek'))
    this.listenTo(this.container, Events.CONTAINER_ERROR, () => this._inc('error'))
    this.listenTo(this.container, Events.CONTAINER_FULLSCREEN, () => this._inc('fullscreen'))
    this.listenTo(this.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, (dvrInUse) => {dvrInUse && this._inc('dvrUsage')})
  }

  onBitrate(bitrate) {
    this._metrics.extra.lastBitrate = get(bitrate, 'height', '')
    this._inc('changeLevel')
  }

  stopReporting() {
    this._buildReport()
    clearInterval(this._intervalId)
  }

  startTimers() {
    this._intervalId = setInterval(this._buildReport.bind(this), this._runEach)
    this._start('session')
    this._start('watch')
    this._start('startup')
  }

  playAfterPause() {
    this._stop('pause')
    this._start('watch')
  }

  onPlay() {
    this._inc('play')
    this._state = PLAYING
  }

  onPause() {
    this._start('pause')
    this._inc('pause')
    this._state = PAUSED
  }

  startStartup() {this._startstartup !== undefined && this._stop('startup')}

  onContainerUpdateWhilePlaying() {
    this._stop('watch')
    this._start('watch')
  }

  onBuffering() {
    this._state = BUFFERING
    this._inc('buffering')
    this._start('buffering')
    this.listenToOnce(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferfull)
  }

  onBufferfull() {
    this._state = PLAYING
    this._stop('buffering')
    this.listenToOnce(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering)
  }

  _buildReport() {
    this._stop('session')
    this._start('session')

    this._fetchExtras()

    this.trigger(REPORT_EVENT, this._metrics)
  }

  _fetchExtras() {
    // flashls ??? - hls.droppedFramesl hls.stream.bufferLength (seconds)
    // hls ??? (use the same?)
    var videoTag = this.container.playback.el
    var decodedFrames = videoTag.webkitDecodedFrameCount || videoTag.mozDecodedFrames || 0
    var droppedFrames = (videoTag.webkitDroppedFrameCount || (videoTag.mozParsedFrames - videoTag.mozDecodedFrames)) || 0
    var decodedFramesLastTime = decodedFrames - (this._lastDecodedFramesCount || 0)

    this._metrics.counters.decodedFrames = decodedFrames
    this._metrics.counters.droppedFrames = droppedFrames
    this._metrics.counters.fps = decodedFramesLastTime / (this._runEach/1000)

    this._lastDecodedFramesCount = decodedFrames

    this._metrics.extra.playbackName = this._playbackName
    this._metrics.extra.playbackType = this._playbackType
  }

  // originally from https://www.smashingmagazine.com/2011/11/analyzing-network-characteristics-using-javascript-and-the-dom-part-1/
  _measureLatency(imageURI) {
    if (this._uriToMeasureLatency) {
      var t=[], n=2, tcp, rtt;
      var ld = function() {
	t.push(this._now());
	if(t.length > n)
	  done(); // ????
	else {
	  var img = new Image;
	  img.onload = ld;
	  img.src=imageURI + '?' + Math.random()
	  + '=' + this._now();
	}
      };
      var done = function() {
	rtt=t[2]-t[1];
	tcp=t[1]-t[0]-rtt;
      };
      ld();
    }
  }
}
