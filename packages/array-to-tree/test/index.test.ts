import { arrayToTree } from '../src';

describe('arrayToTree', () => {
  it('mode 为 parentId 时', () => {
    const source = [
      { id: '001', parentId: '' },
      { id: '002', parentId: '' },
      { id: '001001', parentId: '001' },
      { id: '001001001', parentId: '001001' },
      { id: '001002', parentId: '001' },
    ];

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
    expect(arrayToTree(source).treeData).toEqual(treeData);
  });

  it('叶子节点存在相同数据时，可正常构建树！', () => {
    const source = [
      { id: '001', name: '模块1', parentId: '0' },
      { id: '001001', name: '页面1', parentId: '001' },
      { id: '001002', name: '页面2', parentId: '001' },
      { id: '001001001', name: '按钮1', parentId: '001001' },
      { id: '001001001', name: '按钮1', parentId: '001002' },
    ];

    const { treeData } = arrayToTree(source, {
      rootId: '0',
    });

    expect(treeData).toEqual([
      {
        id: '001',
        name: "模块1",
        parentId: '0',
        parentIds: [],
        children: [
          {
            id: '001001',
            name: "页面1",
            parentId: '001',
            parentIds: [
              '001'
            ],
            children: [
              {
                id: '001001001',
                name: '按钮1',
                parentId: '001001',
                parentIds: [
                  '001',
                  '001001'
                ]
              }
            ]
          },
          {
            id: '001002',
            name: '页面2',
            parentId: '001',
            parentIds: [
              '001'
            ],
            children: [
              {
                id: '001001001',
                name: '按钮1',
                parentId: '001002',
                parentIds: [
                  '001',
                  '001002'
                ]
              }
            ]
          }
        ]
      }
    ]);
  });

  it('使用 transformItem', () => {
    const source = [
      { id: '001', parentId: '' },
      { id: '002', parentId: '' },
    ];

    const { treeData } = arrayToTree(source, {
      transformItem: (item) => {
        return {
          ...item,
          key: item.id,
        }
      }
    })

    expect(treeData).toEqual([
      { id: '001', key: '001', parentId: '', parentIds: [] },
      { id: '002', key: '002', parentId: '', parentIds: [] },
    ]);
  });

  it('mode 为 parentIds 时', () => {
    const source = [
      { id: '001', parentIds: [] },
      { id: '002', parentIds: [] },
      { id: '001001', parentIds: ['001'] },
      { id: '001001001', parentIds: ['001', '001001'] },
      { id: '001002', parentIds: ['001'] },
    ];

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
    expect(arrayToTree(source, { mode: 'parentIds' }).treeData).toEqual(treeData);
  });
});
