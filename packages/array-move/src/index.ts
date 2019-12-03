export const mutate = (array: unknown[], from: number, to: number) => {
  const startIndex = to < 0 ? array.length + to : to;
  const item = array.splice(from, 1)[0];
  array.splice(startIndex, 0, item);
};

/**
 * 将数组项移动到其他位置
 * @param array 需要操作的数组
 * @param from 要移动的项目的索引。如果为负，则将从结尾开始查找
 * @param to 将项目移到哪里的索引。如果为负，则将从结尾开始查找
 */
const arrayMove = (array: unknown[], from: number, to: number) => {
  array = array.slice();
  mutate(array, from, to);
  return array;
};

export default arrayMove;
