/**
 * 
 * 桶排序  
 * 
 * 
 * 时间复杂度只有O(m+n)，计算效率高
 * 空间消耗大
 */

function bucketSort(nums) {
  const newList = []
  nums.forEach(v => {
    newList[v] = (newList[v] || 0) + 1
  })

  // 展开桶
  return newList.reduce((pre, el, index) => {
    for (let i = el; i; i--) {
      pre.push(index)
    }
    return pre
  }, [])
}




