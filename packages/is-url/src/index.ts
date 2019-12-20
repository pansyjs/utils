import isString from '@pansy/is-string';

const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

/**
 * 检查字符串是否是 url
 *
 * @param value 要检查的值
 * @returns `value` 是 Url 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isUrl('https://www.baidu.com') // => true
 * ```
 */
export default function isUrl(value: string) {
  if (!isString(value)) {
    return false;
  }

  const match = value.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true;
  }

  return false;
}
