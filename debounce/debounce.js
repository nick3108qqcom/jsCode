// function db(fn, wait = 400, immediate = false) {
//   console.log()
//   let timer = null
//   return function () {
//     clearTimeout(timer)
//     // 判断是否要立即执行一次 
//     if (immediate && !timer) {
//       fn.call(this, arguments)
//     }
//     timer = setTimeout(() => {
//       fn.call(this, arguments)
//     }, wait);
//   }
// }


function db(fn, wait = 400, immediate = false) {
  let timer = null;
  console.log(timer, 'db')
  return function () {
    console.log(timer, 'anonymous')
    clearTimeout(timer)
    if (immediate && !timer) {
      fn.call(this, arguments)
    }
    timer = setTimeout(() => {
      fn.call(this, arguments)
    }, wait);
  }
}



function debounce(fn, wait = 400) {
  let timer = null;
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, arguments)
    }, wait)
  }
}