export function jsonClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export function pick<T extends object, K extends keyof T>(object: T, props: string | K[]) {
  const keys = typeof props === "string" ? (props.split(",") as K[]) : props;
  Object.keys(object).forEach(key => {
    if (!keys.includes(key as K)) {
      delete object[key as K];
    }
  });
  return object as Pick<T, K>;
}

export function omit<T extends object, K extends keyof T>(object: T, props: string | K[]) {
  const keys = typeof props === "string" ? (props.split(",") as K[]) : props;
  Object.keys(object).forEach(key => {
    if (keys.includes(key as K)) {
      delete object[key as K];
    }
  });
  return object as Omit<T, K>;
}
