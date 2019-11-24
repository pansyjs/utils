
import isArray from '../src';

// 正确的测试用例
const correctCase = [
  [],
  [1],
  new Array()
];

// 错误的测试用例
const wrongCase = [
  null,
  undefined,
  0,
  '',
  'a',
  true,
  {}
];

describe('isArray', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isArray(item)).toEqual(true);
    })
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isArray(item)).toEqual(false);
    })
  });
});
