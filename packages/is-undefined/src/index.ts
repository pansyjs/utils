/**
 * 检查 `value` 是否是 `undefined`
 *
 * @param value 要检查的值
 * @returns `value` 是 `undefined` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isUndefined(undefined) // => true
 * ```
 */
export default function isUndefined(
  value: any
): value is undefined {
  return value === undefined;
}
