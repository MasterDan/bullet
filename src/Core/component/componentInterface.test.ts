import { ComponentInterfaceCustom } from './ComponentInterface';

describe('Component Interface tests', () => {
  test('Compare', () => {
    const first = new ComponentInterfaceCustom({
      props: {
        prop1: 1
      },
      emits: {
        emit1: null
      }
    });
    const second = new ComponentInterfaceCustom({
      props: {
        prop1: 1
      },
      emits: {
        emit1: null
      }
    });
    const third = new ComponentInterfaceCustom({
      props: {
        prop1: 1,
        prop2: 2
      },
      emits: {
        emit1: null
      }
    });
    expect(first.compareWith(second)).toBe(true);
    expect(second.compareWith(first)).toBe(true);
    expect(second.compareWith(third)).toBe(false);
    expect(first.compareWith(third)).toBe(false);
  });
});
