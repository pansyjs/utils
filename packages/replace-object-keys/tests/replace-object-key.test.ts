import replaceObjectKey from '../src';

const options = { key: 'value', name: 'label' };

const objData = { key: '1-1-1', type: 'api', name: 'name-111' };
const objDataResult = { value: '1-1-1', label: 'name-111' };

const arrayData = [
  { key: '1-1-1', type: 'api', name: 'name-111' },
  { key: '1-1-2', type: 'api', name: 'name-112' },
  { key: '1-1-3', type: 'api', name: 'name-113' }
];

const arrayDataResultSimplify = [
  { value: '1-1-1', label: 'name-111' },
  { value: '1-1-2', label: 'name-112' },
  { value: '1-1-3', label: 'name-113' }
];

const arrayDataResult = [
  { value: '1-1-1', type: 'api', label: 'name-111' },
  { value: '1-1-2', type: 'api', label: 'name-112' },
  { value: '1-1-3', type: 'api', label: 'name-113' }
];

const treeData = [
  { key: '0', type: 'route', name: 'name-0' },
  {
    key: '1',
    type: 'route',
    name: 'name-1',
    children: [
      {
        key: '1-0',
        type: 'route',
        name: 'name-10',
        children: [
          { key: '1-0-0', type: 'api', name: 'name-100' },
          { key: '1-0-1', type: 'api', name: 'name-101' }
        ]
      }
    ]
  }
];

const treeDataResult = [
  { value: '0', type: 'route', label: 'name-0' },
  {
    value: '1',
    type: 'route',
    label: 'name-1',
    children: [
      {
        value: '1-0',
        type: 'route',
        label: 'name-10',
        children: [
          { value: '1-0-0', type: 'api', label: 'name-100' },
          { value: '1-0-1', type: 'api', label: 'name-101' }
        ]
      }
    ]
  }
];

describe('replaceObjectKey', () => {
  it('正确的', () => {
    expect(replaceObjectKey(objData, options)).toEqual(objDataResult);

    expect(replaceObjectKey(arrayData, options)).toEqual(arrayDataResultSimplify);
    expect(replaceObjectKey(arrayData, options, { simplify: false })).toEqual(arrayDataResult);
    expect(replaceObjectKey(treeData, options, { simplify: false })).toEqual(treeDataResult);
  });
});
