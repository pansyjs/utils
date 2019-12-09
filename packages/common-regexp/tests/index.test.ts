import isNil from '../src';

// 正确的测试用例
const correctCase = [null, undefined];

// 错误的测试用例
const wrongCase = [0, '', 'a', true, [], {}, ['a']];

describe('isNil', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isNil(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isNil(item)).toEqual(false);
    });
  });
});
