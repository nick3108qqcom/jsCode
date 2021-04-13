// JSON.parse(JSON.stringify())  存在一些问题，
// 1.无法拷贝函数
// 2.无法解决循环引用
// 3.无法拷贝特殊对象 RegExp Date Set Map在序列化时会丢失

var a = {
  num: 1,
  items: [1],
  fun: () => { return 1 },
  date: new Date(),
}
// a.a = a
// var b = JSON.parse(JSON.stringify(a))
// a.num = 2
// a.items[0] = 2
// console.log(a)
// console.log(b)

function deepCopy(originObj, map = new WeakMap()) {
  if (typeof originObj === 'object') {
    var cloneObj = Array.isArray(originObj) ? [] : {}
    if (map.get(originObj)) {
      return map.get(originObj)
    }
    map.set(originObj, cloneObj)
    for (let prop in originObj) {
      cloneObj[prop] = deepCopy(originObj[prop], map)
    }
    return cloneObj
  } else {
    return originObj
  }
}
// var c = deepCopy(a)
// a.items[0] = 0
// console.log(a)
// console.log(c)

function deepCopyComplete(originObj, map = new WeakMap()) {
  if (isReferType(originObj)) {
    // 判断是否是循环引用
    if (map.get(originObj)) {
      return map.get(originObj)
    }

    // 判断是否为几种需要特殊处理的类型 
    const type = [Date, RegExp, Map, Set, WeakMap, WeakSet]
    if (type.includes(originObj.constructor)) {
      return new originObj.constructor(originObj)
    }

    // 其他类型
    let allDesc = Object.getOwnPropertyDescriptors(originObj)
    let cloneObj = Object.create(Object.getPrototypeOf(originObj), allDesc)

    for (let prop of Object.keys(originObj)) {
      cloneObj[prop] = isReferType(cloneObj[prop]) && typeof originObj[prop] !== 'function' ?
        deepCopy(originObj[prop], map) : originObj[prop]
    }
    return cloneObj
  } else {
    return originObj
  }
}

function isReferType(obj) {
  return typeof obj === 'object' || typeof obj === 'function' && obj !== 'null'
}


let obj = {
  fun: function () { },
  syb: Symbol('foo'),
  a: undefined,
  b: NaN,
  c: Infinity,
  reg: /^abc$/,
  date: new Date(),
  set: new Set([1, 2, 3, 4, 4]),
  map: new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]),
  text: 'aaa',
}

let cloneObj = deepCopyComplete(obj)

console.log(obj)
console.log(cloneObj)


function deepCopy(target) {
  let copyed_objs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象 

  function _deepCopy(target) {
    if ((typeof target !== 'object') || !target) { return target; }

    for (let i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget;
      }
    }
    let obj = {};
    if (Array.isArray(target)) {
      obj = [];//处理target是数组的情况 
    }
    copyed_objs.push({ target: target, copyTarget: obj })
    Object.keys(target).forEach(key => {
      if (obj[key]) { return; }
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }

  return _deepCopy(target);
}


let copyed_obj = []
function copy(target) {
  if (typeof target === 'object') {

    for (let i = 0; i < copyed_obj.length; i++) {
      if(copyed_obj[i].target === target){
        return copyed_obj[i].copyTarget
      }
    }

    const typeList = [Date, RegExp, Map, WeakMap, Set, WeakSet]
    if (typeList.includes(target.constructor)) {
      return new target.constructor(target)
    }

    let obj = {}
    if (Array.isArray(target)) obj = []

    copyed_obj.push({
      target: target,
      copyTarget: obj,
    })
    for (let prop of Object.keys(target)) {
      obj[prop] = copy(target[prop])
    }
    return obj
  } else {
    return target
  }
}

var a = {
  arr: [1, 2, 3],
  obj: { test1: 1 },
  time: new Date(),
  outputTime: function () {
    console.log(this.time.getTime())
  }
};

a['refer'] = a
var c = copy(a);
console.log(c);
