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
        runEach: 10, // time in seconds for each report default:  5
        onReport: (metrics) => {console.log(metrics)}, // callback function
        uriToMeasureLatency: 'http://www.example.com/images/tv/pixel-1x1-red.gif' // provide an img uri hosted at the same place as your farm or near of it prefferable 1x1px, without caching.
      }
    })
</script>
```
