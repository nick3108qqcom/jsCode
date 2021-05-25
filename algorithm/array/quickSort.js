
// i指向6，j指向8
// 以6为基数，寻找分界点K
// j指向5，i指向7 交换后 [6, 1, 2, 5, 9, 3, 4, 7, 10, 8]
// j指向 4，i指向9 交换后 [6, 1, 2, 5, 4, 3, 9, 7, 10, 8]
// J向左移动，i向右移动，到3停止移动，3为k 交换 3和6 [3, 1, 2, 5, 4, 6, 9, 7, 10, 8]

// 让k左 右两侧重复次步骤

function quickSort(nums, left = 0, right = nums.length - 1) {
  var m
  if (left < right) {
    m = partition(nums, left, right)
    quickSort(nums, left, m - 1)
    quickSort(nums, m + 1, right)
  }
  return nums
}

function partition(nums, left, right) {
  var value = nums[left]
  var i = left
  var j = right
  while (i < j) {
    while (nums[j] >= value && i < j) { j-- } //先做j
    while (nums[i] <= value && i < j) { i++ }
    if (i <= j) {
      swap(nums, i, j)
    }
  }
  swap(nums, j, left)
  return j
}

function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]]
}


var arr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8]

console.time('quick')
console.log(quickSort(arr))
console.timeEnd('quick')


console.time('sort')
var brr = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8]
brr.sort((a, b) => a - b)
console.log(brr)
console.timeEnd('sort')