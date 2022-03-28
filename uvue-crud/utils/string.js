/**
 * 任意值转为字符串
 * @param {any} value
 * @returns string
 */
export function toString(value) {
  if (value == null) {
    return "";
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map(other => (other == null ? other : toString(other)))}`;
  }
  if (typeof value == "symbol") {
    return value.toString();
  }
  const result = `${value}`;
  return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
