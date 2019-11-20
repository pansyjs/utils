
import urlToList from '../src/url-to-list';

describe('urlToList', () => {
  it('正确的', () => {
    expect(urlToList('test')).toEqual(['/test']);
    expect(urlToList('/admin/user')).toEqual(['/test', '/test/user']);
  });
});
