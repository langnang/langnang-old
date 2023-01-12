# createElement

```mermaid
flowchart LR
  start("Start") --> ?hasText{"vnode 是不是文本"}
  ?hasText --> |是文本| hasTextEqualTrue["element.innerHTML = vnode.text"]-->ed
  ?hasText --> |不是文本| ?hasChildren{"vnode 有没有子节点"}
  ?hasChildren --> |有子节点| hasChildrenEqualTrue["遍历children\n递归创建子节点\n并将创建的子节点添加到当前节点"]-->ed
  ?hasChildren --> |没有子节点|ed
  ed("End 并返回创建节点")
```

## 代码

[`snabbdom.js`](./snabbdom.js)

<!-- @import "./snabbdom.js" {code_block=true line_begin=33} -->

## 示例

```javascript
createElement(h("div", {}, "文字")).nodeType === 1;
// true
createElement(h("ul", {}, [])).nodeType === 1;
// true
createElement(h("ul", {}, h("li", {}, "文字"))).nodeType === 1;
// true
```
