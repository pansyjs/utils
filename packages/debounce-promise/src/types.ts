export type Wait = (() => number) | number;

export interface Options {
  /**
   * 指定在延迟开始前调用
   * @default false
   */
  leading?: boolean;

  accumulate?: boolean;
}
