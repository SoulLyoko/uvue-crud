import { computed, watch } from "vue";

import { flatGroupColumn } from "./option";

export function useRules(option: any, formRef: any) {
  const rules = computed(() => {
    return Object.fromEntries(flatGroupColumn(option.value).map(col => [col.prop, col.rules || []]));
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
