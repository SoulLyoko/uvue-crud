<template>
  <view>
    <uvue-list
      ref="list"
      :option="option"
      :data="listData"
      :status="loadStatus"
      :searchValue.sync="filterForm.title"
      @search="handleSearch"
      :filter="filter"
      :filterForm.sync="filterForm"
      @filter-change="filterChange"
    >
      <template #head="{ row }">
        <text>{{ row.title }}</text>
      </template>
      <template #body="{ row }">
        <u-row gutter="20" align="top">
          <u-col span="4">
            <img :src="row.img" width="100%" />
          </u-col>
          <u-col span="6">
            <view>
              <u-icon name="star-fill"></u-icon><text>{{ row.score }}</text>
              <text class="u-margin-left-20">月售{{ row.sales }}</text>
            </view>
            <view>
              <text>起送￥{{ row.send }}</text>
              <text class="u-margin-left-20">配送￥{{ row.fee }}</text>
            </view>
            <view>
              <text>{{ row.speed }}分钟</text>
              <text class="u-margin-left-20">{{ row.distance }}m</text>
            </view>
            <view>
              <u-tag
                class="u-margin-right-20"
                :text="tag"
                type="warning"
                size="mini"
                v-for="tag in row.tags"
                :key="tag"
              />
            </view>
          </u-col>
          <u-col span="2">
            <u-button size="mini" @click="$refs.list.rowView(row)">查看</u-button>
            <u-button type="primary" size="mini" @click="$refs.list.rowEdit(row)">编辑</u-button>
          </u-col>
        </u-row>
      </template>
      <template #foot="{ row }">
        <view>
          <u-tag
            class="u-margin-right-20"
            :text="disc"
            type="error"
            size="mini"
            v-for="disc in row.discount"
            :key="disc"
          />
        </view>
      </template>
    </uvue-list>
  </view>
</template>

<script>
import { option, filter, listData } from "./option";

export default {
  data() {
    return {
      option,
      filter,
      listData: [],
      filterForm: {},
      loadStatus: "loadmore"
    };
  },
  mounted() {
    this.filterChange({});
  },
  methods: {
    /**
     * 这里模拟后端数据处理，一般来讲携带参数请求后端接口就可以了
     */
    filterChange(e) {
      this.loadStatus = "loading";
      setTimeout(() => {
        this.listData = listData
          .filter(item => {
            const condition = [];
            e.title && condition.push(item.title.includes(e.title));
            e.speed && condition.push(item.speed <= e.speed);
            e.tags && e.tags.length && condition.push(e.tags.every(t => item.tags.includes(t)));
            e.category && condition.push(item.category === e.category);
            return condition.every(bool => bool);
          })
          .sort((a, b) => {
            if (!e.sort) return 0;
            if (["speed", "distance"].includes(e.sort)) {
              return a[e.sort] - b[e.sort];
            }
            return b[e.sort] - a[e.sort];
          });
        this.loadStatus = "nomore";
      }, 1000);
    },
    handleSearch() {
      this.filterChange(this.filterForm);
    }
  }
};
</script>
