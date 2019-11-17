<h1 align="center">@pansy/policy</h1>

> 解析权限策略，并提供验证功能，参考阿里云 [Policy](https://help.aliyun.com/document_detail/28664.html?spm=a2c8b.12215508该.policylist.2.ff466253ERVmtX)

## 📦 安装

```
// npm
npm install @pansy/policy --dev

// yarn
yarn add @pansy/policy

```

## 🔨 使用

```
import Policy from '@pansy/policy';

const actions = [
  { module: 'module1', action: 'action1' },
  { module: 'module1', action: 'action2' },
  { module: 'module1', action: 'action3' },
  { module: 'module2', action: 'action1' },
  { module: 'module2', action: 'action2' },
]

const policy = new Policy(actions);

policy.addPolicy({
  version: 1,
  statement: [
    {
      effect: 'allow',
      action: [
        'module1/*'
      ]
    }
  ]
})

policy.multipleVerify('module1/action1'); // true
policy.multipleVerify('module2/action1'); // false

```

## API

### addPolicy(policy)

添加权限策略

**参数**

1、 policy

```
interface IStatement {
  // 授权效力 allow: 允许 deny: 禁止
  effect: 'allow' | 'deny';
  // 操作列表
  action: '*' | string[];
}

interface IPolicyData {
  version: string | number;
  statement: IStatement[]
}
```

### singleVerify(action: string): boolean

单个action验证

**参数**

1、action

- eg1: `'*'`
- eg2: `'module1/action1'`


### multipleVerify(actions: string | string[]): boolean

单个/多个action验证

**参数**

1、actions

- eg1: `'*'`
- eg2: `'module1/action1'`
- eg3: `['module1/action1', 'module1/action2']`

### combinationVerify(actionStr: string): boolean

组合action验证

> ! 取非 && 且  || 或

**参数**

1、action

- eg1: `'!module1/action1'`
- eg2: `'module1/action1' && 'module1/action2'`
- eg3: `'module1/action1' || 'module1/action2'`

## 策略数据结构

```
{
  // 策略版本
  version: 1,
  // 授权语句
  statement: [
    {
      // 授权效力 allow: 允许 deny: 禁止
      effect: 'allow',
      // 操作 
      // * | string[]
      // eg: "*" 代表可访问所有权限
      // eg: "module1/*" 代表可访问module1下所有权限
      // eg: "module1/action1" 代表可访问module1下action1权限
      action: 'system:*'
    },
    {
      effect: 'allow',
      action: [
        'permission:actionCreate',
        'permission:actionUpdate'
      ]
    }
  ]
}

```
