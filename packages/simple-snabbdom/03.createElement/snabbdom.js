function createElement(vnode) {
  const element = document.createElement(vnode.sel);
  // 有子节点还是文本
  if (vnode.text !== "" && (!vnode.children || vnode.children.length === 0)) {
    element.innerHTML = vnode.text;
    // 补充elm属性
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 递归创建子节点
    for (let i = 0; i < vnode.children.length; i++) {
      element.appendChild(createElement(vnode.children[i]));
    }
  }
  // vnode.elm = element;
  // 返回的elm是一个纯DOM节点
  return element;
}
