<template>
  <view style="padding: 20rpx">
    <view>{{ formConsole }}</view>
    <uvue-form
      ref="formRef"
      v-model="formData"
      v-model:defaults="defaults"
      :option="option"
      :permission="permission"
      @submit="onSubmit"
    >
      <template #slot>
        <view>slot</view>
      </template>
      <template #slot-right>
        <view>slot-right</view>
      </template>
      <template #column3>
        <view>dynamicSlot</view>
      </template>
      <template #column3-right>
        <view>dynamicSlotRight</view>
      </template>
    </uvue-form>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

import { formOption } from "./option";

const option = ref(formOption);

const formData = ref<any>({});
const defaults = ref<any>({});

const formConsole = computed(() => {
  return JSON.stringify(formData.value);
});

const permission = computed(() => ({
  tabs: formData.value.isTabs
}));

watch(
  () => formData.value.radio,
  val => {
    defaults.value.datetime.type = val;
    defaults.value.datetime.label = val;
    defaults.value.input.display = false;
  }
);
watch(
  () => formData.value.switch,
  val => {
    defaults.value.input.display = val !== "2";
  }
);

function onSubmit(form: any, loading: () => void) {
  console.log("🚀 ~ file: index.vue ~ line 58 ~ onSubmit ~ form", form);
  loading();
  uni.showToast({
    title: JSON.stringify(form),
    icon: "none",
    duration: 2000
  });
}
</script>

<style lang="scss" scoped></style>
