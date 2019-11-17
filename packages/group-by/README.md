<h1 align="center">@pansy/group-by</h1>

> 根据迭代函数返回的值对数组进行分组。

## 📦 安装

```
// npm
npm install @pansy/group-by --dev

// yarn
yarn add @pansy/group-by

```

## 🔨 使用

```
import groupBy from '@pansy/group-by';

const list = [
  { module: 'module1', action: 'action1' },
  { module: 'module1', action: 'action2' },
  { module: 'module2', action: 'action1' }
];

console.log(groupBy(list, item => item.module));

// => {
// =>   module1: [
// =>     { module: 'module1', action: 'action1' },
// =>     { module: 'module1', action: 'action2' },
// =>   ],
// =>   module2: [
// =>     { module: 'module2', action: 'action1' }
// =>   ]
// => }
```
