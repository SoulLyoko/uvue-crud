<template>
  <u-loading-page v-if="option.loadingPage && loading" v-bind="option.loadingPage" :loading="loading"></u-loading-page>
  <u-list v-else class="uvue-list" v-bind="{ ...$attrs, ...option }">
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

    <u-list-item v-for="(row, index) in data" :key="(option.rowKey && row[option.rowKey]) || index">
      <slot name="list-item" :row="row" :index="index"></slot>
    </u-list-item>

    <u-empty v-if="option.empty && !data.length" v-bind="option.empty">
      <template v-if="$slots['empty']" #default>
        <slot name="empty"></slot>
      </template>
    </u-empty>

    <u-loadmore v-if="option.loadmore" :status="status" v-bind="option.loadmore" @loadmore="onLoadmore" />

    <slot name="list-bottom"></slot>
  </u-list>
</template>

<script setup lang="ts">
import { listProps, listEmits } from "../uvue-list/constants";
import { useOption, useSearch } from "../uvue-list/composables";

const props = defineProps(listProps);
const emit = defineEmits(listEmits);

const { option } = useOption(props);
const { searchValue, searchListeners } = useSearch(props, emit);

function onLoadmore() {
  emit("loadmore");
}
</script>
