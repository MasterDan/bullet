export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function isAny<T>(arr: Array<T>): boolean {
  return arr != null && arr.length > 0;
}
export function isEmpty<T>(arr: Array<T>): boolean {
  return !isAny(arr);
}
