<h1 align="center">@pansy/number-precision</h1>

> 解决浮动运算问题，避免小数点后产生多数值和计算精度损失

## 📦 安装

```
// npm
npm install @pansy/number-precision --save

// yarn
yarn add @pansy/number-precision

```

## 🔨 使用

```ts
import NumberPrecision from '@pansy/number-precision';

const np = new NumberPrecision();

// 加法
np.plus(0.1, 0.2); // 0.3

// 乘法
np.times(0.1, 10); // 1

// 减法
np.minus(0.2, 0.1); // 0.1

// 除法
np.divide(0.2, 0.1); // 2
```
