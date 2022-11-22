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
        <template #[getSlotName(slotNames.title)]>
          <slot name="title" :row="row" :index="index"></slot>
        </template>
        <template #[getSlotName(slotNames.label)]>
          <slot name="label" :row="row" :index="index"></slot>
        </template>
        <template #[getSlotName(slotNames.value)]>
          <slot name="value" :row="row" :index="index"></slot>
        </template>
        <template #[getSlotName(slotNames.icon)]>
          <slot name="icon" :row="row" :index="index"></slot>
        </template>
        <template #[getSlotName(slotNames.rightIcon)]>
          <slot name="right-icon" :row="row" :index="index"></slot>
        </template>
      </u-cell>
    </u-cell-group>
    <slot name="list-bottom"></slot>

    <slot name="loadmore-top"></slot>
    <u-loadmore v-if="option.loadmore" :status="status" v-bind="option.loadmore" @loadmore="onLoadmore" />
    <slot name="loadmore-bottom"></slot>

    <u-back-top v-if="option.backTop" :scroll-top="scrollTop" v-bind="option.backTop">
      <template #[getSlotName(slotNames.backTop)]>
        <slot name="back-top"></slot>
      </template>
    </u-back-top>
  </view>
</template>

<script setup lang="ts">
import { useSlots } from "vue";

import { listProps, listEmits } from "./constants";
import { useOption, useSearch } from "./composables";

const props = defineProps(listProps);
const emit = defineEmits(listEmits);
const slots = useSlots();
const slotNames = {
  title: "title",
  label: "label",
  value: "value",
  icon: "icon",
  rightIcon: "right-icon",
  backTop: "back-top"
};

const { option } = useOption(props);
const { searchValue, searchListeners } = useSearch(props, emit);

function onLoadmore() {
  emit("loadmore");
}
function onItemClick(row: any, index: number) {
  emit("item-click", row, index);
}
function getSlotName(name: string) {
  return slots[name] ? name : "";
}
</script>

<style lang="scss" scoped>
.uvue-list {
  padding: 20rpx;
}
</style>
