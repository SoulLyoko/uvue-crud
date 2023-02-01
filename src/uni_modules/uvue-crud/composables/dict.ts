import type { DicItem, Config } from "../types";

import { ref, watchEffect } from "vue";

import { get, serialize, treeMap } from "../utils";

export interface UseDictOptions {
  props?: {
    label?: string;
    value?: string;
    children?: string;
    disabled?: string;
    res?: string;
  };
  dicData?: DicItem[];
  dicUrl?: string;
  dicQuery?: object;
  dicHeaders?: object;
  dicFormatter?: (res: any) => DicItem[];
  dicMethod?: "get" | "post";
}

const dicStorage: Record<string, DicItem[]> = {};

export function useDict(options: UseDictOptions, request?: Config["request"]) {
  const data = ref<DicItem[]>([]);

  watchEffect(() => {
    const { props = {}, dicData, dicUrl, dicQuery = {}, dicHeaders, dicFormatter, dicMethod = "get" } = options;
    const {
      label = "label",
      value = "value",
      children = "children",
      disabled = "disabled",
      res: dataPath = "data"
    } = props;
    if (dicData?.length) data.value = dicData;
    if (dicUrl && request) {
      const cacheKey = dicUrl + (dicQuery ? "?" + serialize(dicQuery) : "");
      if (dicStorage[cacheKey]) {
        data.value = dicStorage[cacheKey];
        return;
      }
      request[dicMethod](dicUrl, { params: dicQuery, headers: dicHeaders, ...dicQuery }).then((res: any) => {
        if (dicFormatter) {
          data.value = dicFormatter(res);
        } else {
          const d = get(res, dataPath, []);
          data.value = treeMap(
            d,
            item => {
              return { label: item[label], value: item[value], disabled: item[disabled] };
            },
            { childrenKey: children }
          );
        }
        dicStorage[cacheKey] = data.value;
      });
    }
  });

  return data;
}
