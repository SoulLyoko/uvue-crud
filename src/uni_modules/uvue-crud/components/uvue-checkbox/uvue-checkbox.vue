<template>
  <u-checkbox-group
    v-bind="$attrs"
    @update:modelValue="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  >
    <u-checkbox v-for="item in dic" :key="item.value" v-bind="item" :label="item.label" :name="item.value"></u-checkbox>
  </u-checkbox-group>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  dic: { type: Array as PropType<{ label?: string; value?: string }[]>, default: () => [] }
});
</script>
