<template>
  <view>
    <uvue-form v-model="formData" :option="option" @submit="handleSubmit"></uvue-form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      option: {
        column: [
          {
            label: "标题",
            prop: "title"
          },
          {
            label: "内容",
            prop: "content"
          }
        ]
      },
      formData: {}
    };
  },
  onLoad(options) {
    if (options.formType === "edit") {
      this.formData = options.formData ? JSON.parse(decodeURIComponent(options.formData)) : {};
    }
  },
  methods: {
    handleSubmit(form, done) {
      done();
    }
  }
};
</script>
