function shallowCopy(obj) {
	var _obj = {}
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			_obj[prop] = obj[prop]
		}
	}
	return _obj;
}


var a = {
	name: 'aaa',
	items: [
		1, 2, 3
	]
}

var b = shallowCopy(a)
var c = Object.assign({}, a)
var c = {
	...a
}
a.name = '222'
a.items[1] = 0
// c.name = '111'
console.log(a)
console.log(c)
// console.log(b)

// 这些都是浅拷贝
// Object.assign
// Array.prototype.slice() Array.prototype.concat()
// 使用拓展运算符实现的复制 

// var arr = [1, [0, 1], 3]
// var brr = Array.prototype.slice.call(arr, 0)
// var crr = Array.prototype.concat(arr)
// arr[1][0] = 'a'
// arr[0] = 'b'
// console.log(arr)
// console.log(brr)
// console.log(crr)





