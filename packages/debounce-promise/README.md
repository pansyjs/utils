<h1 align="center">
  @pansy/debounce-promise
</h1>

<div align="center">
创建一个去抖动版本的承诺返回函数
</div>

## 📦 安装

```
// npm
npm install @pansy/debounce-promise --save

// yarn
yarn add @pansy/debounce-promise
```

## 🔨 使用

```ts
import { debouncePromise } from '@pansy/debounce-promise';

const debounced = debouncePromise(async (value) => value, 100);

[1, 2, 3, 4].forEach(num => {
  return debounced('call no #' + num).then(value => {
    console.log(value)
  })
})

//=> call no #4
//=> call no #4
//=> call no #4
//=> call no #4
```
