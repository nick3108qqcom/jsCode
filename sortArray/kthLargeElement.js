/**
 * #215. 数组中的第K个最大元素
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/?utm_source=LCUS&utm_medium=ip_redirect&utm_campaign=transfer2china
 * 
 * @desc
 * 在未排序的数组中找到第 k 个最大的元素。
 * 
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 */

var findKthLargest = function (nums, k) {
  let arr = quickSort(nums, 0, nums.length - 1)
  return arr[nums.length - k]
};

/**
 * 快速排序, 时间复杂度 O(nlogn)
 *
 * 首先我们来回顾一下快速排序，这是一个典型的分治算法。我们对数组 a[l⋯r] 做快速排序的过程是（参考《算法导论》）：
 *
 *
 * 1. 分解： 将数组 a[l⋯r] 「划分」成两个子数组 a[l⋯q−1]、a[q+1⋯r]，使得 a[l⋯q−1] 中的每个元素小于等于 a[q]，且 a[q] 小于等于 a[q+1⋯r] 中的每个元素。其中，计算下标 q 也是「划分」过程的一部分。
 *
 * 2. 解决： 通过递归调用快速排序，对子数组 a[l⋯q−1] 和 a[q+1⋯r] 进行排序。
 *
 * 3. 合并： 因为子数组都是原址排序的，所以不需要进行合并操作，a[l⋯r] 已经有序。
 *
 * 上文中提到的 「划分」 过程是：从子数组 a[l⋯r] 中选择任意一个元素 x 作为主元，调整子数组的元素使得左边的元素都小于等于它，右边的元素都大于等于它， x 的最终位置就是 q。
 *
 *
 **/

/**
 * leetcode #912
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