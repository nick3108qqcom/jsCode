/**
 * 比较新旧 DOM 树的差异
 */

//  对 DOM 的操作
let patch = {};
patch.NODE_DELETE = 'NODE_DELETE';
patch.NODE_TEXT_MODIFY = 'NODE_TEXT_MODIFY';
patch.NODE_REPLACE = 'NODE_REPLACE';
patch.NODE_ADD = 'NODE_ADD';
patch.NODE_ATTRIBUTE_MODIFY = 'NODE_ATTRIBUTE_MODIFY';
patch.NODE_ATTRIBUTE_ADD = 'NODE_ATTRIBUTE_ADD';
patch.NODE_ATTRIBUTE_DELETE = 'NODE_ATTRIBUTE_DELETE';

/**
 * 比较过程
 * 
 * 比较属性的变化
 *  1. 遍历旧的属性，找到被删除和修改的情况
 *      1. 旧属性中存在，新属性中不存在，属性被删除
 *      2. 都存在，值不同，属性被修改
 *  2. 比较子元素的变化
 *  3. 比较 innerHTML的变化
 *  4. 使用 patches 来存储差异
 */

function diff(oldTree, newTree) {
  const patches = {};
  const index = 0;
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

/**
 * 比较 innerHTML 的变化
 */
function dfsWalk(oldNode, newNode, index, patches) {
  const currentIndex = index.value;
  const currentIndexPatches = [];

  if (newNode === undefined) {

    // 节点被移除
    currentIndexPatches.push({
      type: patch.NODE_DELETE,
    })
  } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    if (oldNode !== newNode) {

      // 文本节点被修改
      currentIndexPatches.push({
        type: patch.NODE_TEXT_MODIFY,
        value: newNode,
      })
    }
  } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
    // 同时根据tagName key比较
    diffProps(oldNode.props, newNode.props, index, currentIndexPatches);
    diffChildren(oldNode.children, newNode.children, index, currentIndexPatches, patches);
  } else {
    currentIndexPatches.push({
      type: patch.NODE_REPLACE,
      value: newNode,
    })
  }
}

/**
 * 比较属性变化
 */
function diffProps(oldProps, newProps, index, currentIndexPatches) {
  // 遍历旧的属性，找到被删除和修改的情况
  for (let key in oldProps) {
    // 新属性不存在，旧属性存在
    if (!newProps.hasOwnProperty(key)) {
      currentIndexPatches.push({
        type: patch.NODE_ATTRIBUTE_DELETE,
        key: key
      })
    } else if (newProps[key] !== oldProps[key]) {
      // 值不同，属性被修改
      currentIndexPatches.push({
        type: patch.NODE_ATTRIBUTE_MODIFY,
        key: key,
        value: newProps[key],
      })
    }
  }

  for (let key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
      currentIndexPatches.push({
        type: patch.NODE_ATTRIBUTE_ADD,
        key: key,
        value: newProps[key],
      })
    }
  }
}

function diffChildren(oldChildren, newChildren, index, currentIndexPatches, patches) {
  const currentIndex = index.value;
  if (oldChildren.length < newChildren.length) {
    // 有元素被添加
    let i = 0
    for (; i < oldChildren.length; i++) {
      index.value++;
      dfsWalk(oldChildren[i], newChildren[i], index, patches);
    }

    for (; i < newChildren.length; i++) {
      currentIndexPatches.push({
        type: patch.NODE_ADD,
        value: newChildren[i],
      })
    }


  } else {
    for (let i = 0; i < oldChildren.length; i++) {
      index.value++;
      dfsWalk(oldChildren[i], newChildren[i], index, patches)
    }
  }
}