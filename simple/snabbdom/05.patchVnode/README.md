# PatchVnode

更新根节点

```mermaid
flowchart LR
  patchVnodeStart(["patchVnode"]) --> ?isSameObject{"oldVnode 和 newVnode \n就是内存中的同一对象？"}
    ?isSameObject --> |是| isSameObjectEqualTrue["什么都不用做"]
    ?isSameObject --> |不是| ?hasPropertyText{"newVnode \n有没有 text 属性？"}
    ?hasPropertyText --> |"没有(意味着newVnode有children)"| ?hasPropertyChildren{"oldVnode 有没有 children"}
    ?hasPropertyChildren --> |有| hasPropertyChildrenEqualTrue{{"最复杂的情况，\n就是新旧vnode都有children，\n此时就要精选最优雅的diff"}}
    ?hasPropertyChildren --> |"没有（意味着oldVnode有text）"| hasPropertyChildrenEqualFalse["1：清空oldVnode中的text。\n2：并且把newVnode的children添加到DOM中。"]
    ?hasPropertyText --> |有| ?isEqualPropertyText{"newVnode 的 text 和oldVnode 是否相同？"}
    ?isEqualPropertyText --> |相同| E["什么都不用做"]
    ?isEqualPropertyText --> |不同| F["把elm中的innerText改变为newVnode的text"]
```

## 代码

[`snabbdom.js`](./snabbdom.js)

<!-- @import "./snabbdom.js" {code_block=true line_begin=54} -->

## 示例

```javascript
const example01 = h("div", {}, "文字");
const example02 = h("ul", {}, []);
const example03 = h("ul", {}, h("li", {}, "文字"));
patch(container, example01);
patch(container, example03);
```
