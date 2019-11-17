/**
 * 任意函数类型。
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * 任意对象类型。
 */
export type AnyObject = Record<keyof any, any>;

/**
 * 名义化类型。
 *
 * @example
 * ```ts
 * type User = { id: Brand<number, User>, name: string }
 * type Post = { id: Brand<number, Post>, title: string }
 * type UserIdIsNumber = User['id'] extends number ? true: false // => true
 * type PostIdIsNumber = Post['id'] extends number ? true: false // => true
 * type PostIdIsNotUserId = Post['id'] extends User['id'] ? false : true // => true
 * ```
 */
export type Brand<T, B> = T & { __kind__?: B };

/**
 * 字面量联合类型。
 *
 * @example
 * ```ts
 * // before: China, American 将得不到类型提示
 * type Country = 'China' | 'American' | string
 * // after: China, American 将得到类型提示
 * type Country = LiteralUnion<'China' | 'American', string>
 * ```
 */
export type LiteralUnion<L, B> = L | Brand<B, never>;
