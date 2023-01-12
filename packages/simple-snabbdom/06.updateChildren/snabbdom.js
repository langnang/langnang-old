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
