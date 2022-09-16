<template>
  <uvue-form v-model="form" v-model:defaults="defaults" :option="option" style="padding: 20rpx" @submit="onSubmit">
    <template #input="scoped">
      <u-input v-model="form.input" placeholder="请输入"></u-input>
    </template>
    <template #input-right>
      <view>right</view>
    </template>
  </uvue-form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const form = ref<any>({ input: "", switch: "1" });
const defaults = ref<any>({});
const option = {
  labelWidth: 100,
  column: [
    {
      label: "input",
      prop: "input",
      type: "input",
      rules: [{ required: true, message: "请输入" }]
    },
    {
      label: "select",
      prop: "select",
      type: "select",
      dicUrl: "single"
    },
    {
      label: "cascader",
      prop: "cascader",
      type: "cascader",
      dicUrl: "tree"
    },
    {
      label: "datetime",
      prop: "datetime",
      type: "date"
    },
    {
      label: "checkbox",
      prop: "checkbox",
      type: "checkbox",
      dicUrl: "single"
    },
    {
      label: "radio",
      prop: "radio",
      type: "radio",
      dicUrl: "datetime"
    },
    {
      label: "switch",
      prop: "switch",
      type: "switch",
      dicUrl: "single"
    }
  ]
};

watch(
  () => form.value.radio,
  val => {
    defaults.value.datetime.type = val;
    defaults.value.datetime.label = val;
  }
);

function onSubmit(form: any, loading: () => void) {
  console.log("🚀 ~ file: index.vue ~ line 58 ~ onSubmit ~ form", form);
  loading();
}
</script>