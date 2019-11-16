
import isNull from '../src';

// 正确的测试用例
const correctCase = [
  null
];

// 错误的测试用例
const wrongCase = [
  undefined,
  0,
  '',
  'a',
  true,
  [],
  {},
  ['a']
];

describe('isNull', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isNull(item)).toEqual(true);
    })
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isNull(item)).toEqual(false);
    })
  });
});
