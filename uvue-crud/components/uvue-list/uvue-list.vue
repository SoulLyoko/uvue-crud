<template>
  <view class="uvue-list">
    <slot name="searchTop"></slot>

    <u-search
      placeholder="请输入关键字"
      :action-text="listOption.actionBtnText"
      :value="searchKey"
      :show-action="listOption.actionBtn"
      @search="$emit('search', $event)"
      @custom="actionBtnClick"
      @input="$emit('update:searchKey', $event)"
      v-show="listOption.search"
    ></u-search>

    <slot name="listTop"></slot>

    <u-cell-group :border="false" v-show="data.length">
      <u-cell-item
        v-for="(row, index) in data"
        :key="listOption.rowKey ? row[listOption.rowKey] : index"
        :arrow="false"
        :use-label-slot="false"
        @click="itemClick(row, index)"
      >
        <template slot="title">
          <slot name="title" :row="row" :index="index"></slot>
        </template>
        <template slot="label">
          <slot name="content" :row="row" :index="index"></slot>
        </template>
        <template slot="right-icon">
          <slot name="right" :row="row" :index="index"></slot>
        </template>
      </u-cell-item>
    </u-cell-group>

    <slot name="listBottom"></slot>

    <u-empty v-show="!data.length"></u-empty>

    <u-loadmore :status="status" @loadmore="$emit('loadmore', $event)" v-show="listOption.loadmore && data.length" />

    <u-back-top :scroll-top="scrollTop" v-show="scrollTop"></u-back-top>
  </view>
</template>

<script>
import { defaultOption } from "./option";

export default {
  name: "uvue-list",
  props: {
    option: { type: Object, default: () => ({}) },
    data: { type: Array, default: () => [] },
    searchKey: { type: String, default: "" },
    status: { type: String, default: "nomore" },
    scrollTop: { type: Number, default: 0 }
  },
  data() {
    return {
      listOption: {}
    };
  },
  watch: {
    option: {
      handler(val) {
        this.listOption = {
          ...defaultOption,
          ...val
        };
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    actionBtnClick() {
      this.$emit("action-click");
      this.rowAdd();
    },
    itemClick(row, index) {
      this.$emit("item-click", row, index);
      this.rowEdit(row);
    },
    rowAdd() {
      const { formPath, addForm } = this.listOption;
      if (formPath && addForm) return;
      uni.navigateTo({
        url: formPath + "?formType=add"
      });
    },
    rowEdit(row) {
      const { formPath, editForm } = this.listOption;
      if (formPath && editForm) {
        uni.navigateTo({
          url: `${formPath}?formType=edit&formData=${encodeURIComponent(JSON.stringify(row))}`
        });
      }
    }
  }
};
</script>
