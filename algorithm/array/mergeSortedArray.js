// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中
// 使 nums1 成为一个有序数组
// 说明:
// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

// 双指针
// p1指向nums1最后一位，p2指向nums2最后一位，比较nums1[p1] 和 nums2[p2]，
// nums1[p1] > nums2[p2] 说明 nums1最后一个有效数子大于nums2中最大的，此时把nums2[p2]插入 nums1最后一位（m+n-1）,同时指针移动
var merge1 = function (nums1, m, nums2, n) {
  let p1 = m - 1
  let p2 = n - 1
  let p = m + n - 1
  while (p1 >= 0 && p2 >= 0) {
    nums1[p--] = nums1[p1] > nums2[p2] ? nums1[p1--] : nums2[p2--]
  }
  nums1.splice(0, p2 + 1, ...nums2.slice(0, p2 + 1));
}

// 暴力方法
var merge2 = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m)
  nums2.splice(n, nums2.length - n)
  Object.assign(nums1, [...nums1, ...nums2].sort((a, b) => a - b))
}


