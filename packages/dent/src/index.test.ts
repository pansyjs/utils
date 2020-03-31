import dent from '.';

describe('dent', () => {
  it('空字符串', () => {
    expect(dent``).toEqual('');
  });
});
