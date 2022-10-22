<template>
  <view class="uvue-list">
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
    <u-empty v-if="option.empty && !data.length" v-bind="option.empty">
      <template #default>
        <slot name="empty"></slot>
      </template>
    </u-empty>

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
        <!-- 小程序不支持动态slot,使用自定义list-item插槽 -->
        <!-- #ifndef MP -->
        <template v-for="(slotIndex, slotName) in $slots" #[slotName]="slotProps">
          <slot :name="slotName" :row="row" :index="index" v-bind="slotProps"></slot>
        </template>
        <!-- #endif -->
      </u-cell>
    </u-cell-group>
    <slot name="list-bottom"></slot>

    <slot name="loadmore-top"></slot>
    <u-loadmore v-if="option.loadmore" :status="status" v-bind="option.loadmore" @loadmore="onLoadmore" />
    <slot name="loadmore-bottom"></slot>

    <template v-if="$slots['back-top']">
      <u-back-top v-if="option.backTop" :scroll-top="scrollTop" v-bind="option.backTop">
        <template #default>
          <slot name="back-top"></slot>
        </template>
      </u-back-top>
    </template>
    <template v-else>
      <u-back-top v-if="option.backTop" :scroll-top="scrollTop" v-bind="option.backTop"></u-back-top>
    </template>
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
