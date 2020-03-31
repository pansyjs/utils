import indent from '.';

describe('indent', () => {
  it('空字符串', () => {
    expect(indent``).toEqual('');
  });
});
