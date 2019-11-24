/**
 * 中文数字语言类型
 */
export interface Lang {
  /**
   * 单个数字
   * @example '零一二三四五六七八九'
   * @length 10
   * */
  digits: string;
  /**
   * 节权位
   * @example '个十百千万亿'
   * @length 6
   */
  unitChars: string;
  /** 负 */
  minus: string;
  /** 点 */
  point: string;
  /**
   * 前缀符合 - toMoney使用
   * @example 人民币
   */
  symbol?: string;
  /** 整 - toMoney使用 */
  complete?: string;
  /**
   * 单位 - toMoney使用
   *
   * @example 元角分
   */
  units?: string
}

/**
 * 语言类型 cn 简体中文 hk 繁体中文
 */
export type LangType = 'cn' | 'hk';

/**
 * ArabicChinese配置
 */
export interface Options {
  /**
   * '万万'化开关，将'亿'转换为'万万'
   *
   * @default false
   */
  ww?: boolean;
  /**
   * 当前语言
   * @default 'cn'
   */
  lang?: LangType;
  /**
   * 十的口语化开关
   *
   * @default false
   */
  tenMin?: boolean;
  /**
   * 输出完整金额开关
   * toMoney使用
   * @default false
   */
  complete?: boolean;
  /**
   * 输出金额前缀字符
   * toMoney使用
   * @default true
   */
  outSymbol?: boolean;
}

export interface NumberResult {
  // 整数部分
  integer: string;
  // 小数部分
  decimal: string | undefined;
  // 负数表示
  minus: boolean;
  // 原有的数值
  num: string;
}
