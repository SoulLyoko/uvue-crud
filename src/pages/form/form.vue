<template>
  <view style="padding: 20rpx">
    <uvue-form
      ref="uForm"
      v-model="formData"
      :option="formOption"
      :defaults.sync="defaults"
      :formType="formType"
      @submit="handleSubmit"
    ></uvue-form>
  </view>
</template>

<script>
import { formOption } from "./option";

export default {
  data() {
    return {
      formOption,
      defaults: {},
      formData: {},
      formType: ""
    };
  },
  onLoad(options) {
    this.formType = options.formType;
    if (options.formType !== "add") {
      const formData = options.formData ? JSON.parse(decodeURIComponent(options.formData)) : {};
      formData.discount = formData.discount?.join(",") ?? "";
      this.formData = formData;
    }
  },
  methods: {
    handleSubmit(form, loading) {
      loading?.();
    }
  }
};
</script>
