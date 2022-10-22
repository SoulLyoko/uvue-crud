<template>
  <u-switch
    v-bind="switchProps"
    @update:modelValue="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  ></u-switch>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

import { computed, useAttrs } from "vue";

const props = defineProps({
  dic: { type: Array as PropType<{ label?: string; value?: string; color?: string }[]>, default: () => [] }
});

const attrs = useAttrs();
const switchProps = computed(() => {
  const [inactiveItem, activeItem] = props.dic ?? [];
  return {
    ...attrs,
    inactiveValue: inactiveItem?.value,
    inactiveColor: inactiveItem?.color,
    activeValue: activeItem?.value,
    activeColor: activeItem?.color
  };
});
</script>
