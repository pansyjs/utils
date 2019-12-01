
import isObject from '../src';

// 正确的测试用例
const correctCase = [
  {},
  [],
  Math,
  () => {},
  /ddd/
];

// 错误的测试用例
const wrongCase = [
  '',
  false,
  null,
  undefined,
  NaN,
  Infinity,
  Number.NEGATIVE_INFINITY
];

describe('isObject', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isObject(item)).toEqual(true);
    })
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isObject(item)).toEqual(false);
    })
  });
});
