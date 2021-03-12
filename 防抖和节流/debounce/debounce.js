function debounce(fn, wait = 400) {
  let timer = null;
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...arguments)
    }, wait)
  }
}

/**
 * @DESC 立即执行
 */
function debounceImmediately(fn, wait = 400, immediate = false) {
  let timer = null;
  return function() {
    clearTimeout(timer)
    if (immediate && !timer) {
      fn.call(this, ...arguments)
      immediate = false
    } else {
      timer = setTimeout(() => {
        fn.call(this, ...arguments)
      }, wait);
    }

  }
}