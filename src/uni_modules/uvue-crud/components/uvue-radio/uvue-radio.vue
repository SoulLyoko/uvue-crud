<template>
  <u-radio-group v-bind="$attrs">
    <u-radio v-for="item in dic" :key="item.value" v-bind="item" :label="item.label" :name="item.value"></u-radio>
  </u-radio-group>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  dic: { type: Array as PropType<{ label?: string; value?: string }[]>, default: () => [] }
});
</script>
