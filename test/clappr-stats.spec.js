import { expect, assert } from 'chai'

import ClapprStats from '../src/clappr-stats'
import { PlayerSimulator } from './util'

import sinon from 'sinon'

const randomNumber = (max=20, min=5) => {
  let number = Math.random() * (max - min) + min
  return Math.trunc(number)
}

describe('Clappr Stats', function() {

  before(function() {
    this.timeInterval = 100
    this.clock = sinon.useFakeTimers(Date.now())
  })

  after(function() {
    this.clock.restore()
  })

  beforeEach(function() {
    this.callback = sinon.spy()
    this.callbackOptions = sinon.spy()
    this.options = {
      src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      clapprStats: {
        runEach: this.timeInterval,
        onCompletion: [10, 25, 50, 100],
        onReport: this.callbackOptions
      }
    }

    this.simulator = new PlayerSimulator(this.options, ClapprStats)
    this.plugin = this.simulator.plugin
  })

  it('call callbackOption when REPORT_EVENT is fired', function() {
    this.simulator.play()
    this.clock.tick(this.timeInterval)

    assert.isOk(this.callbackOptions.called)
  })

  it('call REPORT_EVENT every time interval', function() {
    this.plugin.on(ClapprStats.REPORT_EVENT, this.callback)
    let attempts = randomNumber()

    this.simulator.play()
    this.clock.tick(this.timeInterval)

    assert.isOk(this.callback.called)
    for(let i = 0; i < attempts; i++) {
      this.clock.tick(this.timeInterval)
      let metrics = this.callback.getCall(i).args[0]

      assert.isObject(metrics.counters)
      assert.isObject(metrics.extra)
      assert.isObject(metrics.timers)
    }
  })

  it('call PERCENTAGE_EVENT when PLAYBACK_TIMEUPDATE event is fired', function() {
    this.plugin.on(ClapprStats.PERCENTAGE_EVENT, this.callback)

    this.simulator.play(10)

    let percentage = this.callback.getCall(0).args[0]

    expect(percentage).to.be.equal(25)
  })

  it('call PERCENTAGE_EVENT if video start in middle time and make seek for past', function() {
    this.plugin.on(ClapprStats.PERCENTAGE_EVENT, this.callback)

    this.simulator.play(10)
    assert.isOk(this.callback.calledOnce)

    this.simulator.play(4)
    assert.isOk(this.callback.calledTwice)
  })

  it('call PERCENTAGE_EVENT once with the same state', function() {
    this.plugin.on(ClapprStats.PERCENTAGE_EVENT, this.callback)

    this.simulator.play(4)
    assert.isOk(this.callback.calledOnce)

    this.simulator.play(4)
    assert.isOk(this.callback.calledOnce)
  })

  it('should update counters', function() {
    this.plugin.on(ClapprStats.REPORT_EVENT, this.callback)

    this.simulator.play()
    this.simulator.enableFullscreen()
    this.simulator.pause()
    this.simulator.simulateError()
    this.simulator.seek(15)
    this.clock.tick(this.timeInterval)

    let metrics = this.callback.getCall(0).args[0]

    expect(metrics.counters.play).to.be.equal(1)
    expect(metrics.counters.buffering).to.be.equal(1)
    expect(metrics.counters.changeLevel).to.be.equal(1)
    expect(metrics.counters.pause).to.be.equal(1)
    expect(metrics.counters.error).to.be.equal(1)
    expect(metrics.counters.seek).to.be.equal(1)
    expect(metrics.counters.dvrUsage).to.be.equal(1)
    expect(metrics.counters.fullscreen).to.be.equal(1)
  })

  it('should update timer', function() {
    this.plugin.on(ClapprStats.REPORT_EVENT, this.callback)

    this.simulator.play()
    this.clock.tick(this.timeInterval)

    let metrics = this.callback.getCall(0).args[0]

    expect(metrics.timers.startup).to.be.an('number')
    expect(metrics.timers.watch).to.be.an('number')
    expect(metrics.timers.session).to.be.an('number')
  })
})
