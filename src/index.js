import systeminformation from 'systeminformation'

export default {
  async start({ type, interval, percentThreshold }, cb) {
    interval = interval || 1000
    percentThreshold = percentThreshold || 0.9

    return new Promise(async (_, reject) => {
      this.pollTimeout = setTimeout(async () => {
        try {
          let info, percentUtil
          switch (type) {
            case 'cpu':
              info = await systeminformation.currentLoad()
              percentUtil = currentload_system
              break
            case 'memory':
              info = await systeminformation.mem()
              percentUtil = (info.used / info.total) * 100
              break
            default:
              this.end()
              throw new Error(`Please provide a valid type of metric to listen for.`)
          }

          if (parseFloat(percentUtil) >= parseFloat(percentThreshold))
            await cb(percentUtil)

          await this.start({ type, interval, percentThreshold }, cb)

        } catch(e) {
          this.end()
          reject(e)
        }
      }, interval)
    })
  },

  end() {
    if (this.pollTimeout)
      clearTimeout(this.pollTimeout)
  }
}
