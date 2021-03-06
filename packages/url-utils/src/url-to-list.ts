/**
 * 转换url为数组
 *
 * @param url string
 * @returns {string[]}
 * @example
 * ```
 * urlToList(test)
 * // => ['/test']
 *
 * urlToList(/admin/user)
 * // => ['/test', '/test/user']
 * ```
 */
export default function urlToList(url: string): string[] {
  const urlList = url.split('/').filter(i => i);
  return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}
