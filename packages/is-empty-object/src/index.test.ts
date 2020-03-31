import isEmptyObject from '.';

// 正确的测试用例
const correctCase = [{}];

// 错误的测试用例
const wrongCase = [{ a: 1, b: 1 }];

describe('isEmptyObject', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isEmptyObject(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isEmptyObject(item)).toEqual(false);
    });
  });
});
