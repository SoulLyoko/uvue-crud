<template>
  <uvue-list
    v-model:searchValue="searchValue"
    :data="data"
    :option="listOption"
    :loading="loading"
    :status="status"
    :scrollTop="scrollTop"
    @loadmore="loadData(true)"
    @search-custom="onSearch"
  ></uvue-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onPullDownRefresh, onPageScroll, onReachBottom } from "@dcloudio/uni-app";

import { listOption } from "./option";

const data = ref<any[]>([]);
const status = ref("loadmore");
const loading = ref(false);
const searchValue = ref("");

const loadData = (isLoadmore = false, isFirst = false) => {
  if (isLoadmore && status.value === "nomore") return;
  const total = 20;
  status.value = "loading";
  if (isFirst) loading.value = true;
  setTimeout(() => {
    if (!isLoadmore) data.value = [];
    data.value.push(
      ...Array.from({ length: 10 }).map((e, i) => {
        const id = i + data.value.length;
        return { id, userName: "admin" + id, nickName: "管理员" + id, deptName: "研发部" };
      })
    );
    status.value = data.value.length === total ? "nomore" : "loadmore";
    uni.stopPullDownRefresh();
    loading.value = false;
  }, 1000);
};
loadData(false, true);

const scrollTop = ref(0);
onPageScroll(e => {
  scrollTop.value = e.scrollTop;
});
onPullDownRefresh(loadData);
onReachBottom(() => loadData(true));

function onSearch() {
  loadData(false, true);
}
</script>
