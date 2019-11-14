/**
 * 检查 `value` 是否是一个函数。
 *
 * @param value 要检查的值
 * @returns `value` 是函数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isFunction(() => {}) // => true
 * isFunction(2000) // => false
 * ```
 */
export default function isFunction(value: any): value is Function {
  return typeof value === 'function'
}
