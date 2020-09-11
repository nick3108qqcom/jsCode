// 给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。
// s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。

function isSubTree(s, t) {
  return s !== null && (isSameTree(s, t) || isSubTree(s.left, t) || isSubTree(s.right, t))
  function isSameTree(p, q) {
    if (q === null && p === null) {
      return true
    }
    if (q === null || p === null) {
      return false
    }
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  }
}

