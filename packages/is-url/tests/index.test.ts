import isUrl from '../src';

// 正确的测试用例
const correctCase = [
  'http://google.com',
  'https://google.com',
  'ftp://google.com',
  'http://www.google.com',
  'http://google.com/something',
  'http://google.com?q=query',
  'http://google.com#hash',
  'http://google.com/something?q=query#hash',
  'http://google.co.uk',
  'http://www.google.co.uk',
  'http://google.cat',
  'https://d1f4470da51b49289906b3d6cbd65074@app.getsentry.com/13176',
  'http://0.0.0.0',
  'http://localhost',
  'postgres://u:p@example.com:5702/db',
  'redis://:123@174.129.42.52:13271',
  'mongodb://u:p@example.com:10064/db',
  'ws://chat.example.com/games',
  'wss://secure.example.com/biz',
  'http://localhost:4000',
  'http://localhost:342/a/path',
  '//google.com'
];

// 错误的测试用例
const wrongCase = [
  'http://',
  'http://google',
  'http://google.',
  'google',
  'google.com',
  '',
  undefined,
  {},
  '/abc/'
];

describe('isUrl', () => {
  it('正确的', () => {
    correctCase.forEach((item) => {
      expect(isUrl(item)).toEqual(true);
    });
  });

  it('错误的', () => {
    wrongCase.forEach((item) => {
      expect(isUrl(item as string)).toEqual(false);
    });
  });
});
