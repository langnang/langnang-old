# h

根据传参的个数以及类型，动态生成虚拟 DOM

## 代码

[`snabbdom.js`](./snabbdom.js)

<!-- @import "./snabbdom.js" {code_block=true} -->

## 示例

```javascript
h("div", {}, "文字");
```

```json
{
  "sel": "div",
  "data": {},
  "text": "文字"
}
```

```javascript
h("ul", {}, []);
```

```json
{
  "sel": "ul",
  "data": {},
  "children": []
}
```

```javascript
h("ul", {}, h());
```

```json
{
  "sel": "ul",
  "data": {},
  "children": [
    {
      "sel": "li",
      "data": {},
      "text": "文字"
    }
  ]
}
```
