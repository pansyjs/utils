import isNil from '@pansy/is-nil';
import isFunction from '@pansy/is-function';
import { Options, IdVal, Workspace } from './types';
import { getFieldValue } from './utils';

export function arrayToTree<T extends object>(
  list: T[],
  options: Options<T> = {}
) {
  const {
    rootId = '',
    fieldNames,
    mode = 'parentId',
    getId,
    getParentId,
    transformItem,
  } = options;

  const idFieldName = fieldNames?.id ?? 'id';
  const parentIdFieldName = fieldNames?.parentId ?? 'parentId';
  let parentIdsFieldName = fieldNames?.parentIds ?? 'parentIds';
  const childrenFieldName = fieldNames?.children ?? 'children';

  if (mode === 'parentId') {
    parentIdsFieldName = 'parentIds';
  }

  if (!Array.isArray(list)) {
    throw new TypeError('Expected an array but got an invalid argument');
  }

  // 如果使用 id-parentId 形式的数据，则将其转换成parentIds的数据机构
  if (mode === 'parentId') {
    list = list.map(item => {
      const pIds = getParentIds(item);

      if (isFunction(transformItem)) {
        item = transformItem(item);
      }

      return {
        ...item,
        parentIds: pIds,
      }
    });
  }

  function getParentIds(data: T) {
    let parentId = getFieldValue(data, {
      fieldName: parentIdFieldName,
      getValue: getParentId,
    });

    const ids: string[] = [];

    if (!isNil(parentId) && parentId !== rootId) {
      ids.push(parentId);
    }

    while (parentId !== rootId) {
      const info = list.find((item) => {
        const id = getFieldValue(item, {
          fieldName: idFieldName,
          getValue: getId,
        });

        return id === parentId;
      });

      if (!info) break;

      parentId = getFieldValue(info, {
        fieldName: parentIdFieldName,
        getValue: getParentId,
      });

      if (!isNil(parentId) && parentId !== rootId) {
        ids.push(parentId);
      }
    }

    return ids.reverse();
  }

  function buildWorkspace<D extends object>(
    workspace: Workspace<D>,
    id: IdVal,
    data: D,
  ) {
    let parentIds = getFieldValue<D>(data, {
      fieldName: parentIdsFieldName
    }) as IdVal[];

    if (!Array.isArray(parentIds)) {
      parentIds = [];
    }

    const depth = parentIds.length;

    if (!workspace[depth]) {
      workspace[depth] = {};
    }

    let latestData = {
      ...data
    };

    if (mode === 'parentIds' && isFunction(transformItem)) {
      latestData = transformItem(data as unknown as T);
    }

    workspace[depth][id] = latestData;

    return workspace;
  }

  /**
   * 构建树
   * @param workspace
   * @returns
   */
  function buildTree<D extends object>(
    workspace: Workspace<D>,
  ) {
    for (let i = workspace.length - 1; i > 0; i--) {
      Object.keys(workspace[i]).forEach((id) => {
        const item = workspace[i][id];

        let parentIds = getFieldValue<D>(item, {
          fieldName: parentIdsFieldName
        }) as IdVal[];

        if (parentIds && parentIds.length > 0) {
          const parentId = parentIds[parentIds.length -1];

          const parent = workspace[i - 1][parentId];

          if (parent) {
            if (parent[`${childrenFieldName}`]) {
              parent[`${childrenFieldName}`].push(item);
            } else {
              parent[`${childrenFieldName}`] = [item];
            }
          }
        }
      })
    }

    if (workspace && workspace.length > 0) {
      return Object.keys(workspace[0]).map((id) => workspace[0][id]);
    } else {
      return [];
    }
  }

  const workspace = list.reduce<Workspace<T>>(
    (prev, cur) => {
      if (cur) {
        const id = getFieldValue(cur, {
          fieldName: idFieldName,
          getValue: getId,
        });

        if (id) {
          prev = buildWorkspace(prev, id, cur);
        }
      }
      return prev;
    },
    [],
  );

  const treeData = buildTree(workspace);

  const treeMap = workspace.reduce((prev, cur) => {
    return {
      ...prev,
      ...cur
    }
  }, {});

  return {
    treeData,
    treeMap,
  }
}
