<template>
  <u-form-item
    class="uvue-form-item"
    v-bind="$attrs"
    :label="$attrs.type === 'dynamic' ? '' : $attrs.label"
    :prop="$attrs.dynamicProp || $attrs.prop"
  >
    <!-- 自定义的表单项 -->
    <view v-if="$slots[$attrs.prop as string]" class="uvue-form-item__content">
      <slot :name="$attrs.prop" v-bind="$attrs" :dic="dic"></slot>
    </view>

    <view v-else-if="$attrs.component" class="uvue-form-item__content">
      <component :is="$attrs.component" v-bind="$attrs" :dic="dic"></component>
    </view>

    <!-- 默认的表单项 -->
    <view v-else class="uvue-form-item__content">
      <u-input v-if="inputTypes.includes($attrs.type as string)" v-bind="$attrs"></u-input>

      <uvue-datetime-picker v-if="pickerTypes.includes($attrs.type as string)" v-bind="$attrs"></uvue-datetime-picker>

      <uvue-dict v-if="dicTypes.includes($attrs.type as string)" v-bind="$attrs"></uvue-dict>

      <u-textarea v-if="$attrs.type === 'textarea'" v-bind="$attrs"></u-textarea>

      <uvue-dynamic
        v-if="$attrs.type === 'dynamic'"
        v-bind="$attrs"
        @add="$emit('dynamic-add')"
        @del="$emit('dynamic-del')"
      >
        <template v-for="(index, slotName) in $slots" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps"></slot>
        </template>
      </uvue-dynamic>
    </view>

    <!-- 表单项的右插槽 -->
    <template #right>
      <slot :name="$attrs.prop + '-right'" v-bind="$attrs" :dic="dic"></slot>
    </template>
  </u-form-item>
</template>

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { useAttrs } from "vue";

import { useConfig, useDict } from "../../composables";

const inputTypes = ["input", "text", "password", "number"]; // 显示input组件的类型
const pickerTypes = ["date", "time", "datetime"]; // 显示picker组件的类型
const dicTypes = ["select", "cascader", "checkbox", "radio", "switch"]; // 显示picker组件的类型

const dic = useDict(useAttrs(), useConfig().request);
</script>

<style lang="scss" scoped>
.uvue-form-item {
  width: 100%;
  &__content {
    width: 100%;
  }
}
</style>
