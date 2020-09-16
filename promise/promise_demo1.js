// 简易版
// 参考文档 https://zhuanlan.zhihu.com/p/58428287
class MyPromise {
  callbacks = [];
  constructor(fn) {
    fn(this._resolve.bind(this))
  }
  then(onFulfilled) {
    this.callbacks.push(onFulfilled)
    return this
  }
  _resolve(value) {
    setTimeout(() => {
      this.callbacks.forEach(fn => fn(value))
    });
  }
}

// 应用
let mp = new MyPromise(resolve => {
  setTimeout(() => {
    console.log('done')
    resolve('3秒')
  }, 3000);
})

mp.then(tip => {
  console.log(tip, 1)
}).then(tip => {
  console.log(tip, 2)
})

// 上面 Promise 的实现存在一个问题：如果在 then 方法注册 onFulfilled 之前，
// resolve 就执行了，onFulfilled 就不会执行到了。比如上面的例子中我们把 setTimout 去掉：
let mpSync = new MyPromise(resolve => {
  console.log('同步执行')
  resolve('同步执行')
})
mpSync.then(res => {
  console.log(res)
})
