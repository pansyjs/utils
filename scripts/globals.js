import { lodash } from '@birman/utils';

/**
 * 获取所有需要导出的包
 */
function getGlobals() {
  // 获取所有依赖项
  const dependencies = require('./package.json').dependencies;

  /**
   * 判断是否是pansy的包
   * @param name
   */
  function isPansyPackage(name) {
    return /^@pansy\/[\w+]/.test(name);
  }

  const globals = {};

  Object.keys(dependencies).forEach((item) => {
    if (isPansyPackage(item)) {
      globals[item] = lodash.camelCase(item.split('/')[1]);
    }
  });

  return globals;
}
