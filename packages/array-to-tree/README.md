<h1 align="center">@pansy/array-to-tree</h1>

> 将普通的数组（带有指向父节点的指针）转换为嵌套的数据结构

## 📦 安装

```
// npm
npm install @pansy/array-to-tree --save

// yarn
yarn add @pansy/array-to-tree

```

## 🔨 使用

- 使用parentId模式进行转换

```ts
import { arrayToTree } from '@pansy/array-to-tree';

const source = [
  { id: '001', parentId: '' },
  { id: '002', parentId: '' },
  { id: '001001', parentId: '001' },
  { id: '001001001', parentId: '001001' },
  { id: '001002', parentId: '001' },
];

arrayToTree(source);

// 结果如下
[
  {
    id: '001',
    parentId: '',
    parentIds: [],
    children: [
      {
        id: '001001',
        parentId: '001',
        parentIds: ['001'],
        children: [
          {
            id: '001001001',
            parentId: '001001',
            parentIds: ['001', '001001']
          },
        ]
      },
      {
        id: '001002',
        parentId: '001',
        parentIds: ['001']
      },
    ],
  },
  {
    id: '002',
    parentId: '',
    parentIds: []
  },
];
```

- 使用parentIds模式进行转换

```ts
import { arrayToTree } from '@pansy/array-to-tree';

const source = [
  { id: '001', parentIds: [] },
  { id: '002', parentIds: [] },
  { id: '001001', parentIds: ['001'] },
  { id: '001001001', parentIds: ['001', '001001'] },
  { id: '001002', parentIds: ['001'] },
];

arrayToTree(source);

// 转换结果如下
[
  {
    id: '001',
    parentIds: [],
    children: [
      {
        id: '001001',
        parentIds: ['001'],
        children: [
          { id: '001001001', parentIds: ['001', '001001'] },
        ]
      },
      { id: '001002', parentIds: ['001'] },
    ],
  },
  { id: '002', parentIds: [] },
];
```
