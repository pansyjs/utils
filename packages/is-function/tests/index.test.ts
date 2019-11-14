
import isArray from '../src';

describe('isArray', () => {
  it('test null', () => {
    expect(isArray(null)).toEqual(false);
  });

  it('test string', () => {
    expect(isArray('a')).toEqual(false);
  });

  it('test number', () => {
    expect(isArray(1)).toEqual(false);
  });

  it('test []', () => {
    expect(isArray([])).toEqual(true);
  });
});
