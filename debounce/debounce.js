function db(fn, wait = 400, immediate = false) {
  console.log()
  let timer = null
  return function () {
    clearTimeout(timer)
    // 判断是否要立即执行一次 
    if (immediate && !timer) {
      fn.call(this, arguments)
    }
    timer = setTimeout(() => {
      fn.call(this, arguments)
    }, wait);
  }
}