
import isInteger from '../src';

// 正确的测试用例
const correctCase = [
  1,
  10
];

// 错误的测试用例
const wrongCase = [
  0.1,
  1.1,
  10.111
];

describe('isInteger', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isInteger(item)).toEqual(true);
    })
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isInteger(item)).toEqual(false);
    })
  });
});
