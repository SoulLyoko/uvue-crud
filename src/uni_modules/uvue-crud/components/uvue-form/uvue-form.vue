<template>
  <u-form class="uvue-form" v-bind="option" ref="formRef" :model="modelValue" :rules="rules">
    <template v-for="(columnItem, columnIndex) in option.column" :key="columnItem.prop || columnIndex">
      <uvue-form-item v-if="columnItem.display" v-bind="columnItem" v-model="vModel[columnItem.prop]">
        <template v-for="(index, slotName) in $slots" #[slotName]="slotProps">
          <slot :name="slotName" v-bind="slotProps"></slot>
        </template>
      </uvue-form-item>
    </template>

    <template v-if="option.group?.length && option.tabs">
      <u-tabs :list="option.group" :current="currentTab" keyName="label" @change="currentTab = $event.index"></u-tabs>
      <template v-for="(groupItem, groupIndex) in option.group" :key="groupItem.prop || groupIndex">
        <template v-if="groupItem.display">
          <template v-for="(columnItem, columnIndex) in groupItem.column" :key="columnItem.prop || columnIndex">
            <uvue-form-item
              v-if="columnItem.display"
              v-bind="columnItem"
              v-model="vModel[columnItem.prop]"
              :style="groupIndex === currentTab ? '' : 'display:none'"
            >
              <template v-for="(index, slotName) in $slots" #[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps"></slot>
              </template>
            </uvue-form-item>
          </template>
        </template>
      </template>
    </template>

    <u-collapse v-if="option.group?.length && !option.tabs" :value="defaultCollapse">
      <template v-for="(groupItem, groupIndex) in option.group" :key="groupItem.prop || groupIndex">
        <u-collapse-item v-if="groupItem.display" :title="groupItem.label" :name="groupItem.prop">
          <template v-for="(columnItem, columnIndex) in groupItem.column" :key="columnItem.prop || columnIndex">
            <uvue-form-item v-if="columnItem.display" v-bind="columnItem" v-model="vModel[columnItem.prop]">
              <template v-for="(index, slotName) in $slots" #[slotName]="slotProps">
                <slot :name="slotName" v-bind="slotProps"></slot>
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

const { option, defaultCollapse, currentTab, currentGroup } = useOption(props, emit);
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
</script>
