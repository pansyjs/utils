
import isObject from '../src';

// 正确的测试用例
const correctCase = [
  {},
  new Object()
];

// 错误的测试用例
const wrongCase = [
  undefined,
  '',
  'a',
  true,
  [],
  ['a']
];

describe('isObject', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isObject(item)).toEqual(true);
    })
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isObject(item)).toEqual(false);
    })
  });
});
