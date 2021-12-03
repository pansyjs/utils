import { getWait, defer } from './utils';
import { Options } from './types';

type Deferred = ReturnType<typeof defer>;

/**
 * 创建一个防抖的Promise
 * @param func 要防抖动的函数
 * @param wait 需要延迟的毫秒数
 * @param opts 选项对象
 */
export function debouncePromise<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 0,
  opts: Options = {},
) {
  let lastCallAt: number;
  let deferred: Deferred | null;
  let timer: NodeJS.Timeout;
  let pendingArgs: Parameters<T>[] = [];

  return function debounced(...args: Parameters<T>) {
    const currentWait = getWait(wait);
    const currentTime = new Date().getTime();

    const isCold = !lastCallAt || (currentTime - lastCallAt) > currentWait;

    lastCallAt = currentTime;

    if (isCold && opts.leading) {
      return opts.accumulate
        // @ts-ignore
        ? Promise.resolve(func.call(this, [args])).then(result => result[0])
        // @ts-ignore
        : Promise.resolve(func.call(this, ...args))
    }

    if (deferred) {
      clearTimeout(timer)
    } else {
      deferred = defer();
    }

    pendingArgs.push(args);
    // @ts-ignore
    timer = setTimeout(flush.bind(this), currentWait);

    if (opts.accumulate) {
      const argsIndex = pendingArgs.length - 1;
       // @ts-ignore
      return deferred.promise.then(results => results[argsIndex])
    }

    return deferred.promise;
  }

  function flush() {
    const thisDeferred = deferred as Deferred;

    clearTimeout(timer);

    Promise.resolve(
      opts.accumulate
        // @ts-ignore
        ? func.call(this, pendingArgs)
        // @ts-ignore
        : func.apply(this, pendingArgs[pendingArgs.length - 1])
    )
      .then(thisDeferred.resolve, thisDeferred.reject)

    pendingArgs = []
    deferred = null
  }
}
