<template>
  <uvue-form
    v-model="form"
    v-model:defaults="defaults"
    :permission="permission"
    :option="option"
    style="padding: 20rpx"
    @submit="onSubmit"
  >
    <template #slot="scoped">
      <view>{{ scoped }}</view>
    </template>
    <template #slot-right>
      <view>slot-right</view>
    </template>
  </uvue-form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

import { option } from "./option";

const form = ref<any>({ input: "", switch: "" });
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
