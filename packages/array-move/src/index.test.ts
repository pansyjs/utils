import arrayMove from '.';

describe('arrayMove', () => {
  it('正常情况', () => {
    expect(arrayMove(['a', 'b', 'c'], 1, 2)).toEqual(['a', 'c', 'b']);
  });

  it('from为负值', () => {
    expect(arrayMove(['a', 'b', 'c'], -1, 0)).toEqual(['c', 'a', 'b']);
  });

  it('from、to均为为负值', () => {
    expect(arrayMove(['a', 'b', 'c'], -2, -3)).toEqual(['b', 'a', 'c']);
  });

  it('from超出边界', () => {
    expect(arrayMove(['a', 'b', 'c'], 3, 0)).toEqual([undefined, 'a', 'b', 'c']);
  });
});
