export function jsonClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
