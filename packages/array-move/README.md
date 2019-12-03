<h1 align="center">@pansy/array-move</h1>

> 将数组项移动到其他位置

## 📦 安装

```
// npm
npm install @pansy/array-move --save

// yarn
yarn add @pansy/array-move

```

## 🔨 使用

```
import arrayMove from '@pansy/array-move';

const input = ['a', 'b', 'c'];

arrayMove(input, 1, 2);
// => ['a', 'c', 'b']

arrayMove(input, -1, 0);
// => ['c', 'a', 'b']

arrayMove(input, -2, -3);
// => ['b', 'a', 'c']
```
