<template>
  <u-input
    v-bind="$attrs"
    type="text"
    :modelValue="modelValue"
    suffixIcon="arrow-right"
    readonly
    @tap="onShow"
  ></u-input>
  <u-datetime-picker
    closeOnClickOverlay
    v-bind="$attrs"
    :show="show"
    :mode="$attrs.type"
    @confirm="onConfirm"
    @cancel="show = false"
    @close="show = false"
  ></u-datetime-picker>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

import { ref, useAttrs } from "vue";
import dayjs from "dayjs";

defineProps({
  modelValue: { type: [String, Number, Array] as PropType<string | number | string[] | number[]> }
});
const emit = defineEmits(["update:modelValue"]);

const formatMap = {
  date: "YYYY-MM-DD",
  time: "HH:mm:ss",
  datetime: "YYYY-MM-DD HH:mm:ss"
};

const attrs = useAttrs();
const show = ref(false);
function onShow() {
  if (attrs.disabled) return;
  show.value = true;
}
function onConfirm({ value, mode }: { value: number; mode: "date" | "time" | "datetime" }) {
  console.log("🚀 ~ file: uvue-datetime-picker.vue ~ line 46 ~ onConfirm ~ value", value);
  const f = attrs.valueFormat || formatMap[mode];
  const d = dayjs(value).format(f as string);
  emit("update:modelValue", d);
  show.value = false;
}
</script>
