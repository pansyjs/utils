
import isNull from '../src';

describe('isNull', () => {
  it('test null', () => {
    expect(isNull(null)).toEqual(true);
  });

  it('test string', () => {
    expect(isNull('a')).toEqual(false);
  });

  it('test number', () => {
    expect(isNull(1)).toEqual(false);
  });
});
