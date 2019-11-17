
import isPromise from '../src';

const promise = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('200 OK');
  }, 1000)
});

// 正确的测试用例
const correctCase = [
  promise
];

// 错误的测试用例
const wrongCase = [
  undefined,
  0,
  '',
  'a',
  true,
  [],
  {},
  ['a']
];

describe('isPromise', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isPromise(item)).toEqual(true);
    })
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isPromise(item)).toEqual(false);
    })
  });
});
