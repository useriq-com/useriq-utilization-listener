import assert from 'assert'
import UtilizationListener from './index'

const sleep = (timeoutMs=1000) => new Promise(resolve => setTimeout(resolve, timeoutMs))

describe('UtilizationListener', () => {
  describe('#start', () => {
    it('should throw an error with no utilization type provided', async function() {
      try {
        await UtilizationListener().start({ interval: 50 }, () => {})
      } catch(err) {
        assert.ok(err)
      }
    })

    it('should call the lowUtilCb if threshold is below our desired threshold', async function() {
      await UtilizationListener().start({ type: 'cpu', interval: 50, percentThreshold: 99.9999 }, () => {}, function lowUtilCb(threshold) {
        assert.equal(true, threshold < 99.9999)
        this.end()
      })
    })

    describe("type == 'memory'", () => {
      it("should start polling for memory information and outputting it at least once if we've waited at least `interval` milliseconds", async function() {
        let thresholds = []
        await UtilizationListener().start({ type: 'memory', interval: 50, percentThreshold: 0.01 }, function(threshold) {
          thresholds.push(threshold)
          assert.equal(true, threshold > 0)

          if (thresholds.length > 2)
            this.end()
        })

        assert.ok("We successfully stopped the listener!")
      })

      it("should end polling by calling 'utilization.end()' as well as 'the.end()' with callback scope", async function() {
        const utilization = UtilizationListener()
        await utilization.start({ type: 'memory', interval: 50, percentThreshold: 0.01 }, () => utilization.end())
        assert.ok("We successfully stopped the listener!")
      })
    })

    describe("type == 'cpu'", () => {
      it("should start polling for CPU information and outputting it at least once if we've waited at least `interval` milliseconds", async function() {
        let thresholds = []
        await UtilizationListener().start({ type: 'cpu', interval: 50, percentThreshold: 0.01 }, function(threshold) {
          thresholds.push(threshold)
          assert.equal(true, threshold > 0)

          if (thresholds.length > 2)
            this.end()
        })

        assert.ok("We successfully stopped the listener!")
      })
    })
  })
})
