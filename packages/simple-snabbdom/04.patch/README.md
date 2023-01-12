# Patch

更新根节点

```mermaid
flowchart LR
  patchStart([Patch 函数被调用]) --> ?isVnode{"oldVnode \n是虚拟节点\n还是DOM节点？"}
  ?isVnode --> |是 DOM 节点|isVnodeEqualTrue[将 oldVnode 包装为虚拟节点]-->?isSameVnode{"oldVnode 和 newVnode \n是不是同一节点\n(sel 和 key 都相同)？"}
  ?isVnode --> |是虚拟节点|?isSameVnode
  ?isSameVnode --> |不是|isSameVnodeEqualFalse["暴力删除旧的，插入新的"]
  ?isSameVnode --> |是|isSameVnodeEqualTrue["精细化比较"]
```

## 代码

[`snabbdom.js`](./snabbdom.js)

<!-- @import "./snabbdom.js" {code_block=true line_begin=50} -->

## 示例

```javascript
const example01 = h("div", {}, "文字");
const example02 = h("ul", {}, []);
const example03 = h("ul", {}, h("li", {}, "文字"));
patch(container, example01);
patch(container, example03);
```
