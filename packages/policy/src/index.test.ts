import Policy, { Action } from '.';

const actions: Action[] = [
  { module: 'module1', action: 'action1' },
  { module: 'module1', action: 'action2' },
  { module: 'module1', action: 'action3' },
  { module: 'module2', action: 'action1' },
  { module: 'module2', action: 'action2' },
  { module: 'module3', action: 'action1' }
];

let policy1: Policy;
let policy2: Policy;

beforeEach(() => {
  policy1 = new Policy(actions);
  policy2 = new Policy(actions, ':');
});

describe('Policy', () => {
  it('init', () => {
    expect(policy1.moduleMap).toEqual({
      module1: ['module1/action1', 'module1/action2', 'module1/action3'],
      module2: ['module2/action1', 'module2/action2'],
      module3: ['module3/action1']
    });
  });

  it('add allow policy', () => {
    policy1.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1/*']
        }
      ]
    });

    expect(policy1.allowActions).toEqual(['module1/action1', 'module1/action2', 'module1/action3']);
  });

  it('add deny policy', () => {
    policy1.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'deny',
          action: ['module1/action1', 'module2/*']
        }
      ]
    });

    expect(policy1.denyActions).toEqual(['module1/action1', 'module2/action1', 'module2/action2']);
  });

  it('add allow and deny', () => {
    policy1.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1/action1']
        },
        {
          effect: 'deny',
          action: ['module1/action1', 'module2/*']
        }
      ]
    });

    expect(policy1.allowActions).toEqual(['module1/action1']);

    expect(policy1.denyActions).toEqual(['module1/action1', 'module2/action1', 'module2/action2']);
  });

  it('multipleVerify string', () => {
    policy1.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1/action1', 'module2/*']
        },
        {
          effect: 'deny',
          action: ['module1/action1']
        }
      ]
    });

    expect(policy1.multipleVerify('module1/action1')).toEqual(false);
  });

  it('multipleVerify array', () => {
    policy1.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1/action1', 'module2/*']
        },
        {
          effect: 'deny',
          action: ['module1/action1']
        }
      ]
    });

    expect(policy1.multipleVerify(['module2/action1', 'module2/action2'])).toEqual(true);
  });

  it('combinationVerify !', () => {
    policy1.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1/action1', 'module2/*']
        },
        {
          effect: 'deny',
          action: ['module1/action1']
        }
      ]
    });

    expect(policy1.combinationVerify('!module1/action1')).toEqual(true);
  });

  it('combinationVerify &&', () => {
    policy1.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1/action1', 'module2/*']
        },
        {
          effect: 'deny',
          action: ['module1/action1']
        }
      ]
    });

    expect(policy1.combinationVerify('module2/action1 && module2/action2')).toEqual(true);
  });

  it('combinationVerify ||', () => {
    policy1.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1/action1', 'module2/*']
        },
        {
          effect: 'deny',
          action: ['module1/action1']
        }
      ]
    });

    expect(policy1.combinationVerify('module2/action1 || module2/action2')).toEqual(true);
  });
});

describe(`Policy separator ':'`, () => {
  it('init', () => {
    expect(policy2.moduleMap).toEqual({
      module1: ['module1:action1', 'module1:action2', 'module1:action3'],
      module2: ['module2:action1', 'module2:action2'],
      module3: ['module3:action1']
    });
  });

  it('add allow policy', () => {
    policy2.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1:*']
        }
      ]
    });

    expect(policy2.allowActions).toEqual(['module1:action1', 'module1:action2', 'module1:action3']);
  });

  it('add deny policy', () => {
    policy2.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'deny',
          action: ['module1:action1', 'module2:*']
        }
      ]
    });

    expect(policy2.denyActions).toEqual(['module1:action1', 'module2:action1', 'module2:action2']);
  });

  it('add allow and deny', () => {
    policy2.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1:action1']
        },
        {
          effect: 'deny',
          action: ['module1:action1', 'module2:*']
        }
      ]
    });

    expect(policy2.allowActions).toEqual(['module1:action1']);

    expect(policy2.denyActions).toEqual(['module1:action1', 'module2:action1', 'module2:action2']);
  });

  it('multipleVerify string', () => {
    policy2.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1:action1', 'module2:*']
        },
        {
          effect: 'deny',
          action: ['module1:action1']
        }
      ]
    });

    expect(policy2.multipleVerify('module1:action1')).toEqual(false);
  });

  it('multipleVerify array', () => {
    policy2.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1:action1', 'module2:*']
        },
        {
          effect: 'deny',
          action: ['module1:action1']
        }
      ]
    });

    expect(policy2.multipleVerify(['module2:action1', 'module2:action2'])).toEqual(true);
  });

  it('combinationVerify !', () => {
    policy2.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1:action1', 'module2:*']
        },
        {
          effect: 'deny',
          action: ['module1:action1']
        }
      ]
    });

    expect(policy2.combinationVerify('!module1:action1')).toEqual(true);
  });

  it('combinationVerify &&', () => {
    policy2.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1:action1', 'module2:*']
        },
        {
          effect: 'deny',
          action: ['module1:action1']
        }
      ]
    });

    expect(policy2.combinationVerify('module2:action1 && module2:action2')).toEqual(true);
  });

  it('combinationVerify ||', () => {
    policy2.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: ['module1:action1', 'module2:*']
        },
        {
          effect: 'deny',
          action: ['module1:action1']
        }
      ]
    });

    expect(policy2.combinationVerify('module2:action1 || module2:action2')).toEqual(true);
  });
});
