<template>
  <view class="uvue-form-item">
    <u-input v-if="inputTypes.includes($attrs.type as string)" v-bind="$attrs"></u-input>

    <uvue-datetime-picker v-if="pickerTypes.includes($attrs.type as string)" v-bind="$attrs"></uvue-datetime-picker>

    <u-textarea v-if="$attrs.type === 'textarea'" v-bind="$attrs"></u-textarea>

    <uvue-select v-if="$attrs.type === 'select'" v-bind="$attrs" :dic="dic"></uvue-select>

    <uvue-cascader v-if="$attrs.type === 'cascader'" v-bind="$attrs" :dic="dic"></uvue-cascader>

    <uvue-checkbox v-if="$attrs.type === 'checkbox'" v-bind="$attrs" :dic="dic"></uvue-checkbox>

    <uvue-radio v-if="$attrs.type === 'radio'" v-bind="$attrs" :dic="dic"></uvue-radio>

    <uvue-switch v-if="$attrs.type === 'switch'" v-bind="$attrs" :dic="dic"></uvue-switch>
  </view>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
import { useConfig, useDict } from "../../composables";

const inputTypes = ["input", "text", "password", "number"]; // 显示input组件的类型
const pickerTypes = ["date", "time", "datetime"]; // 显示picker组件的类型

const dic = useDict(useAttrs(), useConfig().request);
</script>

<style lang="scss" scoped>
.uvue-form-item {
  width: 100%;
}
</style>
