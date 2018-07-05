import systeminformation from 'systeminformation'

const NOOP = () => {}

export default function UtilizationListener() {
  return {
    async start({ type, interval, percentThreshold }, cb, lowUtilCb=NOOP) {
      interval = interval || 1000
      percentThreshold = percentThreshold || 0.9

      return await new Promise((resolve, reject) => {
        this.resolve = resolve

        this.pollInterval = setInterval(async () => {
          try {
            let info, percentUtil
            switch (type) {
              case 'cpu':
                info = await systeminformation.currentLoad()
                percentUtil = info.currentload_system
                break
              case 'memory':
                info = await systeminformation.mem()
                percentUtil = (info.used / info.total) * 100
                break
              default:
                throw new Error(`Please provide a valid type of metric to listen for.`)
            }

            if (parseFloat(percentUtil) >= parseFloat(percentThreshold))
              await cb.call(this, percentUtil)
            else
              await lowUtilCb.call(this, percentUtil)

          } catch(e) {
            this.end(false)
            reject(e)
          }
        }, interval)
      })
    },

    end(resolved=true) {
      if (this.pollInterval) {
        clearInterval(this.pollInterval)
      }

      if (resolved) {
        this.resolve()
        this.resolve = null
      }
    }
  }
}
