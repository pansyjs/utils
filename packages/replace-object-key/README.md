<h1 align="center">@pansy/replace-object-key</h1>

> 对象键名转换

## 📦 安装

```
// npm
npm install @pansy/replace-object-key --save

// yarn
yarn add @pansy/replace-object-key

```

## 🔨 使用

```
import { replaceObjectKey } from '@pansy/replace-object-key';
```

### 参数配置

| 参数    | 描述                              | 类型               | 默认值 |
| :------ | --------------------------------- | :----------------- | -----: |
| data    | 需要替换键值名的数据              | object \| object[] |        |
| options | 指定需要替换的键值名              | object             |        |
| config  | 配置转换后数据的格式,具体参考下表 | object             |        |

### config

| 参数        | 描述                                                          | 类型                                | 默认值   |
| :---------- | :------------------------------------------------------------ | :---------------------------------- | :------- |
| simplify    | 是否按替换配置返回数据，设置为 `false` 时同时返回未被替换的值 | boolean                             | true     |
| childrenKey | 当数据为 Tree 类型数据时， 指定其 children 的对应的键名       | string                              | children |
| filter      | 配置数据是否过滤                                              | function(data): object \| undefined |          |

## DEMO

### 基本用法

```js
import { replaceObjectKey } from '@pansy/replace-object-key';

const treeData = [
  { key: '1-1-1', type: 'api', name: 'name-111' },
  { key: '1-1-2', type: 'api', name: 'name-112' },
  { key: '1-1-3', type: 'api', name: 'name-113' }
];

const result = replaceObjectKey(treeData, { name: 'title', key: 'value' });
```

### 带过滤用法

```js
import { replaceObjectKey } from '@pansy/replace-object-key';

const treeData = [
  { key: '0', type: 'route', name: 'name-0' },
  {
    key: '1',
    type: 'route',
    name: 'name-1',
    children: [
      {
        key: '1-0',
        type: 'route',
        name: 'name-10',
        children: [
          { key: '1-0-0', type: 'api', name: 'name-100' },
          { key: '1-0-1', type: 'api', name: 'name-101' }
        ]
      },
      {
        key: '1-1',
        type: 'route',
        name: 'name-11',
        children: [
          { key: '1-1-1', type: 'api', name: 'name-111' },
          { key: '1-1-2', type: 'api', name: 'name-112' },
          { key: '1-1-3', type: 'api', name: 'name-113' }
        ]
      }
    ]
  }
];

// 选出名称为 "name-113", "name-112" 的数据
const filterName = ['name-113', 'name-112'];

const result = replaceObjectKey(
  treeData,
  { name: 'title', key: ['value', 'key'], type: 'type' },
  {
    simplify: false,
    filter: (data) => {
      if (filterName.includes(data.title)) {
        return data;
      }
      return;
    }
  }
);
```
