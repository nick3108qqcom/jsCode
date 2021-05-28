class HD {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(executor) {
    this.status = HD.PENDING
    this.value = null
    this.callback = []
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }

  }

  resolve(value) {
    if (this.status == HD.PENDING) {
      this.status = HD.FULFILLED
      this.value = value
      setTimeout(() => {
        this.callback.forEach(callback => {
          callback.onFulfilled(value)
        })
      });
    }
  }

  reject(reason) {
    if (this.status == HD.PENDING) {
      this.status = HD.REJECTED
      this.value = reason
      setTimeout(() => {
        this.callback.forEach(callback => {
          callback.onRejected(reason)
        })
      });
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => { }
    }

    if (typeof onRejected !== 'function') {
      onRejected = () => { }
    }
    let promise = new HD((resolve, reject) => {

      if (this.status === HD.PENDING) {
        this.callback.push({
          onFulfilled: value => {
            let result = onFulfilled(value)
            this.parse(promise, result, resolve, reject)
          },

          onRejected: reason => {
            let result = onRejected(reason)
            this.parse(promise, result, resolve, reject)
          }
        })
      }

      if (this.status == HD.FULFILLED) {
        setTimeout(() => {
          var result = onFulfilled(this.value)
          this.parse(promise, result, resolve, reject)
        });
      }

      if (this.status === HD.REJECTED) {
        setTimeout(() => {
          let result = onRejected(this.value)
          this.parse(promise, result, resolve, reject)
        });
      }


    })

    return promise
  }

  parse(promise, result, resolve, reject) {
    if (promise === result) {
      throw new TypeError('Chaining cycle detected')
    }
    try {
      if (result instanceof HD) {
        result.then(resolve, reject)
      } else {
        resolve(result)
      }
    } catch (error) {
      reject(error)
    }
  }

  static resolve(value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) {
        value.then((resolve, reject))
      } else {
        resolve(value)
      }
    })
  }

  static reject(reason) {
    return new HD((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    return new HD((resolve, reject) => {
      const result = []
      promises.forEach(promise => {
        promise.then(value => {
          result.push(value)
          if (result.length === promises.length) {
            resolve(result)
          }
        }, reason => {
          reject(reason)
        })
      })
    })
  }

  static race(promises) {
    return new HD((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          resolve(value)
        }, reason => {
          reject(reason)
        })
      })
    })
  }
  
}