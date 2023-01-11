function isSameVnode(oldVnode, newVnode) {
  return oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel;
}

function patch(oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点
  if (!oldVnode.sel) {
    // 传入的第一个参数是DOM节点，此时需要包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }
  // 判断oldVnode和newVnode是不是同一个节点
  if (isSameVnode(oldVnode, newVnode)) {
    console.log("是同一个节点");
    // 04.patchVnode
    if (typeof patchVnode === "function") patchVnode(oldVnode, newVnode);
  } else {
    console.log("不是同一个节点");
    const newVnodeElm = createElement(newVnode);

    // 插入到旧节点之前
    if (newVnode && oldVnode.elm.parentNode) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }
    // 删除旧节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    newVnode.elm = newVnodeElm;
    for (let i = 0; i < newVnodeElm.childNodes.length; i++) {
      const chElm = newVnodeElm.childNodes[i];
      // 跳过文本类型
      if (chElm.nodeType === 3) continue;
      newVnode.children[i].elm = newVnodeElm.childNodes[i];
    }
  }
}
