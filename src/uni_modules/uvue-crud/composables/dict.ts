import type { DicItem, Config } from "../types";

import { ref, watchEffect } from "vue";
import { treeMap } from "../utils";

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
  dicQuery?: any;
  dicHeaders?: any;
  dicFormat?: (res: any) => DicItem[];
  dicMethod?: "get" | "post";
}

export function useDict(options: UseDictOptions, request?: Config["request"]) {
  const data = ref<DicItem[]>([]);

  watchEffect(() => {
    const { props = {}, dicData, dicUrl, dicQuery = {}, dicHeaders, dicFormat, dicMethod = "get" } = options;
    const {
      label = "label",
      value = "value",
      children = "children",
      disabled = "disabled",
      res: dataPath = "res.data"
    } = props;
    if (dicData?.length) data.value = dicData;
    if (dicUrl && request) {
      request[dicMethod](dicUrl, { params: dicQuery, ...dicQuery }).then((res: any) => {
        if (dicFormat) {
          data.value = dicFormat(res);
        } else {
          const d = eval(dataPath);
          data.value = treeMap(
            d,
            item => {
              return { label: item[label], value: item[value], disabled: item[disabled] };
            },
            { childrenKey: children }
          );
        }
      });
    }
  });

  return data;
}
