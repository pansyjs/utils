import isRegExp from '.';

// 正确的测试用例
const correctCase = [/a/, /a/g, new RegExp('a', 'g')];

// 错误的测试用例
const wrongCase = [0, '', 'a', true, [], {}, ['a']];

describe('isRegExp', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isRegExp(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isRegExp(item)).toEqual(false);
    });
  });
});
