<template>
  <u-loading-page v-if="option.loading && loading" v-bind="option.loading" :loading="loading"></u-loading-page>
  <view v-else class="uvue-list">
    <u-sticky customNavHeight="0" v-bind="option.sticky">
      <slot name="search-top"></slot>
      <u-search
        v-if="option.search"
        v-model="searchValue"
        placeholder="输入关键字搜索"
        v-bind="{ ...searchListeners, ...option.search }"
      ></u-search>
      <slot name="search-bottom"></slot>
    </u-sticky>

    <slot name="list-top"></slot>

    <template v-for="(row, index) in data" :key="(option.rowKey && row[option.rowKey]) || index">
      <slot name="list-item" :row="row" :index="index"></slot>
    </template>

    <u-empty v-if="option.empty && !data.length" v-bind="option.empty">
      <template #default v-if="$slots['empty']">
        <slot name="empty"></slot>
      </template>
    </u-empty>

    <u-loadmore v-if="option.loadmore" :status="status" v-bind="option.loadmore" @loadmore="onLoadmore" />

    <slot name="list-bottom"></slot>
    <u-back-top v-if="option.backtop" :scroll-top="scrollTop" v-bind="option.backtop">
      <template #default v-if="$slots['back-top']">
        <slot name="back-top"></slot>
      </template>
    </u-back-top>
  </view>
</template>

<script setup lang="ts">
import componentProps from "./props";
import { useOption, useSearch } from "./composables";

const props = defineProps(componentProps);
const emit = defineEmits(["update:search", "loadmore"]);

const { option } = useOption(props);
const { searchValue, searchListeners } = useSearch(props, emit);

function onLoadmore() {
  emit("loadmore");
}
</script>