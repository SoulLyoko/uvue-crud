<template>
  <u-form class="uvue-form" v-bind="option" ref="formRef" :model="modelValue" :rules="rules">
    <template v-for="(item, index) in option.column" :key="item.prop || index">
      <u-form-item v-if="item.display" v-bind="item">
        <!-- 自定义的表单项 -->
        <slot v-if="$slots[item.prop]" :name="item.prop" v-bind="item"></slot>

        <!-- 默认的表单项 -->
        <uvue-form-item
          v-else
          v-bind="item"
          :modelValue="modelValue[item.prop]"
          @update:modelValue="updateModelValue(item.prop, $event)"
        ></uvue-form-item>

        <!-- 表单项的右插槽 -->
        <template #right>
          <slot :name="item.prop + '-right'" v-bind="item"></slot>
        </template>
      </u-form-item>
    </template>

    <u-button
      v-if="option.submitBtn && formType !== 'view'"
      class="uvue-form__submit"
      type="primary"
      :loading="submitLoading"
      @click="onSubmit"
    >
      {{ option.submitText }}
    </u-button>
    <u-button
      v-if="option.emptyBtn && formType !== 'view'"
      class="uvue-form__empty"
      type="default"
      :loading="submitLoading"
      @click="resetFields"
    >
      {{ option.emptyText }}
    </u-button>
  </u-form>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

import { ref } from "vue";
import { useOption, useRules, useMethods } from "./composables";

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  option: { type: Object, default: () => ({}) },
  defaults: { type: Object, default: () => ({}) },
  formType: { type: String as PropType<"add" | "edit" | "view"> }
});
const emit = defineEmits(["update:modelValue", "update:defaults", "submit"]);

const formRef = ref();

const option = useOption(props, emit);
const rules = useRules(option, formRef);
const methods = useMethods(formRef);
const { validate, resetFields } = methods;
defineExpose(methods);

function updateModelValue(prop: string, value: any) {
  const data = { ...props.modelValue, [prop]: value };
  emit("update:modelValue", data);
}

const submitLoading = ref(false);
async function onSubmit() {
  await validate();
  submitLoading.value = true;
  const loading = () => (submitLoading.value = false);
  emit("submit", props.modelValue, loading);
}
</script>
