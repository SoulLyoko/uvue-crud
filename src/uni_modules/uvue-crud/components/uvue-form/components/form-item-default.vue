<template>
  <!-- 默认的表单项 -->
  <u-input
    v-if="inputTypes.includes($attrs.type as string)"
    v-bind="$attrs"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></u-input>

  <uvue-datetime-picker
    v-if="pickerTypes.includes($attrs.type as string)"
    v-bind="$attrs"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></uvue-datetime-picker>

  <uvue-dict
    v-if="dicTypes.includes($attrs.type as string)"
    v-bind="$attrs"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></uvue-dict>

  <u-textarea
    v-if="$attrs.type === 'textarea'"
    v-bind="$attrs"
    @update:modelValue="$emit('update:modelValue', $event)"
  ></u-textarea>
</template>

<script setup lang="ts">
import { useAttrs, watch } from "vue";

import { useConfig, useDict } from "../../../composables";

const emit = defineEmits(["update:dic"]);

const inputTypes = ["input", "text", "password", "number"]; // 显示input组件的类型
const pickerTypes = ["date", "time", "datetime"]; // 显示picker组件的类型
const dicTypes = ["select", "cascader", "checkbox", "radio", "switch"]; // 显示picker组件的类型

const dic = useDict(useAttrs(), useConfig().request);
watch(dic, val => emit("update:dic", val));
</script>
