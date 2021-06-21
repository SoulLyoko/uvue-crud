<template>
  <view class="uvue-list">
    <u-sticky offset-top="0" :enable="!!listOption.sticky && stickySafe">
      <slot name="searchTop"></slot>

      <u-search
        class="uvue-search"
        v-bind="search"
        :value="searchValue"
        @search="$emit('search', $event)"
        @custom="actionClick"
        @input="$emit('update:searchValue', $event)"
        v-show="search"
      ></u-search>

      <slot name="filterTop"></slot>

      <uvue-filter ref="uvueFilter" :option="filter" :filterForm.sync="filterFormData"> </uvue-filter>
    </u-sticky>

    <slot name="listTop"></slot>

    <scroll-view scroll-y>
      <u-card
        v-for="(row, index) in data"
        :key="listOption.rowKey ? row[listOption.rowKey] : index"
        class="uvue-list-card"
        v-bind="{ ...listOption, ...row }"
        @click="cardClick('item', row, index)"
        @head-click="cardClick('head', row, index)"
        @body-click="cardClick('body', row, index)"
        @foot-click="cardClick('foot', row, index)"
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
    filter: { type: [Object, Boolean], default: () => ({}) },
    loadmore: { type: [Object, Boolean], default: () => ({}) },
    status: { type: String, default: "nomore" },
    scrollTop: { type: Number, default: 0 }
  },
  data() {
    return {
      listOption: {},
      filterFormData: {},
      stickySafe: true
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
      this.navigateToForm({}, "add");
    },
    rowEdit(row) {
      this.navigateToForm(row, "edit");
    },
    rowView(row) {
      this.navigateToForm(row, "view");
    },
    navigateToForm(row, formType) {
      this.stickySafe = false;
      const { formPath, formKeys } = this.listOption;
      if (formType === "add") {
        formPath &&
          uni.navigateTo({
            url: formPath + "?formType=add"
          });
      } else {
        let formData = {};
        if (Array.isArray(formKeys) && formKeys.length) {
          formKeys.forEach(key => (formData[key] = row[key]));
        } else {
          formData = row;
        }
        formPath &&
          uni.navigateTo({
            url: `${formPath}?formType=${formType}&formData=${encodeURIComponent(JSON.stringify(formData))}`
          });
      }
    },
    actionClick() {
      this.$emit("action-click");
    },
    closeFilter() {
      this.$refs.uvueFilter.closeFilter();
    },
    cardClick(type, row, index) {
      this.$emit(`${type}-click`, row, index);
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
