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

// using async/await
(async function() {
  await utilization.start({
    type: 'memory',           // 'memory' or 'cpu'
    interval: 50,             // milliseconds to determine how often to poll for utilization to check if it exceeds threshold
    percentThreshold: 80      // means if the utilization for the `type` provided exceeds 80%, invoke callback
  }, function(threshold) => { // callback: only invoked if `threshold` is above `percentThreshold` in utilization.start() definition
    console.log(threshold)    // ex. 98.54723
    this.end()                // also can call via `utilization.end()`: ends the listener and resolves the promise returned from `utilization.start()`
  })
  console.log('We stopped polling for utilization!')
})()

// using promises
utilization.start({
  type: 'memory',
  interval: 50,
  percentThreshold: 80
}, function(threshold) => {
  console.log(threshold)
  this.end()
}).then(() => console.log('We stopped polling for utilization!'))
```

## Development

```
$ git clone https://github.com/useriq-com/useriq-utilization-listener
$ cd useriq-utilization-listener
$ npm install
$ npm test
```
