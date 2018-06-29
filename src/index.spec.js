import assert from 'assert'
import UtilizationListener from './index'

const sleep = (timeoutMs=1000) => new Promise(resolve => setTimeout(resolve, timeoutMs))

describe('UtilizationListener', () => {
  describe('#start', () => {
    describe('type == memory', () => {
      it('should throw an error with no type provided', async function() {
        try {
          await UtilizationListener.start({ interval: 50 }, () => {})
        } catch(err) {
          assert.ok(err)
        }
      })

      it("should start polling for memory information and outputting it at least once if we've waited at least `interval` milliseconds", async function() {
        let thresholds = []
        UtilizationListener.start({ type: 'memory', interval: 50, percentThreshold: 0.01 }, threshold => thresholds.push(threshold))

        await sleep(100)
        assert.equal(true, thresholds.length > 0)
      })
    })
  })
})
