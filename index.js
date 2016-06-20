import {ContainerPlugin, Events} from 'clappr'
import get from 'lodash.get'

const REPORT_EVENT = 'clappr:stats:report'

export default class ClapprStats extends ContainerPlugin {
  get name() { return 'clappr_stats' }

  get _playbackName() {return this.container.playback.name}
  get _playbackType() {return this.container.getPlaybackType()}
  _now() {
    const hasPerformanceSupport = performance && typeof(performance.now) === 'function'
    return (hasPerformanceSupport)?performance.now():new Date()
  }
  _inc(counter) {this._metrics.counters[counter] += 1}
  _timerHasStarted(timer){return this[`_start${timer}`] !== undefined}
  _start(timer) {this[`_start${timer}`] = this._now()}
  _stop(timer) {this._metrics.timers[timer] += this._now() - this[`_start${timer}`]}
  _defaultReport(metrics) {console.log(metrics)} //eslint-disable-line no-console

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
      extra: {
        playbackName: '', playbackType: '', bitratesHistory: [], bitrateMean: 0,
        bitrateVariance: 0, bitrateStandardDeviation: 0, bitrateMostUsed: 0,
        buffersize: 0
      }
    }

    this.on(REPORT_EVENT, this._onReport)
  }

  bindEvents() {
    this.listenTo(this.container, Events.CONTAINER_BITRATE, this.onBitrate)
    this.listenTo(this.container, Events.CONTAINER_STOP, this.stopReporting)
    this.listenTo(this.container, Events.CONTAINER_ENDED, this.stopReporting)
    this.listenToOnce(this.container.playback, Events.PLAYBACK_PLAY_INTENT, this.startTimers)
    this.listenToOnce(this.container, Events.CONTAINER_PLAY, this.onFirstPlaying)
    this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay)
    this.listenTo(this.container, Events.CONTAINER_PAUSE, this.onPause)
    this.listenTo(this.container, Events.CONTAINER_TIMEUPDATE, (e) => e.current > 0 && this.onContainerUpdateWhilePlaying())
    this.listenToOnce(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering)
    this.listenTo(this.container, Events.CONTAINER_SEEK, () => this._inc('seek'))
    this.listenTo(this.container, Events.CONTAINER_ERROR, () => this._inc('error'))
    this.listenTo(this.container, Events.CONTAINER_FULLSCREEN, () => this._inc('fullscreen'))
    this.listenTo(this.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, (dvrInUse) => {dvrInUse && this._inc('dvrUsage')})
    this.once(REPORT_EVENT, this._fetchLatency)
    this.listenTo(this.container.playback, Events.PLAYBACK_PROGRESS, this.onProgress)
  }

  onBitrate(bitrate) {
    var height = parseInt(get(bitrate, 'height', 0), 10)
    var now = this._now()

    if (this._metrics.extra.bitratesHistory.length > 0) {
      var beforeLast = this._metrics.extra.bitratesHistory[this._metrics.extra.bitratesHistory.length-1]
      beforeLast.end = now
      beforeLast.time = now - beforeLast.start
    }

    this._metrics.extra.bitratesHistory.push({start: this._now(), height: height})

    this._inc('changeLevel')
  }

  stopReporting() {
    this._buildReport()
    clearInterval(this._intervalId)
  }

  startTimers() {
    this._intervalId = setInterval(this._buildReport.bind(this), this._runEach)
    this._start('session')
    this._start('startup')
  }

  onFirstPlaying() {
    this._start('watch')
    this._stop('startup')
  }

  playAfterPause() {
    this._stop('pause')
    this._start('watch')
  }

  onPlay() {
    this._inc('play')
  }

  onPause() {
    this._start('pause')
    this._inc('pause')
    this.listenToOnce(this.container, Events.CONTAINER_PLAY, this.playAfterPause)
  }

  onContainerUpdateWhilePlaying() {
    this._stop('watch')
    this._start('watch')
  }

  onBuffering() {
    this._inc('buffering')
    this._start('buffering')
    this.listenToOnce(this.container, Events.CONTAINER_STATE_BUFFERFULL, this.onBufferfull)
  }

  onBufferfull() {
    this._stop('buffering')
    this.listenToOnce(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering)
  }

  //measuring only two times is enough => "take(2)" of events
  _fetchLatency() {
    this._measureLatency()
    this.once(REPORT_EVENT, this._measureLatency)
  }

  onProgress(progress) {
    this._metrics.extra.buffersize = progress.current * 1000
  }

  _buildReport() {
    this._stop('session')
    this._start('session')

    this._fetchExtras()

    this.trigger(REPORT_EVENT, JSON.parse(JSON.stringify(this._metrics)))
  }

  _fetchExtras() {
    // flashls ??? - hls.droppedFramesl hls.stream.bufferLength (seconds)
    // hls ??? (use the same?)
    const fetchFPS = {
      'html5_video': this._html5FetchFPS,
      'hls': this._html5FetchFPS,
      'dash_shaka_playback': this._html5FetchFPS
    }

    fetchFPS[this._playbackName] && fetchFPS[this._playbackName].call(this)

    this._metrics.extra.playbackName = this._playbackName
    this._metrics.extra.playbackType = this._playbackType

    var bitrates = this._metrics.extra.bitratesHistory.map((x) => x.height)

    this._metrics.extra.bitrateMean = bitrates.reduce((a,b) => a + b, 0) / bitrates.length

    this._metrics.extra.bitrateVariance = bitrates.map((n) => {
      return Math.pow(n - this._metrics.extra.bitrateMean, 2)
    }).reduce((a,b) => a + b, 0) / bitrates.length

    this._metrics.extra.bitrateStandardDeviation = Math.sqrt(this._metrics.extra.bitrateVariance)
    this._metrics.extra.bitrateMostUsed = this._metrics.extra.bitratesHistory.sort((a,b) => a.time < b.time)[0]
  }

  _html5FetchFPS() {
    const videoTag = this.container.playback.el
    const decodedFrames = videoTag.webkitDecodedFrameCount || videoTag.mozDecodedFrames || 0
    const droppedFrames = (videoTag.webkitDroppedFrameCount || (videoTag.mozParsedFrames - videoTag.mozDecodedFrames)) || 0
    const decodedFramesLastTime = decodedFrames - (this._lastDecodedFramesCount || 0)

    this._metrics.counters.decodedFrames = decodedFrames
    this._metrics.counters.droppedFrames = droppedFrames
    this._metrics.counters.fps = decodedFramesLastTime / (this._runEach / 1000)

    this._lastDecodedFramesCount = decodedFrames
  }

  // originally from https://www.smashingmagazine.com/2011/11/analyzing-network-characteristics-using-javascript-and-the-dom-part-1/
  _measureLatency() {
    if (this._uriToMeasureLatency) {
      var t=[], n=2, rtt
      var ld = () => {
        t.push(this._now())
        if(t.length > n)
          done()
        else {
          var img = new Image
          img.onload = ld
          img.src=this._uriToMeasureLatency + '?' + Math.random()
          + '=' + this._now()
        }
      }
      var done = () => {
        rtt=t[2]-t[1]
        this._metrics.timers.latency = rtt
      }
      ld()
    }
  }
}
