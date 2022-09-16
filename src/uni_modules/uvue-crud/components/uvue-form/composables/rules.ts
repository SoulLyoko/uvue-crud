import { computed, watch } from "vue";

export function useRules(option: any, formRef: any) {
  const rules = computed(() => {
    return Object.fromEntries(
      option.value.column.map((col: any) => {
        return [col.prop, col.rules || []];
      })
    );
  });

  watch(
    () => [formRef.value, rules.value],
    () => {
      if (!formRef.value) return;
      formRef.value.setRules(rules.value);
    }
  );

  return rules;
}
