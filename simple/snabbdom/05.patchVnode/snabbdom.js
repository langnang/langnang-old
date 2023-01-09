function vnode(sel, data, children, text, elm) {
  const key = data.key;
  return { sel, data, children, text, elm, key };
}

function h(sel, b, c) {
  if (arguments.length < 3) throw new Error("arguments.length < 3");
  // 检查参数c的类型
  if (typeof c === "string" || typeof c === "number") {
    // h('div', {}, "文字");
    return vnode(sel, b, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // h('ul', {}, []);
    let children = [];
    // 遍历c
    for (let i = 0; i < c.length; i++) {
      // 检查c[i]必须是个对象
      if (!(typeof c[i] === "object" && c[i].hasOwnProperty("sel"))) {
        throw new Error("传入的数组参数中有项不是h函数");
      }
      children.push(c[i]);
    }
    // 循环结束，返回vnode
    return vnode(sel, b, children, undefined, undefined);
  } else if (typeof c === "object" && c.hasOwnProperty("sel")) {
    // h('ul', {}, h());
    let children = [c];
    return vnode(sel, b, children, undefined, undefined);
  } else {
    throw new Error("传入的第三个参数类型错误");
  }
}

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
    patchVnode(oldVnode, newVnode);
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
      // console.log("新旧节点都有children");
      // updateChildren(elm, oldVnode.children, newVnode.children);
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
