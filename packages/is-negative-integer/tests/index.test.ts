import isNegativeInteger from '../src';

// 正确的测试用例
const correctCase = [-1, -10, -500];

// 错误的测试用例
const wrongCase = [Infinity, Number.NEGATIVE_INFINITY, 1.2, 2, -0.45, 0, NaN];

describe('isNegativeInteger', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isNegativeInteger(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isNegativeInteger(item)).toEqual(false);
    });
  });
});
