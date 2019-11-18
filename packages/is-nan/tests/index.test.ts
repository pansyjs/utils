
import isNaN from '../src';

// 正确的测试用例
const correctCase = [
  NaN
];

// 错误的测试用例
const wrongCase = [
  null,
  undefined,
  0,
  '',
  'a',
  true,
  [],
  {},
  ['a']
];

describe('isNaN', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isNaN(item)).toEqual(true);
    })
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isNaN(item)).toEqual(false);
    })
  });
});
