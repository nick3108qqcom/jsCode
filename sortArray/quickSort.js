/**
 * leetcode #912 数组排序
 * 
 * 题目地址：https://leetcode-cn.com/problems/sort-an-array/
 * 
 * 参考 链接 https://leetcode-cn.com/problems/sort-an-array/solution/mei-ri-yi-ti-ep31-4-quicksort-mian-shi-shou-si-si-/
 */
// 快排基本版
function sort(arr) {
  let pivot = arr[0]
  let left = []
  let right = []
  if (arr.length < 2) {
    return arr
  }

  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
  }

  return sort(left).concat([pivot], sort(right))
}

// 快排优化版
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivot = (left + right) >> 1
    let newPivot = partition(arr, pivot, left, right)
    quickSort(arr, left, newPivot - 1)
    quickSort(arr, newPivot + 1, right)
  }
  return arr
}

function partition(arr, pivot, left, right) {
  let pivotValue = arr[pivot]
  let newPivot = left
  swap(arr, pivot, right)
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, newPivot)
      newPivot++
    }
  }
  swap(arr, right, newPivot)
  return newPivot
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}