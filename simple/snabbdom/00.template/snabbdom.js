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
