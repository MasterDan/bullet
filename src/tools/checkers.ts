export function isObject(val: unknown): boolean {
    return typeof val === 'object' && !(val instanceof Date);
}
export function isFunction(val: unknown): boolean {
    return typeof val === 'function';
}
