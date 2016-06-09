# Usage

```html
<script>
    var player = new Clappr.Player({
      parentId: '#player',
      plugins: [ClapprStats],
      source: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      height: 360,
      width: 640,
      clapprStats: {
        runEach: 5000, //optional: time in miliseconds for each report default:  5000
        onReport: (metrics) => {console.log(metrics)}, //optional: callback function default: console.log
        uriToMeasureLatency: 'http://www.example.com/images/tv/pixel-1x1-red.gif', //optional: provide an img uri hosted at the same place as your farm or near of it prefferable 1x1px, without caching. default: none
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
    dvrUsage: 0 // number of time taht user used dvr seek (at live stream)
  },
  timers: {
    startup: 0, // time (ms) since user click/touch play (intent to play) to the play
    watch: 0, // time (ms) of watched content (does not include pause and buffering)
    pause: 0, // time (ms) of paused content
    buffering: 0, // time (ms) of buffering
    session: 0, // time (ms) of session (sum of watch+pause+buffering)
    latency: 0, // time (ms) of latency between user and the uri provided
  },
  extra: {
    playbackName: '', // playback name (hls, html5_video, flashls)
    playbackType: '', // vod or live
    buffersize: 0, // buffersize in ms
    bitratesHistory: [], // the bitrates changes history
    bitrateMean: 0, // bitrate mean
    bitrateVariance: 0, // bitrate variance
    bitrateStandardDeviation: 0, // bitrate standard deviation
    bitrateMostUsed: 0, // most used (based on time) bitrate
  }
}
```
