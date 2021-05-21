<template>
  <view class="uvue-list">
    <slot name="searchTop"></slot>

    <u-sticky offset-top="0" :enable="!!listOption.sticky">
      <u-search
        class="uvue-search"
        :action-text="listOption.actionBtnText"
        :show-action="listOption.actionBtn"
        v-bind="search"
        :value="searchValue"
        @search="$emit('search', $event)"
        @custom="actionBtnClick"
        @input="$emit('update:searchValue', $event)"
        v-show="search"
      ></u-search>

      <slot name="filterTop"></slot>

      <uvue-filter ref="uvueFilter" :filter="filter" :filterForm.sync="filterFormData"> </uvue-filter>
    </u-sticky>

    <slot name="listTop"></slot>

    <scroll-view scroll-y>
      <u-card
        class="uvue-list-card"
        v-bind="{ ...listOption, ...row }"
        @click="cardClick('item', row, index)"
        @head-click="cardClick('head', row, index)"
        @body-click="cardClick('body', row, index)"
        @foot-click="cardClick('foot', row, index)"
        v-for="(row, index) in data"
        :key="listOption.rowKey ? row[listOption.rowKey] : index"
      >
        <template #body>
          <slot name="body" :row="row" :index="index"></slot>
        </template>
        <template #head>
          <slot name="head" :row="row" :index="index"></slot>
        </template>
        <template #foot>
          <slot name="foot" :row="row" :index="index"></slot>
        </template>
      </u-card>
    </scroll-view>

    <u-empty v-show="!data.length"></u-empty>

    <u-loadmore
      :status="status"
      v-bind="loadmore"
      @loadmore="$emit('loadmore', $event)"
      v-show="loadmore && data.length"
    />

    <slot name="listBottom"></slot>

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
    searchValue: { type: String, default: "" },
    filterForm: { type: Object, default: () => ({}) },
    search: { type: [Object, Boolean], default: () => ({}) },
    filter: { type: [Object, Boolean], default: () => ({ items: [] }) },
    loadmore: { type: [Object, Boolean], default: () => ({}) },
    status: { type: String, default: "nomore" },
    scrollTop: { type: Number, default: 0 }
  },
  data() {
    return {
      listOption: {},
      filterFormData: {}
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
    },
    filterFormData: {
      handler(val) {
        this.$emit("update:filterForm", val);
        this.$emit("filter-change", val);
      },
      deep: true
    }
  },
  methods: {
    rowAdd() {
      const { formPath } = this.listOption;
      formPath &&
        uni.navigateTo({
          url: formPath + "?formType=add"
        });
    },
    rowEdit(row) {
      const { formPath, formKeys } = this.listOption;
      let formData = {};
      if (formKeys && formKeys.length) {
        formKeys.forEach(key => (formData[key] = row[key]));
      } else {
        formData = row;
      }
      formPath &&
        uni.navigateTo({
          url: `${formPath}?formType=edit&formData=${encodeURIComponent(JSON.stringify(formData))}`
        });
    },
    actionBtnClick() {
      this.$emit("action-click");
      this.rowAdd();
    },
    closeFilter() {
      this.$refs.uvueFilter.closeFilter();
    },
    cardClick(type, row, index) {
      this.$emit(`${type}-click`, row, index);
      type === "item" && this.rowEdit(row);
    }
  }
};
</script>

<style lang="scss" scoped>
.uvue-search,
.uvue-filter {
  background: #fff;
}
</style>
