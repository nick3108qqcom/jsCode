// setImmediate(() => {
//   console.log('A')
//   setImmediate(() => console.log('B'))
// })

// setTimeout(() => {
//   console.log("TIMEOUT")
// }, 0);

// A
// TIMEOUT
// B
// 或者

// TIMEOUT
// A 
// B 

// 如果把这两个函数放入一个I/O循环内调用,setImmediate 总是被优先调用

// 使用 setImmediate() 相对于setTimeout() 的主要优势是，
// 如果setImmediate()是在 I/O 周期内被调度的，那它将会在其中任何的定时器之前执行，跟这里存在多少个定时器无关
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});