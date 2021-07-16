import { isNullOrEmty, isNullOrWhiteSpace } from './string';

describe('string tools', () => {
  test('null or empty', () => {
    expect(isNullOrEmty('Hello')).toBe(false);
    expect(isNullOrEmty(' ')).toBe(false);
    expect(isNullOrEmty('')).toBe(true);
  });
  test('null or whitespace', () => {
    expect(isNullOrWhiteSpace('Hello')).toBe(false);
    expect(isNullOrWhiteSpace(' ')).toBe(true);
    expect(isNullOrWhiteSpace('')).toBe(true);
  });
});
