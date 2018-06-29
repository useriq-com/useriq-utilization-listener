# UserIQ Utilization Listener

Listen for system utilization, like CPU and memory, that
exceeds a desired threshold.

## Install

```
$ npm install --save utilization-listener
```

## Usage

```js
import UtilizationListener from 'utilization-listener'

const utilization = UtilizationListener()
(async function() {
  await utilization.start({
    type: 'memory',           // 'memory' or 'cpu'
    interval: 50,             // milliseconds with how often to poll for new utilization
    percentThreshold: 80      // === 80% utilization
  }, function(threshold) => { // only invoked if `threshold` is above `percentThreshold` in utilization.start() definition
    console.log(threshold)    // ex. 98.54723
    this.end()                // ends the listener and resolves the promise returned from utilization.start()
  })
})()
```

## Development

```
$ git clone https://github.com/useriq-com/useriq-utilization-listener
$ cd useriq-utilization-listener
$ npm install
$ npm test
```
