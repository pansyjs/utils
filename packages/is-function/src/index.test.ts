import isFunction from '.';

// 正确的测试用例
const correctCase = [() => {}, function test() {}];

// 错误的测试用例
const wrongCase = [0, '', 'a', true, [], {}, ['a']];

describe('isFunction', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isFunction(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isFunction(item)).toEqual(false);
    });
  });
});
