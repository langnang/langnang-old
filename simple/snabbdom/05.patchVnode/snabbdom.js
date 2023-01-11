function patchVnode(oldVnode, newVnode) {
  // 判断新旧节点是否是同一对象
  if (oldVnode === newVnode) return;
  console.group("🚀 ~ file: patch-vnode.js:7 ~ patchVnode ~ arguments", { oldVnode, newVnode });
  const elm = (newVnode.elm = oldVnode.elm);

  // 判断新节点有没有text属性
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    // 新节点有text属性
    console.log("新节点有text属性");
    if (oldVnode.text !== newVnode.text) {
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新节点没有text属性，有children
    // console.log("新节点没有text属性，有children");
    // 判断旧节点有没有children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // 新旧节点都有children
      console.log("新旧节点都有children");
      // 06.updateChildren
      if (typeof updateChildren === "function") updateChildren(elm, oldVnode.children, newVnode.children);
    } else {
      // 旧节点没有children，新节点有children
      console.log("旧节点没有children，新节点有children");
      // 清空旧节点内容
      oldVnode.elm.innerHTML = "";
      // 遍历新的vnode的子节点，创建DOM，上树
      console.log("🚀 ~ file: snabbdom.js:114 ~ patchVnode ~ newVnode", newVnode);
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
  console.groupEnd();
}
