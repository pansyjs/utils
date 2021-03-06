import isString from '@pansy/is-string';
import isArray from '@pansy/is-array';
import groupBy from '@pansy/group-by';
import { Separator, ModuleAction, Action, PolicyData } from './interface';

/**
 * 解析权限策略，并提供验证功能
 *
 * @example
 * ```js
 * const policy = new Policy();
 *
 * const actions = [
 *   { module: 'module1', action: 'action1' },
 *   { module: 'module1', action: 'action2' },
 *   { module: 'module1', action: 'action3' },
 *   { module: 'module2', action: 'action1' },
 *   { module: 'module2', action: 'action2' }
 * ];
 *
 * policy.addPolicy({
 *  version: 1,
 *  statement: [
 *    {
 *      effect: 'allow',
 *      action: [
 *        'module1/*'
 *      ]
 *    }
 *  ]
 * });
 *
 * policy.singleVerify('module1/action1');
 *
 * // >> true
 * ```
 * */
export default class Policy {
  private readonly separator: Separator;
  // 以module为key存储权限
  public moduleMap: ModuleAction = {};
  // 允许的权限集合
  public allowActions: string[];
  // 禁止的权限集合
  public denyActions: string[];

  /**
   * @param actions 操作集合
   * @param separator 分隔符 默认: '/'
   * */
  constructor(actions: Action[], separator?: Separator) {
    // 分隔符自定义
    this.separator = separator || '/';
    // 模块的操作集合
    this.moduleMap = this.getModuleMap(actions);
    // 允许的操作
    this.allowActions = [];
    // 拒绝的操作
    this.denyActions = [];
  }

  /**
   * 按照模块组织操作
   * @param actions 权限集合
   * */
  private getModuleMap = (actions: Action[] = []): ModuleAction => {
    let moduleMap = {};

    if (actions) {
      moduleMap = groupBy(actions, item => item.module, (item) => {
        return `${item.module}${this.separator}${item.action}`;
      });
    }

    return moduleMap;
  };

  /**
   * 验证组合条件的权限
   * @param actionStr 需要验证的权限
   * @example
   * ```js
   * policy.combinationVerify('((goods/create && !goods/list) && goods/info)')
   * ```
   * */
  combinationVerify = (actionStr: string): boolean => {
    const regStr = `([\\w|\\d|\\*]+${this.separator === '/' ? '\\/' : ':'}[\\w|*]+)|\\*`;
    const reg = new RegExp(regStr, 'g');
    (actionStr.match(reg) || []).map((item) => {
      const result = this.singleVerify(item) ? 'true' : 'false';
      actionStr = actionStr.replace(new RegExp(regStr), result);
    });
    return !!eval(actionStr)
  };

  /**
   * 验证单个或多个权限
   * @param actions
   */
  multipleVerify = (actions: string | string[]): boolean => {
    if (isString(actions)) {
      return this.singleVerify(actions as string);
    }

    if (isArray(actions)) {
      for(let i = 0, len = actions.length; i < len; i++) {
        const result = this.singleVerify(actions[i]);
        if (!result) {
          return false;
        }
      }
    }

    return true;
  };

  /**
   * 验证单个权限
   * @param action
   */
  singleVerify = (action: string): boolean => {
    // 表示任何用户皆可以访问
    if (action === '*') {
      return true;
    } else {
      // 命中不允许使用的权限
      if (this.denyActions.includes(action)) {
        return false;
      }
      if (this.allowActions.includes(action)) {
        return true;
      }
    }

    // 默认不允许访问
    return false;
  };

  /**
   * 添加权限策略
   * @param policy
   */
  addPolicy = (policy: PolicyData) => {
    if (!policy) return;
    const { statement } = policy;

    // 解析授权语句
    if (statement && statement.length) {
      statement.forEach((item) => {
        const { effect, action } = item;

        let actions: string[] = [];

        if (isString(action)) {
          actions = this.parseAction(action as string);
        }

        if (isArray(action)) {
          (action as string[]).forEach(item => {
            actions = actions.concat(this.parseAction(item));
          });
        }

        // 允许
        if (effect === 'allow') {
          const actionList = this.allowActions.concat(actions);
          this.allowActions = [...new Set(actionList)];
          return;
        }

        // 禁止
        if (effect === 'deny') {
          const actionList = this.denyActions.concat(actions);
          this.denyActions = [...new Set(actionList)];
          return;
        }
      })
    }
  };

  /**
   * 解析权限
   * @param action
   */
  private parseAction = (action: string): string[] => {
    const actions = this.getAllAction();
    let result: string[] = [];

    if (action === '*') {
      result = actions;
    } else {
      const list = action.split(this.separator);
      if (list.length === 2) {
        const moduleName = list[0];
        const actionName = list[1];
        if (actionName === '*') {
          actions.length && (result = this.moduleMap[moduleName] || []) ;
        } else {
          result = [action];
        }
      }
    }
    return result;
  };

  /**
   * 获取所有的Action
   */
  private getAllAction = () => {
    let actions: string[] = [];
    const modules = Object.keys(this.moduleMap);

    modules.forEach((key) => {
      actions = actions.concat(this.moduleMap[key]);
    });

    return actions;
  };
}

export * from './interface';
