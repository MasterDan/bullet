export function isNullOrWhiteSpace(
  str: string | null | undefined
): str is null | undefined {
  return str == null || str.trim() === '';
}

export function isNullOrEmty(
  str: string | null | undefined
): str is null | undefined {
  return str == null || str === '';
}
