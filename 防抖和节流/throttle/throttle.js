/**
  * 节流函数：不管事件触发频率有多高，单位时间内直执行一次 
  * 1. 使用时间戳实现，第一次事件肯定触发，最后一次事件不一定触发
  * 2. 使用定时器实现，第一次事件不会触发，最后一次事件等待wait毫秒后触发
  * 3. 两者结合
 */

function throttle(fn, wait = 400) {
  let pre = 0;
  return function () {
    if (Date.now() - pre > wait) {
      fn.call(this, arguments)
      pre = Date.now()
    }
  }
}

function throttleTimer(fn, wait = 400) {
  let isCan = true;
  return function () {
    if (isCan) {
      isCan = false;
      setTimeout(() => {
        fn.call(this, arguments)
        isCan = true
      }, wait);
    }
  }
}

function throttleFinally(fn, wait = 400) {
  let pre = 0;
  let timer = null;
  return function () {
    if (Date.now() - pre > wait) {
      fn.call(this, arguments);
      clearTimeout(timer);
      timer = null;
      pre = Date.now();
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, arguments);
      }, wait);
    }
  }
}