import isDate from '.';

// 正确的测试用例
const correctCase = [new Date()];

// 错误的测试用例
const wrongCase = [undefined, 0, '', 'a', true, [], {}, ['a']];

describe('isDate', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isDate(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isDate(item)).toEqual(false);
    });
  });
});
