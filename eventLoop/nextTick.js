process.nextTick(() => {
  console.log('A')
  process.nextTick(() => console.log('B'))
})

setTimeout(() => {
  console.log("TIMEOUT")
}, 0);

// A
// B
// TIMEOUT

// 如果有多个process.nextTick语句（不管它们是否嵌套），将全部在当前"执行栈"执行

/**
 * 为什么使用 process.nextTick
 * 1. 允许用户处理错误, 清理任何不需要的资源, 或者在事件循环继续之前重试请求
 * 2. 有时让回调在栈展开后, 但在事件循环之前运行的必要
 */