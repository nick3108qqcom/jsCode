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

console.log(quickSort(arr))