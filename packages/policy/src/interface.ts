/**
 * 解析后的操作集合
 *
 * @example
 * ```js
 * const actions = {
 *   'module1': [
 *     'module1/action1',
 *     'module1/action2'
*     ]
 * }
 * ```
 */
export interface ModuleAction {
  [module: string]: string[]
}

/**
 * 分隔符
 */
export type Separator = '/' | ':';

/**
 * 操作类型 (可理解为权限)
 *
 * @example
 * ```
 * { module: 'module1', action: 'action1' }
 * ```
 */
export interface Action {
  module: string;
  action: string;
}

/**
 * 授权语句
 */
export interface Statement {
  /** 授权效力 allow: 允许 deny: 禁止 */
  effect: 'allow' | 'deny';
  /**
   * 操作列表
   *
   * 1. `*` 表示所有
   * 2. `module/*` 表示`module`模块所有
   * */
  action: '*' | string[];
}

/**
 * 权限策略数据格式
 */
export interface PolicyData {
  /** 该权限策略版本 */
  version: number;
  /** 授权语句集合 */
  statement: Statement[]
}
