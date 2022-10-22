<template>
  <uvue-select
    v-if="type === 'select'"
    v-bind="$attrs"
    :dic="dic"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></uvue-select>
  <uvue-cascader
    v-if="type === 'cascader'"
    v-bind="$attrs"
    :dic="dic"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></uvue-cascader>
  <uvue-checkbox
    v-if="type === 'checkbox'"
    v-bind="$attrs"
    :dic="dic"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></uvue-checkbox>
  <uvue-radio
    v-if="type === 'radio'"
    v-bind="$attrs"
    :dic="dic"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></uvue-radio>
  <uvue-switch
    v-if="type === 'switch'"
    v-bind="$attrs"
    :dic="dic"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></uvue-switch>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { DicItem } from "../../types";

import { useAttrs } from "vue";

import { useConfig, useDict } from "../../composables";

const props = defineProps({
  type: { type: String as PropType<"select" | "cascader" | "checkbox" | "radio" | "switch">, default: "select" },
  dic: { type: Array as PropType<DicItem> }
});

const dic = props.dic ?? useDict(useAttrs(), useConfig().request);
</script>
