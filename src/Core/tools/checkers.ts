export function isObject(val: unknown): boolean {
  return (
    typeof val === 'object' && !(val instanceof Date) && !Array.isArray(val)
  );
}
export function isFunction(val: unknown): boolean {
  return typeof val === 'function';
}

export function isArray(val: unknown): boolean {
  return Array.isArray(val);
}
