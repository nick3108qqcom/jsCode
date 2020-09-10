class Promise {
  constructor(fn) {
    // pending fulfilled rejected
    this.status = 'pending'
    this.resolveList = []
    this.rejectList = []
    fn(this.resolve.bind(this), this.reject.bind(this))
  }

  then(scb, fcb) {
    if (scb) {
      this.resolveList.push(scb)
    }
    if (fcb) {
      this.rejectList.push(fcb)
    }
    return this
  }

  catch(cb) {
    if (cb) {
      this.rejectList.push(cb)
    }
    return this
  }

  resolve(data) {
    if (this.status !== 'pending') return
    this.status = 'fulfilled'
    setTimeout(() => {
      this.resolveList.forEach(s => {
        data = s(data)
      })
    });
  }

  reject(err) {
    if (this.status !== 'pending') return
    this.status = 'rejected'
    setTimeout(() => {
      this.rejectList.forEach(s => {
        err = f(err)
      })
    });
  }

  static resolve(data) {
    if (data instanceof Promise) {
      return data
    } else {
      return new Promise((resolve, reject) => {
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

  static all(promises) {
    return new Promise((resolve, reject) => {
      let promiseCount = 0
      let promisesLength = promises.length
      let result = []
      for (let i = 0; i < promisesLength; i++) {
        Promise.resolve(promises[i])
          .then(res => {
            promiseCount++
            result[i] = res
            if (promiseCount === promisesLength) {
              return resolve(result)
            }
          }, err => {
            return reject(err)
          })
      }
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i])
          .then(res => {
            return resolve(res)
          }, err => {
            return reject(err)
          })
      }
    })
  }
}

// test
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('resolve')
    resolve(222)
  }, 1000);
})

p.then(data => {
  setTimeout(() => {
    console.log('data', data)
  });
  return 333
}).then(data2 => {
  console.log('data2', data2)
}).catch(err => {
  console.error('err', err)
})

// 2. Promise.reject
const p1 = Promise.reject('出错了')
p1.then(null, function (s) {
  console.log(s)
})

// all race
const q1 = new Promise((resolve, reject) => {
  resolve('hello')
})

const q2 = new Promise((resolve, reject) => {
  resolve('world')
})

Promise.all([q1, q2]).then(res => {
  console.log(res)
})

Promise.race([q1, q2]).then(res => {
  console.log(res)
})