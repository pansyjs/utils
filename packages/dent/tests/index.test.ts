
import dent from '../src';

describe('dent', () => {
  it('空字符串', () => {
    expect(dent``).toEqual('');
  });
});
