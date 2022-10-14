import type { Data } from "../types";

/**
 * data序列化
 * @param {Object} data 序列化的对象
 * @returns 序列化后的字符串
 */
export function serialize<T extends Data>(data: T) {
  const res: string[] = [];
  Object.keys(data).forEach(key => {
    res.push(`${key}=${data[key]}`);
  });
  return res.join("&");
}

/**
 * url反序列化
 * @param {String} url 反序列化的url
 * @returns 反序列化后的对象
 */
export function deserialize<T = Data>(url: string): T {
  const string = url.split("&");
  const res: Data = {};
  for (let i = 0; i < string.length; i++) {
    const str = string[i].split("=");
    if (str[0] != "") {
      res[str[0]] = str[1];
    }
  }
  return res as T;
}
