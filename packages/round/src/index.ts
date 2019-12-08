function nativeRound(
  fn: Math['round'] | Math['ceil'] | Math['floor'],
  number: number,
  precision: number = 0
): number {
  if (number < 0 && fn === Math.round) {
    return -nativeRound(fn, -number, precision);
  }
  precision = precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292);
  if (precision) {
    let pair = `${number}e`.split('e');
    const value = fn(+`${pair[0]}e${+pair[1] + precision}`);
    pair = `${value}e`.split('e');
    return +`${pair[0]}e${+pair[1] - precision}`;
  }
  return fn(number);
}

export type IRoundType = 'default' | 'down' | 'up';

/**
 * 对传入的数字按给定的精度返回。
 *
 * @param number 传入的数字
 * @param precision 精度
 * @param type 处理类型 default: 四舍五入 down: 向下取整 up: 向上取整
 * @returns 返回结果
 * @example
 * ```ts
 * round(3.456) // => 3
 * round(3.456, 1) // => 3.5
 * round(3.456, 2) // => 3.46
 * round(345, -2) // => 300
 * ```
 */
function round(number: number, precision: number = 0, type: IRoundType = 'default') {
  if (type === 'default') {
    return nativeRound(Math.round, number, precision);
  }
  if (type === 'down') {
    return nativeRound(Math.floor, number, precision);
  }
  if (type === 'up') {
    return nativeRound(Math.ceil, number, precision);
  }
  return number;
}

export default round;
