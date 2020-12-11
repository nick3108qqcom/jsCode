// @ts-nocheck

/**
 * virtural dom 模型
 *  标签名
 *  属性，包含样式属性，事件
 *  子节点
 *  标识 id
 */
var item = {
  // 标签名
  tagName: 'div',
  // 属性
  properties: {
    // 样式
    style: {},
  },
  // 子节点
  children: [],
  // 唯一标识
  key: 1,
}


/***
 * 使用 js 对象表示DOM结构
 * tagName 使用 document.createElement 创建元素
 * properties 使用 setAttribute 给元素设置属性
 * 根据innerHtml 使用 document.createTextNode 渲染文本节点
 * 根据是否有 children 决定是否递归
 * 最后使用appendChild 将创建的元素插入页面
 */
class Element {
  constructor(tagName, ...args) {
    this.tagName = tagName;
    if (Array.isArray(args[0])) {
      this.props = {};
      this.children = args[0];
    } else {
      this.props = args[0];
      this.children = args[1];
    }
    this.key = this.props.key || 0;
  }

  render() {
    // 创建一个标签
    const $dom = document.createElement(this.tagName);

    // 循环添加属性
    for (let key in this.props) {
      $dom.setAttribute(key, this.props[key])
    }

    // 如果存在子节点
    if (this.children) {
      this.children.forEach(child => {
        if (child instanceof Element) {
          $dom.appendChild(child.render())
        } else {
          $dom.appendChild(document.createTextNode(child))
        }
      })
    }
    return $dom
  }
}

export default Element