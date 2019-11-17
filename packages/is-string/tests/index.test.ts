
import isString from '../src';

// 正确的测试用例
const correctCase = [
  '',
  'a',
  `b`
];

// 错误的测试用例
const wrongCase = [
  undefined,
  0,
  true,
  [],
  {},
  ['a']
];

describe('isString', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isString(item)).toEqual(true);
    })
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isString(item)).toEqual(false);
    })
  });
});
