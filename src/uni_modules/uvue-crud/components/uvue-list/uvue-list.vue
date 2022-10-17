<template>
  <u-loading-page v-if="option.loadingPage && loading" :loading="loading" v-bind="option.loadingPage"></u-loading-page>
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

    <view v-if="$slots['list-item']">
      <slot
        v-for="(row, index) in data"
        :key="(option.rowKey && row[option.rowKey]) || index"
        name="list-item"
        :row="row"
        :index="index"
      ></slot>
    </view>

    <u-cell-group v-else v-bind="option.cellGroup">
      <u-cell
        v-for="(row, index) in data"
        :key="(option.rowKey && row[option.rowKey]) || index"
        v-bind="{ ...option.cell, ...(option.formatter?.(row) ?? row) }"
        @click="onItemClick(row, index)"
      >
        <template v-for="(slotIndex, slotName) in $slots" #[slotName]="slotProps">
          <slot :name="slotName" :row="row" :index="index"></slot>
        </template>
      </u-cell>
    </u-cell-group>

    <u-empty v-if="option.empty && !data.length" v-bind="option.empty">
      <template #default v-if="$slots['empty']">
        <slot name="empty"></slot>
      </template>
    </u-empty>

    <u-loadmore v-if="option.loadmore" :status="status" v-bind="option.loadmore" @loadmore="onLoadmore" />

    <slot name="list-bottom"></slot>

    <u-back-top v-if="option.backTop" :scroll-top="scrollTop" v-bind="option.backTop">
      <template #default v-if="$slots['back-top']">
        <slot name="back-top"></slot>
      </template>
    </u-back-top>
  </view>
</template>

<script setup lang="ts">
import { listProps, listEmits } from "./constants";
import { useOption, useSearch } from "./composables";

const props = defineProps(listProps);
const emit = defineEmits(listEmits);

const { option } = useOption(props);
const { searchValue, searchListeners } = useSearch(props, emit);

function onLoadmore() {
  emit("loadmore");
}
function onItemClick(row: any, index: number) {
  emit("item-click", row, index);
}
</script>
