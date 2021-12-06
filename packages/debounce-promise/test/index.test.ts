import { debouncePromise } from '../src';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('debouncePromise', () => {
  it('returns the result of a single operation ', async () => {
    const debounced = debouncePromise(async (value) => value, 100);
    const result = await debounced('foo');

    expect(result).toEqual('foo');
  });

  it('returns the result of the latest operation ', async () => {
    const debounced = debouncePromise(async (value) => value, 100)
    const promises = ['foo', 'bar', 'baz', 'qux'].map(debounced)
    const results = await Promise.all(promises);

    expect(results).toEqual(['qux', 'qux', 'qux', 'qux']);
  });

  it('if leading=true, the value from the first promise is used', async () => {
    const debounced = debouncePromise(async (value) => value, 100, {
      leading: true
    })
    const promises = ['foo', 'bar', 'baz', 'qux'].map(debounced)
    const results = await Promise.all(promises)

    expect(results).toEqual(['foo', 'qux', 'qux', 'qux']);
  });

  it('do not call the given function repeatedly', async () => {
    let callCount = 0
    const debounced = debouncePromise(async () => callCount++, 100)
    await Promise.all([1, 2, 3, 4].map(debounced));

    expect(callCount).toEqual(1);
  })

  it(
    'does not call the given function again after the timeout when leading=true if executed only once',
    async () => {
      let callCount = 0
      const debounced = debouncePromise(async () => callCount++, 100, {leading: true})
      await debounced()
      await sleep(200);

      expect(callCount).toEqual(1);
    }
  )

  it(
    'calls the given function again after the timeout when leading=true if executed multiple times',
    async () => {
      let callCount = 0
      const debounced = debouncePromise(async () => callCount++, 100, {
        leading: true
      })
      await Promise.all([1, 2, 3, 4].map(debounced))
      await sleep(200)

      expect(callCount).toEqual(2);
    }
  );

  it('waits until the wait time has passed', async () => {
    let callCount = 0
    const debounced = debouncePromise(async () => callCount++, 10)
    debounced()
    debounced()
    debounced()
    expect(callCount).toEqual(0);
    await sleep(20)
    expect(callCount).toEqual(1);
  });

  it('supports passing function as wait parameter', async () => {
    let callCount = 0;
    let getWaitCallCount = 0;

    const debounced = debouncePromise(
      async () => callCount++,
      () => {
        getWaitCallCount++
        return 100
      }
    );

    debounced()
    debounced()
    debounced()
    await sleep(90);
    expect(callCount).toEqual(0);
    await sleep(20)
    expect(getWaitCallCount).not.toEqual(0);
    expect(callCount).toEqual(1);
  })

  it('calls the given function again if wait time has passed', async () => {
    let callCount = 0
    const debounced = debouncePromise(async () => callCount++, 10)
    debounced()

    await sleep(20);
    expect(callCount).toEqual(1);

    debounced()

    await sleep(20)
    expect(callCount).toEqual(2);
  });

  it('Converts the return value from the producer function to a promise', async () => {
    let callCount = 0
    const debounced = debouncePromise(() => ++callCount, 10)

    debounced()
    debounced()
    await debounced()

    expect(callCount).toEqual(1);
  });
});
