/** 唯一表示的类型 */
export type IdVal = string | number;

/**
 * [{ pid: [{...}, {...}] }]
 */
export type Workspace<T> = Record<IdVal, T[]>[]

/**
 * 创建树的两种模式
 * parentId: 通过 id - parentId 这种形式
 * parentIds: parentIds会存储树的链路
 */
export type CreateTreeMode = 'parentId' | 'parentIds'

export interface Options<T extends object> {
  /**
   * 根节点的Id值
   * @default ''
   */
  rootId?: IdVal;
  /**
   * 自定义节点 id、parentId、children 的字段
   */
  fieldNames?: {
    /** 唯一的节点标识符 */
    id: string;
    /** 可以找到指向父节点的链接的属性的名称 */
    parentId: string;
    /** 可以找到树链路的属性的名称 */
    parentIds: string;
    /** 要存储子节点的属性的名称 */
    children: string;
  };
  /**
   * 创建树的模式
   * @default 'parentId'
   */
  mode?: CreateTreeMode;
  /**
   * 转换每项的数据
   */
  transformItem?: (item: T) => any;
}
