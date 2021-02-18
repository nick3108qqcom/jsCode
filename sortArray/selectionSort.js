/**
 * 选择排序
 * 
 * 遍历数组找出最大的元素
 * 
 * 不稳定的排序算法  https://juejin.cn/post/6844903984059121678
 */
function selectionSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    var min = i
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[min] > nums[j]) {
        min = j
      }
    }
    if (min != i) {
      swap(arr, min, i)
    }
  }
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

var arr = [3, 2, 22, 1, 10]
selectionSort(arr)
console.log(arr)