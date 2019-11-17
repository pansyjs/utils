/**
 * 检查`value`是否为`Promise`。
 *
 * @param value
 * @returns {boolean}
 * @example
 * ```
 * isPromise(null)
 * // => false
 * ```
 */
export default function isPromise(
  value: any
): value is Promise<any> {
  return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
}
