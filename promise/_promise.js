class Promise {
  constructor(fn) {
    this.status = 'static'
    this.ressolveList = []
    this.rejectList = []
    fn(this.resolve.bind(), this.reject.bind())
  }

  resolve(value) {
    if (this.status === 'pending') {
      this.status = 'resolved'
      setTimeout(() => {
        this.ressolveList.forEach(cb => {
          cb(value)
        })
      });
    }
  }

  reject(error) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      setTimeout(() => {
        this.rejectList.forEach(cb => {
          cb(error)
        })
      });
    }
  }

  catch(cb) {
    if (cb) {
      this.rejectList.push(cb)
    }
    return this
  }

  then(resolvedCb, rejectedCb) {
    if (resolvedCb) {
      this.ressolveList.push()
    }

    if (rejectedCb) {
      this.rejectList.push(rejectedCb)
    }
    return this
  }

  static resolve(data) {
    if (data instanceof Promise) {
      return data
    } else {
      return new Promise(resolve => {
        resolve(data)
      })
    }
  }

  static reject(err) {
    if (err instanceof Promise) {
      return err
    } else {
      return new Promise((resolve, reject) => {
        reject(err)
      })
    }
  }

  static race(arr) {
    return Promise((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        Promise.resolve(arr[i])
          .then(res => {
            return resolve(res)
          })
          .catch(err => {
            return reject(err)
          })
      }
    })
  }

  static all(arr) {
    return new Promise((resolve, reject) => {
      let index = 0
      let resArr = []
      for (let i = 0; i < arr.length; i++) {
        Promise.resolve(arr[i])
          .then(res => {
            resArr[i] = res
            index += 1
            if (index === arr.length) {
              return resolve(resArr)
            }
          }, err => {
            return reject(err)
          })
      }
    })
  }
}