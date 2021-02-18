/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 
 * 桶排序
 * 
 * #347. 前 K 个高频元素 
 * 
 * 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
 * 
 * 输入: nums = [1,1,1,2,2,3], k = 2
 * 输出: [1,2]
 */
var topKFrequent = function (nums, k) {
  let obj = {}
  let res = []
  for (let i = 0; i < nums.length; i++) {
    obj[nums[i]] = (obj[nums[i]] || 0) + 1
  }
  console.log(obj)
  // entries 方法返回一个给定对象自身可枚举属性的键值数组
  let temp = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  console.log(temp)
  for (let i = 0; i < k; i++) {
    res.push(temp[i][0])
  }
  return res
};

var nums = [1, 19, 1, 1, 19, 2, 2, 3, 19]
console.log(topKFrequent(nums, 2))
