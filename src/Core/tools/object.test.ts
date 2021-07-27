import { sameKeys } from './object';

describe('object tools', () => {
  test('sameKeys', () => {
    expect(sameKeys({}, {})).toBe(true);
    expect(sameKeys({ first: 'a' }, {})).toBe(false);
    expect(sameKeys({ first: 'a' }, { first: 'b' })).toBe(true);
    expect(sameKeys({ first: 'a' }, { second: 'b' })).toBe(false);
    expect(
      sameKeys({ first: 'a', second: 'b' }, { second: 'b', first: 'a' })
    ).toBe(true);
  });
});
