/**
 *  
 * 以数字集合 1, 2 和 3 初始化数组。
  int[] nums = { 1, 2, 3};
  Solution solution = new Solution(nums);

 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
  solution.shuffle();

 重设数组到它的初始状态[1,2,3]。
  solution.reset();

 随机返回数组[1,2,3]打乱后的结果。
  solution.shuffle();
 */

 // 洗牌算法： 从最后一个元素开始，从数组中随机选出一个位置，交换，直到第一个元素。
function Solution(nums) {
  this.originNums = [...nums]
  this.shuffleNums = [...nums]
}

Solution.prototype.shuffle = function () {
  const { shuffleNums } = this
  let length = shuffleNums.length
  for (let current = length - 1; current > 0; current--) {
    let randomNum = Math.floor(shuffleNums.length * Math.random());
    [shuffleNums[current], shuffleNums[randomNum]] = [shuffleNums[randomNum], shuffleNums[current]]
  }
  return this.shuffleNums
}

Solution.prototype.reset = function () {
  return this.originNums
}
var solution = new Solution([1, 2, 3])


console.log(solution.shuffle())