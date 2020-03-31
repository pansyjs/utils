import isUndefined from '.';

// 正确的测试用例
const correctCase = [undefined];

// 错误的测试用例
const wrongCase = [null, 0, '', 'a', true, [], {}, ['a']];

describe('isUndefined', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isUndefined(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isUndefined(item)).toEqual(false);
    });
  });
});
