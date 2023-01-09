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
      console.log("新旧节点都有children");
      updateChildren(elm, oldVnode.children, newVnode.children);
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
function updateChildren(parentElm, oldChildren, newChildren) {
  console.group("🚀 ~ file: update-children.js:4 ~ updateChildren ~ arguments", {
    parentElm,
    oldChildren,
    newChildren,
  });
  // 旧前
  let oldStartIndex = 0;
  // 新前
  let newStartIndex = 0;
  // 旧后
  let oldEndIndex = oldChildren.length - 1;
  // 新后
  let newEndIndex = newChildren.length - 1;

  // 旧前节点
  let oldStartVnode = oldChildren[oldStartIndex];
  // 旧后节点
  let oldEndVnode = oldChildren[oldEndIndex];
  // 新前节点
  let newStartVnode = newChildren[newStartIndex];
  // 新后节点
  let newEndVnode = newChildren[newEndIndex];

  let keyMap = null;

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    console.log("  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex)", { oldStartIndex, newStartIndex, oldEndIndex, newEndIndex, oldStartVnode, newStartVnode, oldEndVnode, newEndVnode });
    // 首先略过已经加undefined标记的项
    if (oldStartVnode == null || oldChildren[oldStartIndex] == undefined) {
      console.log("1");
      oldStartVnode = oldChildren[++oldStartIndex];
    } else if (oldEndVnode == null) {
      console.log("2");
      oldEndVnode = oldChildren[--oldEndIndex];
    } else if (newStartVnode == null) {
      console.log("3");
      newStartVnode = newChildren[++newStartIndex];
    } else if (newEndVnode == null) {
      console.log("4");
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      // 新前与旧前
      console.log("新前与旧前", { oldStartVnode, newStartVnode });
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      // 新后与旧后
      console.log("新后与旧后", { oldEndVnode, newEndVnode });
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      // 新后与旧前
      console.log("新后与旧前", { oldStartVnode, newEndVnode });
      patchVnode(oldStartVnode, newEndVnode);
      // 此时要移动节点
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibing());
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      // 新前与旧后
      console.log("新前与旧后", { oldEndVnode, newStartVnode });
      patchVnode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldChildren[--oldEndIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else {
      // 制作一个映射对象
      if (!keyMap) {
        keyMap = {};
        // 创建keyMap
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
          const key = oldChildren[i].key;
          if (key != undefined) {
            keyMap[key] = i;
          }
        }
      }
      console.log("🚀 ~ file: update-children.js:73 ~ updateChildren ~ keyMap", keyMap);
      // 寻找当前这项（newStartIndex）这项在keyMap中的映射的位置序好
      const indexInOld = keyMap[newStartVnode.key];
      console.log("🚀 ~ file: update-children.js:69 ~ updateChildren ~ indexInOld", indexInOld);
      if (indexInOld == undefined) {
        // 如果是undefinde，即是全新的项目
        // 被加入的想（newStartVnode）现不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 如果不是undefined，即不是全新的项目，而是要移动
        const elmToMove = oldChildren[indexInOld];
        patchVnode(elmToMove, newStartVnode);
        // 把这项设置为undefined，表示已经处理完该项
        oldChildren[indexInOld] = undefined;
        // 移动，调用insertBefore 也可以实现
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }
      // 指针下移
      newStartVnode = newChildren[++newStartIndex];
    }
  }
  console.log({ oldStartIndex, newStartIndex, oldEndIndex, newEndIndex, oldStartVnode, newStartVnode, oldEndVnode, newEndVnode });
  // 循环结束后，是否存在剩余项
  if (newStartIndex <= newEndIndex) {
    console.log("newChildren 还有剩余节点没有处理，要加项", { newStartIndex, newEndIndex });
    const before = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].elm;
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      // insertBefore方法可以自动识别null，如果是null会自动拍到队尾去，和appendChild是一致了
      // newChildren[i]现在还不是真正的DOM，所以要调用createElement()方法变为DOM
      parentElm.insertBefore(createElement(newChildren[i]), before);
    }
  } else if (oldStartIndex <= oldEndIndex) {
    console.log("oldChildren 还有剩余节点没有处理，要删除项");
    // 删除oldStartIndex和oldEndIndex指针之间的项
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      parentElm.removeChild(oldChildren[i].elm);
    }
  }
  console.groupEnd();
}
