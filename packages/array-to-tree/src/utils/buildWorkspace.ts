import isNil from '@pansy/is-nil';
import isFunction from '@pansy/is-function'
import { Workspace, IdVal, CreateTreeMode } from '../types';

interface Opts {
  mode: CreateTreeMode;
  parentIdsFieldName: string;
  transformItem: any;
}

/**
 * 获取树深度为key的数组
 * @param workspace
 * @param data
 * @returns
 */
export function buildWorkspace<D>(
  workspace: Workspace<D>,
  data: D,
  {
    mode,
    transformItem,
    parentIdsFieldName,
  }: Opts,
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
    latestData = transformItem(data);
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
