import isSymbol from '../src';

// 正确的测试用例
const correctCase = [Symbol.iterator];

// 错误的测试用例
const wrongCase = ['', 'a', undefined, 0, true, [], {}, ['a']];

describe('isSymbol', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isSymbol(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isSymbol(item)).toEqual(false);
    });
  });
});
