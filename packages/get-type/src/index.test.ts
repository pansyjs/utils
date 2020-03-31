import getType from '.';

describe('getType', () => {
  it('正确的', () => {
    expect(getType(/a/)).toEqual('RegExp');
  });
});
