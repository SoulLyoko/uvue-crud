<template>
  <u-form ref="formRef" class="uvue-form" v-bind="option" :model="modelValue" :rules="rules">
    <!-- 渲染表单项 -->
    <template v-for="(columnItem, columnIndex) in option.column" :key="columnItem.prop || columnIndex">
      <!-- 自定义表单项 -->
      <uvue-form-item
        v-if="columnItem.display && $slots[columnItem.prop as string]"
        v-bind="columnItem"
        v-model="vModel[columnItem.prop!]"
        v-model:dic="formDic[columnItem.prop!]"
      >
        <template #[getSlotName(columnItem)]>
          <slot
            :name="getSlotName(columnItem)"
            :value="vModel[columnItem.prop!]"
            :column="columnItem"
            :readonly="columnItem.readonly"
            :disabled="columnItem.disabled"
            :dic="formDic[columnItem.prop!]"
          ></slot>
        </template>
        <template #[getSlotName(columnItem,true)]>
          <slot
            :name="getSlotName(columnItem, true)"
            :value="vModel[columnItem.prop!]"
            :column="columnItem"
            :readonly="columnItem.readonly"
            :disabled="columnItem.disabled"
            :dic="formDic[columnItem.prop!]"
          ></slot>
        </template>
      </uvue-form-item>
      <!-- 默认表单项 -->
      <uvue-form-item
        v-else-if="columnItem.display"
        v-bind="columnItem"
        v-model="vModel[columnItem.prop!]"
        v-model:dic="formDic[columnItem.prop!]"
      >
        <template #[getSlotName(columnItem,true)]>
          <slot
            :name="getSlotName(columnItem, true)"
            :value="vModel[columnItem.prop!]"
            :column="columnItem"
            :readonly="columnItem.readonly"
            :disabled="columnItem.disabled"
            :dic="formDic[columnItem.prop!]"
          ></slot>
        </template>
      </uvue-form-item>
    </template>

    <!-- 渲染分组表单项 isTabs -->
    <template v-if="option.group?.length && option.tabs">
      <u-tabs :list="option.group" :current="currentTab" keyName="label" @change="currentTab = $event.index"></u-tabs>
      <!-- 自定义分组表单项 isTabs -->
      <template v-for="(groupItem, groupIndex) in option.group" :key="groupItem.prop || groupIndex">
        <template v-if="groupItem.display">
          <template v-for="(columnItem, columnIndex) in groupItem.column" :key="columnItem.prop || columnIndex">
            <uvue-form-item
              v-if="columnItem.display && $slots[columnItem.prop as string]"
              v-bind="columnItem"
              v-model="vModel[columnItem.prop!]"
              v-model:dic="formDic[columnItem.prop!]"
              :style="groupIndex === currentTab ? '' : 'display:none'"
            >
              <template #[getSlotName(columnItem)]>
                <slot
                  :name="columnItem.prop"
                  :value="vModel[columnItem.prop!]"
                  :column="columnItem"
                  :readonly="columnItem.readonly"
                  :disabled="columnItem.disabled"
                  :dic="formDic[columnItem.prop!]"
                ></slot>
              </template>
              <template #[getSlotName(columnItem,true)]>
                <slot
                  :name="getSlotName(columnItem, true)"
                  :value="vModel[columnItem.prop!]"
                  :column="columnItem"
                  :readonly="columnItem.readonly"
                  :disabled="columnItem.disabled"
                  :dic="formDic[columnItem.prop!]"
                ></slot>
              </template>
            </uvue-form-item>
            <!-- 默认分组表单项 isTabs -->
            <uvue-form-item
              v-else-if="columnItem.display"
              v-bind="columnItem"
              v-model="vModel[columnItem.prop!]"
              v-model:dic="formDic[columnItem.prop!]"
              :style="groupIndex === currentTab ? '' : 'display:none'"
            >
              <template #[getSlotName(columnItem,true)]>
                <slot
                  :name="getSlotName(columnItem, true)"
                  :value="vModel[columnItem.prop!]"
                  :column="columnItem"
                  :readonly="columnItem.readonly"
                  :disabled="columnItem.disabled"
                  :dic="formDic[columnItem.prop!]"
                ></slot>
              </template>
            </uvue-form-item>
          </template>
        </template>
      </template>
    </template>

    <!-- 渲染分组表单项 -->
    <u-collapse v-if="option.group?.length && !option.tabs" ref="collapseRef" :value="defaultCollapse">
      <template v-for="(groupItem, groupIndex) in option.group" :key="groupItem.prop || groupIndex">
        <u-collapse-item
          v-if="groupItem.display"
          :title="groupItem.label"
          :name="groupItem.prop"
          :isLink="groupItem.arrow"
          v-bind="groupItem"
          label=""
        >
          <template v-for="(columnItem, columnIndex) in groupItem.column" :key="columnItem.prop || columnIndex">
            <!-- 自定义分组表单项 -->
            <uvue-form-item
              v-if="columnItem.display && $slots[columnItem.prop as string]"
              v-bind="columnItem"
              v-model="vModel[columnItem.prop!]"
              @dynamic-add="initCollapse"
              @dynamic-del="initCollapse"
            >
              <template #[getSlotName(columnItem)]>
                <slot
                  :name="columnItem.prop"
                  :value="vModel[columnItem.prop!]"
                  :column="columnItem"
                  :readonly="columnItem.readonly"
                  :disabled="columnItem.disabled"
                  :dic="formDic[columnItem.prop!]"
                ></slot>
              </template>
              <template #[getSlotName(columnItem,true)]>
                <slot
                  :name="getSlotName(columnItem, true)"
                  :value="vModel[columnItem.prop!]"
                  :column="columnItem"
                  :readonly="columnItem.readonly"
                  :disabled="columnItem.disabled"
                  :dic="formDic[columnItem.prop!]"
                ></slot>
              </template>
            </uvue-form-item>
            <!-- 默认分组表单项 -->
            <uvue-form-item v-else-if="columnItem.display" v-bind="columnItem" v-model="vModel[columnItem.prop!]">
              <template #[getSlotName(columnItem,true)]>
                <slot
                  :name="getSlotName(columnItem, true)"
                  :value="vModel[columnItem.prop!]"
                  :column="columnItem"
                  :readonly="columnItem.readonly"
                  :disabled="columnItem.disabled"
                  :dic="formDic[columnItem.prop!]"
                ></slot>
              </template>
            </uvue-form-item>
          </template>
        </u-collapse-item>
      </template>
    </u-collapse>

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

<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { ref, watch } from "vue";

import { formProps, formEmits } from "./constants";
import { useOption, useRules, useMethods } from "./composables";

const props = defineProps(formProps);
const emit = defineEmits(formEmits);

const vModel = ref<any>({});
watch(
  () => props.modelValue,
  val => (vModel.value = val),
  { immediate: true, deep: true }
);
watch(vModel, val => emit("update:modelValue", val), { deep: true });

const formRef = ref();

const { option, defaultCollapse, currentTab } = useOption(props, emit);
const rules = useRules(option, vModel, formRef);
const methods = useMethods(formRef);
const { validate, resetFields } = methods;
defineExpose(methods);

const submitLoading = ref(false);
async function onSubmit() {
  await validate();
  submitLoading.value = true;
  const loading = () => (submitLoading.value = false);
  emit("submit", props.modelValue, loading);
}

const collapseRef = ref();
function initCollapse() {
  collapseRef.value?.init();
}
function getSlotName(columnItem: any, right = false) {
  return columnItem.prop + (right ? "-right" : "");
}

const formDic = ref<any>({});
</script>
