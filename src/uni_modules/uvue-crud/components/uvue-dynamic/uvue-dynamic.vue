<template>
  <view class="uvue-dynamic" style="width: 100%">
    <template v-for="(dataItem, dataIndex) in vModel" :key="dataItem[prop] || dataIndex">
      <u-row>
        <u-col span="10">
          <u-text :text="`${label}${dataIndex}`" type="info"></u-text>
        </u-col>
        <u-col span="2">
          <u-text v-if="children.delBtn" text="删除" type="primary" @click="delItem(dataIndex)"></u-text>
        </u-col>
      </u-row>

      <slot name="default" :dataIndex="dataIndex"></slot>

      <!-- <template v-for="(columnItem, columnIndex) in children.column" :key="columnItem.prop || columnIndex">
      <slot :name="columnItem.prop"></slot>
    </template> -->

      <u-line margin="20rpx 0"></u-line>
    </template>

    <u-text
      v-if="children.addBtn"
      :text="`增加${label}`"
      type="primary"
      prefixIcon="plus"
      align="center"
      @click="addItem"
    ></u-text>
  </view>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { UvueFormColumn } from "../uvue-form";

import { ref, watch, computed } from "vue";

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  children: { type: Object as PropType<Required<UvueFormColumn>["children"]>, default: () => ({}) },
  label: { type: String },
  prop: { type: String }
});
const emit = defineEmits(["update:modelValue", "add", "del"]);

const vModel = ref<any[]>([]);
watch(
  () => props.modelValue,
  val => {
    if (Array.isArray(val)) vModel.value = val;
    else vModel.value = [];
  },
  { immediate: true, deep: true }
);
watch(vModel, val => emit("update:modelValue", val), { deep: true });

const defaultValues = computed(() => {
  const values: any = {};
  props.children.column?.forEach(e => {
    if ("value" in e) {
      values[e.prop!] = e.value;
    }
  });
  return values;
});

function addItem() {
  const done = (row: any) => {
    vModel.value.push(row);
    emit("add", row);
  };
  if (props.children?.limit && vModel.value.length === props.children.limit) {
    return uni.showToast({ title: `最多添加${props.children.limit}条`, icon: "none" });
  }
  if (typeof props.children?.rowAdd === "function") {
    props.children.rowAdd(done);
  } else {
    done(defaultValues.value);
  }
}
function delItem(index: number) {
  const row = vModel.value.find((e, i) => i === index);
  const done = () => {
    vModel.value = vModel.value.filter((e, i) => i !== index);
    emit("del", row, index);
  };
  if (typeof props.children?.rowDel === "function") {
    props.children.rowDel(row, done);
  } else {
    done();
  }
}
</script>
