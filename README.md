<h1 align="center">Pansy Utils</h1>

<h3 align="center">小巧实用的工具类库</h3>

[![Alita](https://img.shields.io/badge/alitajs-pansy%20utils-blue.svg)](https://github.com/alitajs)
[![NPM version](https://img.shields.io/npm/v/@pansy/utils.svg?style=flat)](https://npmjs.org/package/@pansy/utils)
[![NPM downloads](http://img.shields.io/npm/dm/@pansy/utils.svg?style=flat)](https://npmjs.org/package/@pansy/utils)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)

## ✨ 特性

- 🚀 快速，使用简单，每个包只提供一种功能，可单独安装
- 📦 基于 rollup 进行打包，提供`cjs`、`es`、`umd`三种格式
- 💻 使用 TypeScript 构建，提供完整的类型定义文件

## 🏗 安装

1. 直接下载`public`目录下的`pansy-utils.min.js`使用，支持 UMD 通用模块规范

2. npm 安装

```
# npm 安装
npm install @pansy/utils --save

# yarn 安装 推荐
yarn add  @pansy/utils
```

**也可独立安装每个独立的功能包**

## 🔨 使用

- 浏览器:

```
<script src="pansy-utils.min.js"></script>
<script>
  var result = pansy.isFunction(() => {});
</script>
```

- ES6/TS

```
import { isFunction } from '@pansy/utils';

const fun = () => {};

if (fun) {
  console.log('is function');
}
```

**推荐使用方法**

```
// 只引入需要使用的包
import isFunction from '@pansy/is-function';
```

## 📦 packages

<!-- start-directory -->

| 包名                                                                                                     | 描述                                                                     |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [@pansy/delay](https://github.com/pansyjs/utils/tree/master/packages/delay/)                             | 休眠函数                                                                 |
| [@pansy/dent](https://github.com/pansyjs/utils/tree/master/packages/dent/)                               | 每一行紧跟前导空白的插入值为多行时，保持缩进，且移除每一行的公共前导空白 |
| [@pansy/enhance-type](https://github.com/pansyjs/utils/tree/master/packages/enhance-type/)               | 增强类型                                                                 |
| [@pansy/get-type](https://github.com/pansyjs/utils/tree/master/packages/get-type/)                       | 检测 `value` 的类型                                                      |
| [@pansy/group-by](https://github.com/pansyjs/utils/tree/master/packages/group-by/)                       | 根据迭代函数返回的值对数组进行分组。                                     |
| [@pansy/indent](https://github.com/pansyjs/utils/tree/master/packages/indent/)                           | 每一行紧跟前导空白的插入值为多行时，保持缩进。                           |
| [@pansy/is-array](https://github.com/pansyjs/utils/tree/master/packages/is-array/)                       | 判断当前值是否为数组                                                     |
| [@pansy/is-boolean](https://github.com/pansyjs/utils/tree/master/packages/is-boolean/)                   | 判断当前值是否为 boolean                                                 |
| [@pansy/is-date](https://github.com/pansyjs/utils/tree/master/packages/is-date/)                         | 判断当前值是否是一个日期                                                 |
| [@pansy/is-function](https://github.com/pansyjs/utils/tree/master/packages/is-function/)                 | 判断当前值是否为函数                                                     |
| [@pansy/is-integer](https://github.com/pansyjs/utils/tree/master/packages/is-integer/)                   | 判断当前值是否为一个整数                                                 |
| [@pansy/is-nan](https://github.com/pansyjs/utils/tree/master/packages/is-nan/)                           | 判断当前值是否为`NaN`                                                    |
| [@pansy/is-negative-integer](https://github.com/pansyjs/utils/tree/master/packages/is-negative-integer/) | 判断当前值是否为一个负整数                                               |
| [@pansy/is-nil](https://github.com/pansyjs/utils/tree/master/packages/is-nil/)                           | 判断当前值是否为 null 或 undefined                                       |
| [@pansy/is-null](https://github.com/pansyjs/utils/tree/master/packages/is-nulll/)                        | 判断当前值是否为空                                                       |
| [@pansy/is-number](https://github.com/pansyjs/utils/tree/master/packages/is-number/)                     | 判断当前值是否为数字                                                     |
| [@pansy/is-object](https://github.com/pansyjs/utils/tree/master/packages/is-object/)                     | 判断当前值是否为对象                                                     |
| [@pansy/is-plain-object](https://github.com/pansyjs/utils/tree/master/packages/is-plain-object/)         | 判断当前值是否为简单对象                                                 |
| [@pansy/is-promise](https://github.com/pansyjs/utils/tree/master/packages/is-promise/)                   | 判断当前值是否为`promise`                                                |
| [@pansy/is-regexp](https://github.com/pansyjs/utils/tree/master/packages/is-regexp/)                     | 判断当前值是否为正则表达式                                               |
| [@pansy/is-string](https://github.com/pansyjs/utils/tree/master/packages/is-string/)                     | 判断当前值是否为空                                                       |
| [@pansy/is-symbol](https://github.com/pansyjs/utils/tree/master/packages/is-symbol/)                     | 判断当前值是否为原始 `Symbol` 或者 `Symbol` 对象                         |
| [@pansy/is-undefined](https://github.com/pansyjs/utils/tree/master/packages/is-undefined/)               | 判断当前值是否为 undefined                                               |
| [@pansy/number-precision](https://github.com/pansyjs/utils/tree/master/packages/number-precision/)       | 解决浮动运算问题，避免小数点后产生多数值和计算精度损失                   |
| [@pansy/utils](https://github.com/pansyjs/utils/tree/master/packages/pansy-utils/)                       | 小巧实用的工具类库                                                       |
| [@pansy/policy](https://github.com/pansyjs/utils/tree/master/packages/policy/)                           | 解析权限策略，并提供验证功能                                             |
| [@pansy/url-utils](https://github.com/pansyjs/utils/tree/master/packages/url-utils/)                     | url 相关工具方法                                                         |

<!-- end-directory -->

## ⌨️ 本地开发

```
# 克隆项目到本地
git clone git@github.com:pansyjs/utils.git

# 切换到项目目录
cd ./utils

# 安装依赖
yarn bootstarp
```

## 🌟 社区互助

| Github Issue                                      | 钉钉群                                                                                     | 微信群                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [issues](https://github.com/pansyjs/utils/issues) | <img src="https://github.com/alitajs/alita/blob/master/public/dingding.png" width="100" /> | <img src="https://github.com/alitajs/alita/blob/master/public/wechat.png" width="100" /> |
