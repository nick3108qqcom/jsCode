// @ts-nocheck
class Promise0918 {
  constructor(fn) {
    this.status = 'pending'
    this.resloveList = []
    this.rejectList = []
    fn(this.fulfillCallback.bind(this), this.rejectCallback.bind(this))
  }
  fulfillCallback(value) {
    if (this.status !== 'pending') return
    this.status = 'filfilled'
    setTimeout(() => {
      this.resloveList.forEach(fn => {
        fn(value)
      })
    }, 50)

  }
  rejectCallback(error) {
    if (this.status !== 'pending') return
    this.status = 'rejected'
    setTimeout(() => {
      this.rejectList.forEach(fn => {
        fn(error)
      })
    }, 50)
  }
  /**
   * @param {function} _resolve 
   * @param {function} _reject 
   */
  then(_resolve, _reject) {
    if (_resolve) {
      this.resloveList.push(_resolve)
    }
    if (_reject) {
      this.rejectList.push(_reject)
    }
    return this
  }
}

function getRandomNum() {
  return new Promise0918((resolve, reject) => {
    const num = Math.random()
    console.log(`num：${num}`)
    if (num > 0.5) {
      resolve(num)
    } else {
      reject('error')
    }
  })
}

function getUserId() {
  return new Promise0918(resolve => {
    resolve(318)
  })
}

function getUserName() {
  return new Promise0918(resolve => {
    resolve('name: 长庚')
  })
}


// getRandomNum().then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

getUserId().then(id => {
  console.log(id)
  return getUserName()
}).then(name => {
  console.log(name)
})
