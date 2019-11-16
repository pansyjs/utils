
import indent from '../src';

describe('indent', () => {
  it('空字符串', () => {
    expect(indent``).toEqual('');
  });
});
