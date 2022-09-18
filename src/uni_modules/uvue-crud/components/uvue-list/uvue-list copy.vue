<template>
  <view class="uvue-list">
    <u-sticky
      v-bind="typeof listOption.sticky === 'object' ? listOption.sticky : {}"
      :enable="listOption.sticky.enable && stickySafe"
    >
      <view class="uvue-list-sticky__wrapper">
        <slot name="searchTop"></slot>

        <u-search
          class="uvue-search"
          v-bind="search"
          :value="searchValue"
          @search="$emit('search', $event)"
          @custom="actionClick"
          @input="$emit('update:searchValue', $event)"
          v-if="search"
        ></u-search>

        <slot name="filterTop"></slot>

        <uvue-filter ref="uvueFilter" :option="filter" :filterForm.sync="filterFormData" v-if="filter"></uvue-filter>
      </view>
    </u-sticky>

    <slot name="listTop"></slot>

    <view class="uvue-list__wrapper">
      <u-card
        v-for="(row, index) in data"
        :key="(listOption.rowKey && row[listOption.rowKey]) || index"
        class="uvue-list-card"
        v-bind="{ ...listOption, ...row }"
        @click="cardClick('item', row, index)"
        @head-click="cardClick('head', row, index)"
        @body-click="cardClick('body', row, index)"
        @foot-click="cardClick('foot', row, index)"
      >
        <template slot="head">
          <slot name="head" :row="row" :index="index"></slot>
        </template>
        <template slot="body">
          <slot name="body" :row="row" :index="index"></slot>
        </template>
        <template slot="foot">
          <slot name="foot" :row="row" :index="index"></slot>
        </template>
      </u-card>
    </view>

    <u-empty v-if="!data.length && status !== 'loading'"></u-empty>

    <u-loadmore :status="status" v-bind="loadmore" @loadmore="$emit('loadmore', $event)" v-if="loadmore && status" />

    <slot name="listBottom"></slot>

    <u-back-top :scroll-top="scrollTop" v-if="scrollTop"></u-back-top>
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
    status: { type: String, default: "loadmore" },
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
    rowAdd(row) {
      this.navigateToForm(row || {}, "add");
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
      let formData = {};
      if (formKeys?.length) {
        formKeys.forEach(key => (formData[key] = row[key]));
      } else {
        formData = row;
      }
      formPath &&
        uni.navigateTo({
          url: `${formPath}?formType=${formType}&formData=${encodeURIComponent(JSON.stringify(formData))}`
        });
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

<style lang="scss">
.uvue-list {
  .uvue-list-sticky__wrapper {
    background-color: #fff;
  }
}
</style>
