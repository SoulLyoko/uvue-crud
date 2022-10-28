import type { Ref } from "vue";
import type { UvueFormOption } from "../types";

import { computed, watch, unref } from "vue";

import { flatGroupColumn } from "./option";

export function useRules(option: Ref<UvueFormOption>, form: any, formRef: Ref<any>) {
  const rules = computed(() => {
    const allColumn = flatGroupColumn(option.value);
    const allColumnRules = allColumn.map(col => [col.prop, col.rules || []]);

    const dynamicColumn = allColumn.filter(e => e.type == "dynamic");
    const dynamicColumnRules = dynamicColumn
      .map(dcol => {
        if (!Array.isArray(unref(form)?.[dcol.prop!])) return [];
        return (
          unref(form)?.[dcol.prop!]?.map((item: any, index: number) => {
            return (
              dcol.children?.column?.map((col: any) => {
                return [`${dcol.prop}.${index}.${col.prop}`, col.rules || []];
              }) ?? []
            );
          }) ?? []
        );
      })
      .flat(2);

    const allRules = [...allColumnRules, ...dynamicColumnRules];

    return Object.fromEntries(allRules);
  });

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
