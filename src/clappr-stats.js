import {ContainerPlugin, Events, Log} from 'clappr'
import get from 'lodash.get'


export default class ClapprStats extends ContainerPlugin {
  get name() { return 'clappr_stats' }

  get _playbackName() {return this.container.playback.name}
  get _playbackType() {return this.container.getPlaybackType()}
  _now() {
    const hasPerformanceSupport = window.performance && typeof(window.performance.now) === 'function'
    return (hasPerformanceSupport)?window.performance.now():new Date()
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
    this._urisToMeasureBandwidth = get(container, 'options.clapprStats.urisToMeasureBandwidth')
    this._runBandwidthTestEvery = get(container, 'options.clapprStats.runBandwidthTestEvery', 10)
    this._bwMeasureCount = 0

    this._completion = {
      watch: get(container, 'options.clapprStats.onCompletion', []),
      calls: []
    }

    this._newMetrics()
    this.on(ClapprStats.REPORT_EVENT, this._onReport)
  }

  bindEvents() {
    this.listenTo(this.container, Events.CONTAINER_BITRATE, this.onBitrate)
    this.listenTo(this.container, Events.CONTAINER_STOP, this.stopReporting)
    this.listenTo(this.container, Events.CONTAINER_ENDED, this.stopReporting)
    this.listenToOnce(this.container.playback, Events.PLAYBACK_PLAY_INTENT, this.startTimers)
    this.listenToOnce(this.container, Events.CONTAINER_PLAY, this.onFirstPlaying)
    this.listenTo(this.container, Events.CONTAINER_PLAY, this.onPlay)
    this.listenTo(this.container, Events.CONTAINER_PAUSE, this.onPause)
    this.listenToOnce(this.container, Events.CONTAINER_STATE_BUFFERING, this.onBuffering)
    this.listenTo(this.container, Events.CONTAINER_SEEK, this.onSeek)
    this.listenTo(this.container, Events.CONTAINER_ERROR, () => this._inc('error'))
    this.listenTo(this.container, Events.CONTAINER_FULLSCREEN, () => this._inc('fullscreen'))
    this.listenTo(this.container, Events.CONTAINER_PLAYBACKDVRSTATECHANGED, (dvrInUse) => {dvrInUse && this._inc('dvrUsage')})
    this.listenTo(this.container.playback, Events.PLAYBACK_PROGRESS, this.onProgress)
    this.listenTo(this.container.playback, Events.PLAYBACK_TIMEUPDATE, this.onTimeUpdate)
  }

  onBitrate(newBitrate) {
    var bitrate = parseInt(get(newBitrate, 'bitrate', 0), 10)
    var now = this._now()

    if (this._metrics.extra.bitratesHistory.length > 0) {
      var beforeLast = this._metrics.extra.bitratesHistory[this._metrics.extra.bitratesHistory.length-1]
      beforeLast.end = now
      beforeLast.time = now - beforeLast.start
    }

    this._metrics.extra.bitratesHistory.push({start: this._now(), bitrate: bitrate})

    this._inc('changeLevel')
  }

  stopReporting() {
    this._buildReport()

    clearInterval(this._intervalId)
    this._newMetrics()

    this.stopListening()
    this.bindEvents()
  }

  startTimers() {
    this._intervalId = setInterval(this._buildReport.bind(this), this._runEach)
    this._start('session')
    this._start('startup')
  }

  onFirstPlaying() {
    this.listenTo(this.container, Events.CONTAINER_TIMEUPDATE, this.onContainerUpdateWhilePlaying)

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
    this._stop('watch')
    this._start('pause')
    this._inc('pause')
    this.listenToOnce(this.container, Events.CONTAINER_PLAY, this.playAfterPause)
  }

  onSeek(e) {
    this._inc('seek')
    this._metrics.extra.watchHistory.push([e * 1000, e * 1000])
  }

  onTimeUpdate(e) {
    var current = e.current * 1000,
        total = e.total * 1000,
        l = this._metrics.extra.watchHistory.length

    this._metrics.extra.duration = total
    this._metrics.extra.currentTime = current
    this._metrics.extra.watchedPercentage = (current / total) * 100

    if (l === 0) {
      this._metrics.extra.watchHistory.push([current, current])
    } else {
      this._metrics.extra.watchHistory[l-1][1] = current
    }

    if (this._metrics.extra.bitratesHistory.length > 0) {
      var lastBitrate = this._metrics.extra.bitratesHistory[this._metrics.extra.bitratesHistory.length-1]
      if (!lastBitrate.end) {
        lastBitrate.time = this._now() - lastBitrate.start
      }
    }

    this._onCompletion()
  }

