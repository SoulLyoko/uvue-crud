<template>
  <view>
    <uvue-form v-model="data" :option="option" @submit="handleSubmit"></uvue-form>
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
      data: {}
    };
  },
  onLoad(options) {
    if (options.formType === "edit") {
      this.data = options.formData ? JSON.parse(decodeURIComponent(options.formData)) : {};
    }
  },
  methods: {
    handleSubmit(form, done) {
      done();
    }
  }
};
</script>

<style></style>
