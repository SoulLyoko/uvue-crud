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
    v-bind="$attrs"
    :modelValue="defaultValue"
    :show="show"
    :mode="$attrs.type"
    closeOnClickOverlay
    @confirm="onConfirm"
    @cancel="show = false"
    @close="show = false"
  ></u-datetime-picker>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

import { ref, useAttrs, computed } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  modelValue: { type: [String, Number] as PropType<string | number> }
});
const emit = defineEmits(["update:modelValue", "change"]);

const defaultValue = computed(() => props.modelValue || Date.now());

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
  const f = attrs.valueFormat || formatMap[mode];
  const d = dayjs(value).format(f as string);
  emit("update:modelValue", d);
  emit("change", d);
  show.value = false;
}
</script>