  onContainerUpdateWhilePlaying() {
    if (this.container.playback.isPlaying()) {
      this._stop('watch')
      this._start('watch')
    }
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

  onProgress(progress) {
    this._metrics.extra.buffersize = progress.current * 1000
  }

  _newMetrics() {
    this._metrics = {
      counters: {
        play: 0, pause: 0, error: 0, buffering: 0, decodedFrames: 0, droppedFrames: 0,
        fps: 0, changeLevel: 0, seek: 0, fullscreen: 0, dvrUsage: 0
      },
      timers: {
        startup: 0, watch: 0, pause: 0, buffering: 0, session: 0, latency: 0
      },
      extra: {
        playbackName: '', playbackType: '', bitratesHistory: [], bitrateWeightedMean: 0,
        bitrateMostUsed: 0, buffersize: 0, watchHistory: [], watchedPercentage: 0,
        bufferingPercentage: 0, bandwidth: 0, duration: 0, currentTime: 0
      }
    }
  }

  _onCompletion() {
    let currentPercentage = this._metrics.extra.watchedPercentage
    let allPercentages = this._completion.watch
    let isCalled = this._completion.calls.indexOf(currentPercentage) != -1

    if (allPercentages.indexOf(currentPercentage) != -1 && !isCalled) {
      Log.info(this.name + ' PERCENTAGE_EVENT: ' + currentPercentage)
      this._completion.calls.push(currentPercentage)
      this.trigger(ClapprStats.PERCENTAGE_EVENT, currentPercentage)
    }
  }

  _buildReport() {
    this._stop('session')
    this._start('session')

    this._metrics.extra.playbackName = this._playbackName
    this._metrics.extra.playbackType = this._playbackType

    this._calculateBitrates()
    this._calculatePercentages()
    this._fetchFPS()
    this._measureLatency()
    this._measureBandwidth()

    this.trigger(ClapprStats.REPORT_EVENT, JSON.parse(JSON.stringify(this._metrics)))
  }

  _fetchFPS() {
    // flashls ??? - hls.droppedFramesl hls.stream.bufferLength (seconds)
    // hls ??? (use the same?)
    const fetchFPS = {
      'html5_video': this._html5FetchFPS,
      'hls': this._html5FetchFPS,
      'dash_shaka_playback': this._html5FetchFPS
    }

    fetchFPS[this._playbackName] && fetchFPS[this._playbackName].call(this)
  }

  _calculateBitrates() {
    var totalTime = this._metrics.extra.bitratesHistory.map((x) => x.time).reduce((a,b) => a + b, 0)
    this._metrics.extra.bitrateWeightedMean = this._metrics.extra.bitratesHistory.map((x) => {
      return x.bitrate * x.time
    }).reduce((a,b) => a + b, 0) / totalTime

    if (this._metrics.extra.bitratesHistory.length > 0) {
      this._metrics.extra.bitrateMostUsed = this._metrics.extra.bitratesHistory.slice().sort((a,b) => a.time < b.time)[0].bitrate
    }
  }

  _calculatePercentages() {
     if (this._metrics.extra.duration > 0) {
       this._metrics.extra.bufferingPercentage = (this._metrics.timers.buffering / this._metrics.extra.duration) * 100
     }
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

  // originally from https://www.smashingmagazine.com/2011/11/analyzing-network-characteristics-using-javascript-and-the-dom-part-1/
  _measureBandwidth() {
    if (this._urisToMeasureBandwidth && (this._bwMeasureCount % this._runBandwidthTestEvery == 0)) {
      var i = 0

      var ld = (e) => {
        if (i > 0) {
          this._urisToMeasureBandwidth[i-1].end = this._now()
          clearTimeout(this._urisToMeasureBandwidth[i-1].timer)
        }
        if (i >= this._urisToMeasureBandwidth.length || (i > 0 && this._urisToMeasureBandwidth[i-1].expired))
          done(e)
        else {
          var xhr = new XMLHttpRequest()
          xhr.open('GET', this._urisToMeasureBandwidth[i].url, true)
          xhr.responseType = 'arraybuffer'
          xhr.onload = xhr.onabort = ld
          this._urisToMeasureBandwidth[i].start = this._now()
          this._urisToMeasureBandwidth[i].timer = setTimeout((j) => {
            this._urisToMeasureBandwidth[j].expired = true
            xhr.abort()
          }, this._urisToMeasureBandwidth[i].timeout, i)
          xhr.send()
        }
        i++
      }

      var done = (e) => {
        var timeSpent = (this._urisToMeasureBandwidth[i-1].end - this._urisToMeasureBandwidth[i-1].start) / 1000
        var bandwidthBps = (e.loaded * 8) / timeSpent
        var bandwidthKbps = bandwidthBps / 1000
        this._metrics.extra.bandwidth = bandwidthKbps
        this._urisToMeasureBandwidth.forEach((x) => {
          x.start = 0
          x.end = 0
          x.expired = false
          clearTimeout(x.timer)
        })
      }

      ld()
    }
    this._bwMeasureCount++
  }
}

ClapprStats.REPORT_EVENT = 'clappr:stats:report'
ClapprStats.PERCENTAGE_EVENT = 'clappr:stats:percentage'
