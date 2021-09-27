import { arrayEquals } from './array';

export function sameKeys(
  one: Record<string, unknown>,
  two: Record<string, unknown>
): boolean {
  return arrayEquals(Object.keys(one).sort(), Object.keys(two).sort());
}

export function isNullOrEmpty(
  // eslint-disable-next-line @typescript-eslint/ban-types
  obj: object | null | undefined
): obj is null | undefined {
  return obj == null || Object.keys(obj).length === 0;
}
