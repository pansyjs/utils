import isNil from '@pansy/is-nil';
import isFunction from '@pansy/is-function';
import { Options, IdVal, Workspace } from './types';

export function arrayToTree<T extends object>(
  list: T[],
  options: Options<T> = {}
) {
  const {
    rootId = '',
    fieldNames,
    mode = 'parentId',
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

  /**
   * 获取某个节点父节点的的数组
   * @param data
   * @returns
   */
  function getParentIds(data: T) {
    let parentId = data[parentIdFieldName];

    const ids: string[] = [];

    if (!isNil(parentId) && parentId !== rootId) {
      ids.push(parentId);
    }

    while (parentId !== rootId) {
      const info = list.find((item) => {
        let id = item[idFieldName];

        return id === parentId;
      });

      if (!info) break;

      parentId = info[parentIdFieldName]

      if (!isNil(parentId) && parentId !== rootId) {
        ids.push(parentId);
      }
    }

    return ids.reverse();
  }

  /**
   * 获取树深度为key的数组
   * @param workspace
   * @param data
   * @returns
   */
  function buildWorkspace<D>(
    workspace: Workspace<D>,
    data: D,
  ) {

    let parentIds = data[parentIdsFieldName] as IdVal[];

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

    if (latestData) {
      let pId = parentIds[parentIds.length - 1];

      if (parentIds.length === 0) {
        pId = 'rootId';
      }

      if (isNil(pId)) return workspace;

      if (pId && !workspace[depth][pId]) {
        workspace[depth][pId] = [latestData];
      } else {
        workspace[depth][pId].push(latestData);
      }
    }

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
        const items = workspace[i][id] ?? [];

        items.forEach((item) => {
          let pIds = item[parentIdsFieldName];

          if (pIds && pIds.length > 0) {
            const pId = pIds[pIds.length -1];

            // 获取父节点
            const pItems = Object.keys(workspace[i - 1])
              .reduce<D[]>((prev, cur) => {
                return [
                  ...prev,
                  ...workspace[i - 1][cur]
                ]
              }, [])

            const parent = pItems.find((item) => {
              return pId === item['id'];
            });

            if (parent) {
              if (parent[`${childrenFieldName}`]) {
                parent[`${childrenFieldName}`].push(item);
              } else {
                parent[`${childrenFieldName}`] = [item];
              }
            }
          }
        })
      })
    }

    if (workspace && workspace.length > 0) {
      const roots = Object.keys(workspace[0])
        .reduce<D[]>((prev, cur) => {
          return [
            ...prev,
            ...workspace[0][cur],
          ]
        }, []);

      return roots;
    } else {
      return [];
    }
  }

  const workspace = list.reduce<Workspace<T>>(
    (prev, cur) => {
      if (cur) {
        prev = buildWorkspace(prev, cur);
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
