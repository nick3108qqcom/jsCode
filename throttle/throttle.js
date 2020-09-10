function throttle(fn, interval = 400) {
  let isCan = true
  return function () {
    console.log(isCan)
    if (isCan) {
      isCan = false
      setTimeout(() => {
        fn.call(this, arguments)
        isCan = true
      }, interval);
    }
  }
}

// 第一次立即触发，最后一次不会触发
function thrrottle2(fn, wait = 400) {
  let previous = 0
  return function () {
    if (Date.now() - previous > wait) {
      fn.call(this, arguments)
      previous = Date.now()
    }
  }
}

// 第一次事件不会立即触发，最后一次一定触发
function thrrottle3(fn, wait = 400) {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.call(this, arguments)
      clearTimeout(timer)
      timer = null
    }, wait);
  }
}


function throttle4(fn, wait = 400) {
  let previous = 0
  let timer = null
  return function () {
    if (Date.now() - previous > wait) {
      fn.call(this, arguments)
      previous = Date.now()
      clearTimeout(timer)
      timer = null
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, arguments)
        clearTimeout(timer)
        timer = null
      }, wait);
    }
  }
}