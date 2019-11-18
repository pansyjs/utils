
import getType from '../src';

describe('getType', () => {
  it('正确的', () => {
    expect(getType(/a/)).toEqual('RegExp');
  });
});
