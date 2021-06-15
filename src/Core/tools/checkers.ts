// eslint-disable-next-line @typescript-eslint/ban-types
export function isObject(val: unknown): val is object {
  return (
    typeof val === 'object' && !(val instanceof Date) && !Array.isArray(val)
  );
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isArray(val: unknown): val is Array<unknown> {
  return Array.isArray(val);
}
