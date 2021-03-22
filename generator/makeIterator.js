function makeIterator(array) {
  var nextIndex = 0
  return {
    next: function () {
      return nextIndex < array.length ?
        {
          value: array[nextIndex++],
          done: false,
        }
        :
        {
          value: undefined,
          done: true,
        }
    }
  }
}


function *foo(x) {
  const y = 2 * (yield (x + 1));
  const z = yield (y / 3);
  return (x + y + z);
}

// const  a = foo(5);  
// console.log(a.next()); 
// console.log(a.next()); 
// console.log(a.next());

// const b = foo(5);
// console.log(b.next()); 
// console.log(b.next(12)); 
// console.log(b.next(13))


function *foo(x) {
  const y = x * (yield);
  return y;
}
// 启动foo(...)
const it = foo(6);
it.next();
const res = it.next(7);
console.log(res.value);