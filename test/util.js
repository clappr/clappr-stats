import { HTML5Video, Container, Events } from 'clappr'


class PlayerSimulator {

  constructor(options, plugin) {
    this.playback = new HTML5Video(options)
    options.playback = this.playback
    this.container = new Container(options)
    this.plugin = new plugin(this.container)
    this.container.addPlugin(this.plugin)
  }

  play(time=2, total=40) {
    this.container.play()
    this.container.onBuffering()
    this.container.progress({current: 50})
    this.container.playing()
    this.container.updateBitrate(480)
    this.playback.trigger(Events.PLAYBACK_TIMEUPDATE, {current: time, total: total})
  }

  pause() {
    this.container.pause()
    this.container.paused()
  }

  stop() {
    this.container.stop()
    this.container.stopped()
  }

  seek(time) {
    this.container.seek(time)
    this.container.playbackDvrStateChanged({})
  }

  simulateError() {
    this.container.error({})
  }

  enableFullscreen() {
    this.container.fullscreen()
  }
}

export {
  PlayerSimulator
}
