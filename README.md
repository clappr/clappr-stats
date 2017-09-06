[![npm version](https://badge.fury.io/js/clappr-stats.svg)](https://badge.fury.io/js/clappr-stats)
[![license](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)

# Usage

You can use it from JSDelivr `https://cdn.jsdelivr.net/npm/clappr-stats@latest/dist/clappr-stats.min.js` or as a npm package.

```html
<script>
    var player = new Clappr.Player({
      parentId: '#player',
      plugins: [ClapprStats],
      source: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      height: 360,
      width: 640,
      clapprStats: {
        // optional: time in miliseconds for each report.
        // default: 5000
        runEach: 5000,
        // optional: callback function.
        // default: console.log
        onReport: (metrics) => {console.log(metrics)},
        // Fire PERCENTAGE_EVENT when video complete some percentage.
        // default: []
        onCompletion: [10, 20, 55, 100],
        // optional: provide an img uri hosted at the same place as your farm
        // or near of it prefferable 1x1px, without caching.
        // default: none
        uriToMeasureLatency: 'http://www.example.com/images/tv/pixel-1x1-red.gif',
        // optional: provide some assets uris hosted at the same place as your farm
        // or near of it prefferable in an uncompressible file format, without caching.
        // default: none
        urisToMeasureBandwidth: [
          {url: 'http://www.example.com/images/tv/500kb.jpg', timeout: 3000},
          {url: 'http://www.example.com/images/tv/1mb.jpg', timeout: 6000},
          {url: 'http://www.example.com/images/tv/5mb.jpg', timeout: 12000}
        ],
        // optional: number of reports between two consecutive bandwidth tests.
        // default: 10
        runBandwidthTestEvery: 10
      }
    })
</script>
```

# Metrics

```javascript
{
  counters: {
    play: 0, // number of plays
    pause: 0, // number of pauses
    error: 0, // number of errors
    buffering: 0, // number of bufferings
    decodedFrames: 0, // number of decoded frames (when available)
    droppedFrames: 0, // number of dropped frames (when available)
    fps: 0, // frames per second (when available)
    changeLevel: 0, // number of adaptative bitrate changes
    seek: 0, // number of seeks
    fullscreen: 0, // number of times that user went to fullscreen
    dvrUsage: 0 // number of time that user used dvr seek (at live stream)
  },
  timers: {
    startup: 0, // time (ms) since user click/touch play (intent to play) to the play
    watch: 0, // time (ms) of watched content (does not include pause and buffering)
    pause: 0, // time (ms) of paused content
    buffering: 0, // time (ms) of buffering
    session: 0, // time (ms) of session (sum of watch+pause+buffering)
    latency: 0, // time (ms) of latency between user and the provided uri
  },
  extra: {
    playbackName: '', // playback name (hls, html5_video, flashls)
    playbackType: '', // vod or live
    buffersize: 0, // buffersize in ms
    duration: 0, // duration time in ms
    currentTime: 0, // current time in ms
    bitratesHistory: [], // the bitrates changes history
    bitrateWeightedMean: 0, // bitrate weighted mean (bps)
    bitrateMostUsed: 0, // most used (based on time) bitrate (bps)
    watchHistory: [], // an array of an array of watched range time ex: [0, 2200]
    watchedPercentage: 0, // % of watched time
    bufferingPercentage: 0, // % of buffering time
    bandwidth: 0, // user bandwidth (bps)
  }
}
```
