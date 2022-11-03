import type { Ref } from "vue";
import type { UvueFormOption } from "../types";

import { watch, unref, ref } from "vue";

import { flatGroupColumn } from "./option";

export function useRules(option: Ref<UvueFormOption>, defaults: Ref<any>, form: Ref<any>, formRef: Ref<any>) {
  const rules = ref({});
  watch(
    () => [option, defaults],
    () => {
      const allColumn = flatGroupColumn(option.value);
      const allColumnRules = allColumn.filter(col => col.display).map(col => [col.prop, col.rules || []]);

      const dynamicColumn = allColumn.filter(e => e.type == "dynamic");
      const dynamicColumnRules = dynamicColumn
        .filter(dcol => dcol.display)
        .map(dcol => {
          if (!Array.isArray(unref(form)?.[dcol.prop!])) return [];
          return (
            unref(form)?.[dcol.prop!]?.map((item: any, index: number) => {
              return (
                dcol.children?.column
                  ?.filter(col => col.display)
                  ?.map((col: any) => {
                    return [`${dcol.prop}.${index}.${col.prop}`, col.rules || []];
                  }) ?? []
              );
            }) ?? []
          );
        })
        .flat(2);

      const allRules = [...allColumnRules, ...dynamicColumnRules];
      rules.value = Object.fromEntries(allRules);
    },
    { deep: true }
  );

  watch(
    () => [formRef.value, rules.value],
    () => {
      if (!formRef.value) return;
      formRef.value.setRules(rules.value);
    },
    { immediate: true }
  );

  return rules;
}
