import getType from '@pansy/get-type';

/**
 * 检查 `value` 是否是一个正则对象。
 *
 * @param value 要检查的值
 * @returns `value` 是正则对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isRegExp(/hello/) // => true
 * isRegExp(new RegExp('hello')) // => true
 * ```
 */
export default function isRegExp(
  value: any
): value is RegExp {
  return getType(value) === 'RegExp'
}
