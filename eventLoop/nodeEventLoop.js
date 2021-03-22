const fs = require('fs');

fs.readFile(__dirname, () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0);
  setImmediate(() => {
    console.log('immediate')
  })
})


/**
 * 1. 定时器: 本阶段执行已经被 setTimeout 和 setInterval的调度回调函数
 * 2. 待定回调: 执行延迟到下一循环迭代的I/O回调
 * 3. dile prepare: 仅系统内部使用
 * 4. 轮询: 检索新的 I/O事件,执行与I/O相关的回调,其余情况node将在适当时候再次阻塞
 * 5. 检测: setImmediate回调函数再此执行
 * 6. 关闭的回调函数: 一些关闭的回调函数, 如socket.on('close', ...)
 */

// 详细描述
// 定时器

// 轮询

// 1. 计算应该阻塞和轮询I/O的事件
// 2. 然后,处理轮询队列里的事件 
// 