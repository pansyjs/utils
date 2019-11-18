/**
 * 检查 `value` 是否是一个普通对象。
 *
 * @param value 要检查的值
 * @returns `value` 是普通对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPlainObject({}) // => true
 * isPlainObject(Object.create(null)) // => true
 * isPlainObject(() => {}) // => false
 * ```
 */
export default function isPlainObject(value: any): value is Record<keyof any, any> {
  if (typeof value !== 'object' || value === null) return false;

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}
