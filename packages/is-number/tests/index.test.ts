
import isNumber from '../src';

// 正确的测试用例
const correctCase = [
  1,
  0,
  -1,
  0.1111,
  -0.1111
];

// 错误的测试用例
const wrongCase = [
  undefined,
  '',
  'a',
  true,
  [],
  {},
  ['a']
];

describe('isNumber', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isNumber(item)).toEqual(true);
    })
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isNumber(item)).toEqual(false);
    })
  });
});
