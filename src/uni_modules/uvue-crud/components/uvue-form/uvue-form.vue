<template>
  <u-form ref="formRef" class="uvue-form" v-bind="option" :model="modelValue" :rules="rules">
    <!-- 渲染表单项 -->
    <template v-for="(columnItem, columnIndex) in option.column" :key="columnItem.prop || columnIndex">
      <u-form-item
        v-if="columnItem.display"
        class="uvue-form-item"
        v-bind="columnItem"
        :label="columnItem.type === 'dynamic' ? '' : columnItem.label"
      >
        <view class="uvue-form-item__content">
          <!-- 插槽 -->
          <slot v-if="$slots[columnItem.prop!]" :name="columnItem.prop"></slot>
          <!-- 子表单 -->
          <uvue-dynamic
            v-else-if="columnItem.type === 'dynamic'"
            v-bind="columnItem"
            v-model="vModel[columnItem.prop!]"
            @add="initCollapse"
            @del="initCollapse"
          >
            <template #default="{ dataIndex }">
              <template
                v-for="(childColumnItem, childColumnIndex) in columnItem.children?.column"
                :key="childColumnItem.prop || childColumnIndex"
              >
                <u-form-item
                  v-if="childColumnItem.display"
                  class="uvue-form-item"
                  v-bind="childColumnItem"
                  :prop="`${columnItem.prop}.${dataIndex}.${childColumnItem.prop}`"
                >
                  <slot v-if="$slots[childColumnItem.prop!]" :name="childColumnItem.prop"></slot>
                  <form-item-default
                    v-else
                    v-bind="childColumnItem"
                    v-model="vModel[columnItem.prop!][dataIndex][childColumnItem.prop!]"
                  ></form-item-default>
                  <template #right>
                    <slot :name="childColumnItem.prop + '-right'"></slot>
                  </template>
                </u-form-item>
              </template>
            </template>
          </uvue-dynamic>
          <!-- 默认 -->
          <form-item-default v-else v-bind="columnItem" v-model="vModel[columnItem.prop!]"></form-item-default>
          <template #right>
            <slot :name="columnItem.prop + '-right'"></slot>
          </template>
        </view>
      </u-form-item>
    </template>

    <!-- 渲染分组表单项 isTabs -->
    <template v-if="option.group?.length && option.tabs">
      <u-tabs :list="option.group" :current="currentTab" keyName="label" @change="currentTab = $event.index"></u-tabs>
      <!-- 自定义分组表单项 isTabs -->
      <template v-for="(groupItem, groupIndex) in option.group" :key="groupItem.prop || groupIndex">
        <template v-if="groupItem.display">
          <template v-for="(columnItem, columnIndex) in groupItem.column" :key="columnItem.prop || columnIndex">
            <u-form-item
              v-if="columnItem.display"
              class="uvue-form-item"
              v-bind="columnItem"
              :label="columnItem.type === 'dynamic' ? '' : columnItem.label"
              :style="groupIndex === currentTab ? '' : 'display:none'"
            >
              <view class="uvue-form-item__content">
                <!-- 插槽 -->
                <slot v-if="$slots[columnItem.prop!]" :name="columnItem.prop"></slot>
                <!-- 子表单 -->
                <uvue-dynamic
                  v-else-if="columnItem.type === 'dynamic'"
                  v-bind="columnItem"
                  v-model="vModel[columnItem.prop!]"
                  @add="initCollapse"
                  @del="initCollapse"
                >
                  <template #default="{ dataIndex }">
                    <template
                      v-for="(childColumnItem, childColumnIndex) in columnItem.children?.column"
                      :key="childColumnItem.prop || childColumnIndex"
                    >
                      <u-form-item
                        v-if="childColumnItem.display"
                        class="uvue-form-item"
                        v-bind="childColumnItem"
                        :prop="`${columnItem.prop}.${dataIndex}.${childColumnItem.prop}`"
                      >
                        <slot v-if="$slots[childColumnItem.prop!]" :name="childColumnItem.prop"></slot>
                        <form-item-default
                          v-else
                          v-bind="childColumnItem"
                          v-model="vModel[columnItem.prop!][dataIndex][childColumnItem.prop!]"
                        ></form-item-default>
                        <template #right>
                          <slot :name="childColumnItem.prop + '-right'"></slot>
                        </template>
                      </u-form-item>
                    </template>
                  </template>
                </uvue-dynamic>
                <!-- 默认 -->
                <form-item-default v-else v-bind="columnItem" v-model="vModel[columnItem.prop!]"></form-item-default>
                <template #right>
                  <slot :name="columnItem.prop + '-right'"></slot>
                </template>
              </view>
            </u-form-item>
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
            <u-form-item
              v-if="columnItem.display"
              class="uvue-form-item"
              v-bind="columnItem"
              :label="columnItem.type === 'dynamic' ? '' : columnItem.label"
            >
              <view class="uvue-form-item__content">
                <!-- 插槽 -->
                <slot v-if="$slots[columnItem.prop!]" :name="columnItem.prop"></slot>
                <!-- 子表单 -->
                <uvue-dynamic
                  v-else-if="columnItem.type === 'dynamic'"
                  v-bind="columnItem"
                  v-model="vModel[columnItem.prop!]"
                  @add="initCollapse"
                  @del="initCollapse"
                >
                  <template #default="{ dataIndex }">
                    <template
                      v-for="(childColumnItem, childColumnIndex) in columnItem.children?.column"
                      :key="childColumnItem.prop || childColumnIndex"
                    >
                      <u-form-item
                        v-if="childColumnItem.display"
                        class="uvue-form-item"
                        v-bind="childColumnItem"
                        :prop="`${columnItem.prop}.${dataIndex}.${childColumnItem.prop}`"
                      >
                        <slot v-if="$slots[childColumnItem.prop!]" :name="childColumnItem.prop"></slot>
                        <form-item-default
                          v-else
                          v-bind="childColumnItem"
                          v-model="vModel[columnItem.prop!][dataIndex][childColumnItem.prop!]"
                        ></form-item-default>
                        <template #right>
                          <slot :name="childColumnItem.prop + '-right'"></slot>
                        </template>
                      </u-form-item>
                    </template>
                  </template>
                </uvue-dynamic>
                <!-- 默认 -->
                <form-item-default v-else v-bind="columnItem" v-model="vModel[columnItem.prop!]"></form-item-default>
                <template #right>
                  <slot :name="columnItem.prop + '-right'"></slot>
                </template>
              </view>
            </u-form-item>
          </template>
        </u-collapse-item>
      </template>
    </u-collapse>

    <!-- 按钮 -->
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
import { nextTick, ref, watch } from "vue";

import { formProps, formEmits } from "./constants";
import { useOption, useRules, useMethods } from "./composables";
import FormItemDefault from "./components/form-item-default.vue";

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
async function initCollapse() {
  await nextTick();
  await nextTick();
  collapseRef.value?.init();
}
</script>

<style lang="scss" scoped>
.uvue-form {
  width: 100%;
  .uvue-form-item {
    width: 100%;
    &__content {
      width: 100%;
    }
  }
}
</style>
