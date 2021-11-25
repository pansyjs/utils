import isNil from '@pansy/is-nil';
import { IdVal } from '../types';

interface Opts {
  rootId: IdVal;
  idFieldName: string;
  parentIdFieldName: string;
}

/**
 * 获取某个节点所有父节点的Id的数组
 * @param data
 * @returns
 */
export function getParentIds<D>(
  list: D[],
  data: D,
  {
    rootId,
    idFieldName,
    parentIdFieldName,
  }: Opts
) {
  let parentId = data[parentIdFieldName];

  const pIds: string[] = [];

  if (!isNil(parentId) && parentId !== rootId) {
    pIds.push(parentId);
  }

  while (parentId !== rootId) {
    const info = list.find((item) => {
      let id = item[idFieldName];

      return id === parentId;
    });

    if (!info) break;

    parentId = info[parentIdFieldName]

    if (!isNil(parentId) && parentId !== rootId) {
      pIds.push(parentId);
    }
  }

  return pIds.reverse();
}
