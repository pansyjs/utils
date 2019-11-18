/**
 * 检查 `value` 是否是 `NaN`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `NaN` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNaN(NaN) // => true
 * isNaN(2) // => false
 * ```
 */
export default function isNaN(
  value: any
): boolean {
  return value !== value;
}
