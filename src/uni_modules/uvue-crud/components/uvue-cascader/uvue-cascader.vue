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
    ref="pickerRef"
    closeOnClickOverlay
    v-bind="$attrs"
    :show="show"
    keyName="label"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="show = false"
    @close="show = false"
  ></u-picker>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { DicItem } from "../../types";

import { ref, computed, watch } from "vue";
import { findTree } from "../../utils";

const props = defineProps({
  modelValue: { type: [String, Number, Array] as PropType<string | number | string[] | number[]> },
  dic: { type: Array as PropType<DicItem[]>, default: () => [] }
});
const emit = defineEmits(["update:modelValue"]);

const selectedLabel = computed(() => {
  return findTree(props.dic, e => e.value == props.modelValue)?.label ?? "";
});

const pickerRef = ref();
watch(
  () => [props.dic, pickerRef.value],
  ([dic, picker]) => {
    if (!dic?.length || !picker) return;
    function setColumns(list: DicItem[], index: number) {
      picker.setColumnValues(index, list);
      if (list[0]?.children) {
        setColumns(list[0].children, index + 1);
      }
    }
    setColumns(dic, 0);
  },
  { immediate: true }
);

const show = ref(false);

function onChange(e: any) {
  const { columnIndex, value } = e;
  if (value[columnIndex]?.children) {
    pickerRef.value.setColumnValues(columnIndex + 1, [...value[columnIndex].children]);
  }
}
function onConfirm(e: any) {
  const { value } = e;
  emit("update:modelValue", value[value.length - 1]?.value);
  show.value = false;
}
</script>
