<template>
  <u-input v-if="allowCreate" v-bind="$attrs" type="text" :modelValue="selectedLabel" @update:modelValue="onInput">
    <template #suffix>
      <u-icon name="arrow-right" @tap="onShow"></u-icon>
    </template>
  </u-input>
  <u-input
    v-else
    v-bind="$attrs"
    type="text"
    :modelValue="selectedLabel"
    suffixIcon="arrow-right"
    readonly
    @tap="onShow"
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

import { ref, computed, useAttrs } from "vue";

const props = defineProps({
  modelValue: { type: [String, Number, Array] as PropType<string | number | string[] | number[]> },
  dic: { type: Array as PropType<{ label?: string; value?: string }[]>, default: () => [] },
  allowCreate: { type: Boolean, default: false }
});
const emit = defineEmits(["update:modelValue", "change"]);

const selectedLabel = computed(() => {
  return props.dic?.find(e => e.value == props.modelValue)?.label ?? props.modelValue ?? "";
});

const columns = computed(() => {
  return [props.dic];
});

const attrs = useAttrs();
const show = ref(false);
function onShow() {
  if (attrs.disabled) return;
  show.value = true;
}
function onConfirm({ value }: any) {
  emit("update:modelValue", value[0]?.value);
  emit("change", value[0]?.value);
  show.value = false;
}
function onInput(value: any) {
  emit("update:modelValue", value);
  emit("change", value);
}
</script>
