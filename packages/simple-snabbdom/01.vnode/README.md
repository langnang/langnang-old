# Visual DOM

```puml
left to right direction
class Node{
  tagName
  innerText
  others
}
class Vnode{
  sel: String
  data: <Object Attributes>
  children: <Array Vnode>
  text: String
  elm: <DOM>
  key: String
}

Node::tagName --> Vnode::sel
Node::innerText --> Vnode::text
Node::others --> Vnode::data
```

## 代码

[`snabbdom.js`](./snabbdom.js)

<!-- @import "./snabbdom.js" {code_block=true} -->
