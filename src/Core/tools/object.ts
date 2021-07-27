import { arrayEquals } from './array';

export function sameKeys(
  one: Record<string, unknown>,
  two: Record<string, unknown>
): boolean {
  return arrayEquals(Object.keys(one).sort(), Object.keys(two).sort());
}
