# Visual DOM

```puml
left to right direction
class Node{
  tagName
  innerText
  others
}
class Vnode{
  sel
  data
  children <Array Vnode>
  text
  elm
  key
}

Node --> Vnode::elm
Node::tagName --> Vnode::sel
Node::innerText --> Vnode::text
Node::others --> Vnode::data
```
