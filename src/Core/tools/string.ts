export function isNullOrWhiteSpace(str: string): boolean {
  return str == null || str.trim() === '';
}

export function isNullOrEmty(str: string): boolean {
  return str == null || str === '';
}
