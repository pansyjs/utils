import { Workspace } from '../types';

interface Opts {
  childrenFieldName: string;
  parentIdsFieldName: string;
}

/**
 * 构建树
 * @param workspace
 * @returns
 */
export function buildTree<D extends object>(
  workspace: Workspace<D>,
  {
    parentIdsFieldName,
    childrenFieldName,
  }: Opts
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
