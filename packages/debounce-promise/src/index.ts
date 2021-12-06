import { getWait, defer } from './utils';
import { Options, Wait } from './types';

type Deferred = ReturnType<typeof defer>;

/**
 * 创建一个去抖动版本的承诺返回函数
 * @param func 要防抖动的函数
 * @param wait 需要延迟的毫秒数
 * @param opts.leading 指定在延迟开始前调用
 * @param opts.accumulate 指定在延迟开始前调用
 */
export function debouncePromise<T extends (...args: any[]) => any>(
  func: T,
  wait: Wait = 0,
  opts: Options = {},
) {
  let lastCallAt: number;
  let deferred: Deferred | null;
  let timer: NodeJS.Timeout;
  let pendingArgs: Parameters<T>[] = [];

  return function debounced(...args: Parameters<T>) {
    const currentWait = getWait(wait);
    const currentTime = new Date().getTime();

    // @ts-ignore
    const that = this;

    const isCold = !lastCallAt || (currentTime - lastCallAt) > currentWait;

    lastCallAt = currentTime;

    if (isCold && opts.leading) {
      return opts.accumulate
        ? Promise.resolve(func.call(that, [args])).then(result => result[0])
        : Promise.resolve(func.call(that, ...args))
    }

    if (!deferred) {
      deferred = defer();
    } else {
      clearTimeout(timer);
    }

    pendingArgs.push(args);
    timer = setTimeout(
      () => {
        clearTimeout(timer);

        Promise.resolve(
          opts.accumulate
            ? func.call(that, pendingArgs)
            : func.apply(that, pendingArgs[pendingArgs.length - 1])
        )
          .then(deferred!.resolve, deferred!.reject);

        pendingArgs = []
        deferred = null
      },
      currentWait
    );

    if (opts.accumulate) {
      const argsIndex = pendingArgs.length - 1;
      return deferred.promise.then((results: any) => results[argsIndex])
    }

    return deferred.promise;
  }
}
