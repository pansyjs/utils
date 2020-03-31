import isPlainObject from '.';

// 正确的测试用例
const correctCase = [{}, { x: 1, y: 2 }];

// 错误的测试用例
const wrongCase = [undefined, '', 'a', true, [], ['a']];

describe('isPlainObject', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isPlainObject(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isPlainObject(item)).toEqual(false);
    });
  });
});
