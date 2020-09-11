/**
 * @desc 翻转二叉树 #226
 */
function invertTree(root) {
  if (root === null) return root
  var temp = root.left
  root.left = root.right
  root.right = temp
  invertTree(root.left)
  invertTree(root.right)
  
  return root
}

/**
 * @desc 翻转二叉树 #226
 */
function invertTree_2(root) {
  if (root == null) {
    return root
  }
  let right = invertTree_2(root.right)
  let left = invertTree_2(root.left)
  root.left = right
  root.right = left

  return root

}

