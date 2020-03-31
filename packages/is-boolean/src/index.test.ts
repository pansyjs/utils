import isBoolean from '.';

// 正确的测试用例
const correctCase = [true, false];

// 错误的测试用例
const wrongCase = [undefined, 0, '', 'a', [], {}, ['a']];

describe('isBoolean', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isBoolean(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isBoolean(item)).toEqual(false);
    });
  });
});
