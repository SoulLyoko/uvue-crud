<template>
  <u-input
    v-bind="$attrs"
    type="text"
    :modelValue="modelValue"
    suffixIcon="arrow-right"
    readonly
    @click="!$attrs.disabled && (show = true)"
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

const props = defineProps({
  modelValue: { type: [String, Number, Array] as PropType<string | number | string[] | number[]> }
});
const emit = defineEmits(["update:modelValue"]);

const show = ref(false);

const formatMap = {
  date: "YYYY-MM-DD",
  time: "HH:mm:ss",
  datetime: "YYYY-MM-DD HH:mm:ss"
};

const { valueFormat } = useAttrs();

function onConfirm({ value, mode }: { value: number; mode: "date" | "time" | "datetime" }) {
  const f = valueFormat || formatMap[mode];
  const d = dayjs(value).format(f as string);
  emit("update:modelValue", d);
  show.value = false;
}
</script>
