class MyPromise {
  callback = []
  status = 'pending' // 增加状态
  value = null // 保存结果
  constructor(fn) {
    fn(this._resolve.bind(this))
  }
  then(onFulfilled) {
    if (this.status === 'pending') {
      this.callback.push(onFulfilled)
    } else {
      onFulfilled(this.value)
    }
  }
  _resolve(_value) {
    this.value = _value
    this.status = 'fulfilled'
    this.callback.forEach(fn => fn(_value))
  }
}