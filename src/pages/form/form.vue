<template>
  <view style="padding: 20rpx">
    <uvue-form v-model="formData" :option="formOption" :formType="formType" @submit="handleSubmit"></uvue-form>
  </view>
</template>

<script>
import { formOption } from "./option";

export default {
  data() {
    return {
      formOption,
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
    handleSubmit(form, done) {
      done();
    }
  }
};
</script>
