import { arrayToTree } from '../src';

const parentIdList = [
  { id: '001', parentId: '' },
  { id: '002', parentId: '' },
  { id: '001001', parentId: '001' },
  { id: '001001001', parentId: '001001' },
  { id: '001002', parentId: '001' },
];

const parentIdsList = [
  { id: '001', parentIds: [] },
  { id: '002', parentIds: [] },
  { id: '001001', parentIds: ['001'] },
  { id: '001001001', parentIds: ['001', '001001'] },
  { id: '001002', parentIds: ['001'] },
];

describe('arrayToTree', () => {
  it('parentId', () => {
    const treeData = [
      {
        id: '001',
        parentId: '',
        parentIds: [],
        children: [
          {
            id: '001001',
            parentId: '001',
            parentIds: ['001'],
            children: [
              {
                id: '001001001',
                parentId: '001001',
                parentIds: ['001', '001001']
              },
            ]
          },
          {
            id: '001002',
            parentId: '001',
            parentIds: ['001']
          },
        ],
      },
      {
        id: '002',
        parentId: '',
        parentIds: []
      },
    ];
    expect(arrayToTree(parentIdList)).toEqual(treeData);
  });

  it('parentIds', () => {
    const treeData = [
      {
        id: '001',
        parentIds: [],
        children: [
          {
            id: '001001',
            parentIds: ['001'],
            children: [
              { id: '001001001', parentIds: ['001', '001001'] },
            ]
          },
          { id: '001002', parentIds: ['001'] },
        ],
      },
      { id: '002', parentIds: [] },
    ];
    expect(arrayToTree(parentIdsList, { mode: 'parentIds' })).toEqual(treeData);
  });
});
