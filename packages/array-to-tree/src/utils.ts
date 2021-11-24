import { GetValue } from './types';
import isFunction from '@pansy/is-function';

/**
 * 获取唯一表示的值
 */
export function getFieldValue<D extends object>(
  data: D,
  opts: {
    fieldName: string,
    getValue?: GetValue<D>
  }
) {
  let val = data[opts.fieldName];

  if (isFunction(opts.getValue)) {
    val = opts.getValue(data);
  }

  return val;
}
