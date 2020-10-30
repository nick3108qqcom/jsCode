// 数组区间：
// 区间用长度为2的数字数组表示，如 [2, 5] 表示区间 2 到 5 (包括2和5)；
// 区间不限定方向，如[5, 2]等同于 [2, 5];
// 实现 getIntersection，可接收多个区间，并返回所有区间的交集（用区间表示），如空集用 null 表示
// 输入：getIntersection([5, 2], [4, 9],[3, 6]);
// 输出：[4, 5]

// 输入：getIntersection([5, 2], [4, 9], [3, 6]);
// 输出：null

function getIntersection() {
  if (arguments.length === 0) return null
  if (arguments.length === 1) return arguments
  let minArr = []
  let maxArr = []
  for (let i = 0; i < arguments.length; i++) {
    let cur = arguments[i]
    minArr.push(Math.min(cur[0], cur[1]))
    maxArr.push(Math.max(cur[0], cur[1]))
  }
  let sortMin = minArr.sort((a, b) => { return a - b })
  let sortMax = maxArr.sort((a, b) => { return a - b })
  return [sortMin[sortMin.length - 1], sortMax[0]]
}

// console.log(getIntersection())
console.log(getIntersection([5, 2], [4, 9]))
console.log(getIntersection([1, 4], [3, 5]))
console.log(getIntersection([1, 7], [8, 9]))
console.log(getIntersection(['x', 7], [4, 9]))
console.log(getIntersection([1, 2]))
console.log(getIntersection([1, 2], [2, 3]))
