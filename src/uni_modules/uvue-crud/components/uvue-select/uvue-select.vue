<template>
  <u-input
    v-bind="$attrs"
    type="text"
    :modelValue="selectedLabel"
    suffixIcon="arrow-right"
    readonly
    @click="!$attrs.disabled && (show = true)"
  ></u-input>
  <u-picker
    closeOnClickOverlay
    v-bind="$attrs"
    :show="show"
    :columns="columns"
    keyName="label"
    @confirm="onConfirm"
    @cancel="show = false"
    @close="show = false"
  ></u-picker>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

import { ref, computed } from "vue";

const props = defineProps({
  modelValue: { type: [String, Number, Array] as PropType<string | number | string[] | number[]> },
  dic: { type: Array as PropType<{ label?: string; value?: string }[]>, default: () => [] }
});
const emit = defineEmits(["update:modelValue"]);

const selectedLabel = computed(() => {
  return props.dic?.find(e => e.value == props.modelValue)?.label ?? "";
});

const columns = computed(() => {
  return [props.dic];
});

const show = ref(false);

function onConfirm({ value }: any) {
  emit("update:modelValue", value[0]?.value);
  show.value = false;
}
</script>
