import isFunction from '@pansy/is-function';
import { Options, Workspace } from './types';
import { getParentIds, buildTree, buildWorkspace } from './utils';

export function arrayToTree<T extends object>(
  list: T[],
  options: Options<T> = {}
) {
  const {
    rootId = '',
    fieldNames,
    mode = 'parentId',
    transformItem,
    getTreeMapKey,
  } = options;

  const idFieldName = fieldNames?.id ?? 'id';
  const parentIdFieldName = fieldNames?.parentId ?? 'parentId';
  const childrenFieldName = fieldNames?.children ?? 'children';

  let parentIdsFieldName = fieldNames?.parentIds ?? 'parentIds';

  if (mode === 'parentId') {
    parentIdsFieldName = 'parentIds';
  }

  if (!Array.isArray(list)) {
    throw new TypeError('Expected an array but got an invalid argument');
  }

  // 如果使用 id-parentId 形式的数据，则将其转换成parentIds的数据机构
  if (mode === 'parentId') {
    list = list.map(item => {
      if (isFunction(transformItem)) {
        item = transformItem(item);
      }

      const pIds = getParentIds(list, item, {
        rootId,
        idFieldName,
        parentIdFieldName,
      });

      return {
        ...item,
        parentIds: pIds,
      }
    });
  }

  const workspace = list.reduce<Workspace<T>>(
    (prev, cur) => {
      if (cur) {
        prev = buildWorkspace(prev, cur, {
          mode,
          transformItem,
          parentIdsFieldName,
        });
      }
      return prev;
    },
    [],
  );

  const treeData = buildTree(workspace, {
    childrenFieldName,
    parentIdsFieldName,
  });

  const treeMap = Object.keys(workspace)
    .reduce<Record<string, T>>((prev, cur) => {
      const itemMap = Object.keys(workspace[cur])
        .reduce((prev1, cur1) => {
          const infos =  workspace[cur][cur1];

          infos.forEach((info: T) => {
            const key = isFunction(getTreeMapKey)
              ? getTreeMapKey(info)
              : info[idFieldName];

            prev1[key] = info;
          })

          return prev1;
        }, {});

      return {
        ...prev,
        ...itemMap
      };
    }, {});

  return {
    treeData,
    treeMap,
  }
}
