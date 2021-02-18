/**
 * 冒泡排序
 * 
 * 时间复杂度O(n^2)，计算慢。
 * 
 */
function bubbleSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        swap(nums, i, j)
      }
    }
  }
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
var arr = [8, 3, 5, 9, 2, 3, 0, 8]
bubbleSort(arr)
console.log(arr)