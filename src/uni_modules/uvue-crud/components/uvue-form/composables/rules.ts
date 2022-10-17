import type { Ref } from "vue";
import type { UvueFormOption } from "../types";

import { computed, watch } from "vue";

import { flatGroupColumn } from "./option";

export function useRules(option: Ref<UvueFormOption>, form: Ref<any>, formRef: any) {
  const rules = computed(() => {
    const allColumn = flatGroupColumn(option.value);
    const allColumnRules = allColumn.map(col => [col.prop, col.rules || []]);

    const dynamicColumn = allColumn.filter(e => e.type == "dynamic");
    const dynamicColumnRules = dynamicColumn
      .map(dcol => {
        if (!Array.isArray(form.value?.[dcol.prop!])) return [];
        return (
          form.value?.[dcol.prop!]?.map((item: any, index: number) => {
            return (
              dcol.children?.column?.map((col: any) => {
                return [`${dcol.prop as string}.${index}.${col.prop}`, col.rules || []];
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
