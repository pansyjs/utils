import { Wait } from './types';

/**
 * 获取延迟的毫秒数
 * @param wait
 * @returns
 */
export function getWait(wait: Wait) {
  return (typeof wait === 'function') ? wait() : wait
}

/**
 *
 * @returns
 */
export function defer<T = any>() {
  const deferred = {} as {
    promise: Promise<T>;
    resolve: Parameters<Promise<T>['then']>[0];
    reject: Parameters<Promise<T>['then']>[1];
  }

  deferred.promise = new Promise<T>((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  });

  return deferred;
}
