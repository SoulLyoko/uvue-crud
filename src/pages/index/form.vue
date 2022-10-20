<template>
  <view style="padding: 20rpx">
    <uvue-form v-model="form" :option="formOption" :permission="permission" @submit="onSubmit">
      <template #slot="scoped">
        <view>{{ scoped }}</view>
      </template>
      <template #slot-right>
        <view>slot-right</view>
      </template>
      <template #column2>
        <view>dynamicSlot</view>
      </template>
    </uvue-form>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

import { formOption } from "./option";

const form = ref<any>({ isTabs: "2", input: "", switch: "" });
const defaults = ref<any>({});

const permission = computed(() => ({
  tabs: form.value.isTabs === "2"
}));

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

<style lang="scss" scoped></style>
