import isArray from '@pansy/is-array';
import isObject from '@pansy/is-object';
import isEmptyObject from '@pansy/is-empty-object';

interface ReplaceConfig {
  simplify?: boolean;
  childrenKey?: string;
  filter?: (obj: any) => void;
}

function replaceKeys(data: object[] | object, options: object, config: ReplaceConfig) {
  const { simplify, childrenKey, filter } = config;
  const params = {}; // 保证键值顺序性
  Object.entries(data).forEach(([key, val]) => {
    // simplify: true 全替换，多余参数过滤掉
    // simplify: false 换配置中没有找到则用原来键名
    // 如果key为子集键名则采用key
    let fields = simplify ? (key === childrenKey ? key : options[key]) : options[key] || key;

    if (fields) {
      if (!isArray(fields)) fields = [fields];

      fields.forEach((field: string) => {
        Reflect.set(params, field, val);
      });
    }
  });

  // 过滤数据
  return filter ? filter(params) : params;
}

/**
 * 替换对象键名，支持普通对象、对象数组以及树对象，支持过滤功能
 *
 * @param data 需要处理的数据
 * @param options 替换配置
 * @param config 替换配置
 * @returns 处理后的数据
 * @example
 * ```ts
 * replaceObjectKeys({ a: 1, b: 2, c: 3 }, { c: 'value' })
 * // => { value: 3 }
 * ```
 */
const replaceObjectKeys = function f(
  data: object[] | object,
  options: object,
  config?: ReplaceConfig
) {
  // 如果未配置 options 则直接返回数据
  if (!data || !options || isEmptyObject(options)) return data;

  const nextConfig: ReplaceConfig = {
    simplify: true,
    childrenKey: 'children',
    ...config
  };

  const childrenKey = nextConfig.childrenKey || 'children';

  if (isObject) {
    return replaceKeys(data, options, nextConfig);
  }

  if (isArray(data)) {
    return data.reduce((final: any, curr: any) => {
      let next = replaceKeys(curr, options, nextConfig);

      if (next) {
        // 判断是否有子无素
        const children = next[childrenKey];
        if (children && isArray(children)) {
          next[childrenKey] = f(children, options, nextConfig);
        }

        final.push(next);
      }

      return final;
    }, []);
  }

  return data;
};

export default replaceObjectKeys;
