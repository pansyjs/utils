/**
 * 对象键名转换
 */

interface ReplaceObjectKeyConfig {
  simplify?: boolean;
  childrenKey?: string;
  filter?: (obj: any) => void;
}

function rk(data: object[] | object, options: object, config: ReplaceObjectKeyConfig) {
  const { simplify, childrenKey, filter } = config;
  const params = {}; // 保证键值顺序性
  Object.entries(data).forEach(([key, val]) => {
    // simplify: true 全替换，多余参数过滤掉
    // simplify: false 换配置中没有找到则用原来键名
    // 如果key为子集键名则采用key
    let fields = simplify ? (key === childrenKey ? key : options[key]) : options[key] || key;

    if (fields) {
      if (!Array.isArray(fields)) fields = [fields];

      fields.forEach((field: string) => {
        Reflect.set(params, field, val);
      });
    }
  });

  // 过滤数据
  return filter ? filter(params) : params;
}

/** 对象键名替换 */
const replaceObjectKey = function f(
  data: object[] | object,
  options: object,
  config?: ReplaceObjectKeyConfig
) {
  // 如果未配置 options a或者 options 没有值 则直接返回对象
  if (!options || !Object.keys(options).length) return data;

  const nextConfig: ReplaceObjectKeyConfig = {
    simplify: true,
    childrenKey: 'children',
    ...config
  };

  const childrenKey = nextConfig.childrenKey || 'children';

  if (data && Array.isArray(data)) {
    return data.reduce((final: any, curr: any) => {
      let next = rk(curr, options, nextConfig);

      if (next) {
        // 判断是否有子无素
        const children = next[childrenKey];
        if (children && Array.isArray(children)) {
          next[childrenKey] = f(children, options, nextConfig);
        }

        final.push(next);
      }

      return final;
    }, []);
  } else {
    return rk(data, options, nextConfig);
  }
};

export default replaceObjectKey;
