<template>
  <u-row class="uvue-cascader">
    <u-col span="4" class="uvue-cascader-left">
      <scroll-view scroll-y :style="{ height: elHeight }">
        <view
          v-for="option in options"
          :key="option.value"
          class="uvue-cascader-tab"
          :class="currentTab == option.value ? 'active' : ''"
          @click="tabClick(option)"
        >
          <text class="uvue-cascader-tab__text">{{ option.label }}</text>
        </view>
      </scroll-view>
    </u-col>
    <u-col span="8" class="uvue-cascader-right">
      <scroll-view scroll-y :style="{ height: elHeight }">
        <view
          v-for="item in itemList"
          :key="item.value"
          class="uvue-cascader-item u-flex"
          :class="value == item.value ? 'active' : ''"
          @click="itemClick(item)"
        >
          <text class="uvue-cascader-item__text u-flex-11">{{ item.label }}</text>
          <u-icon
            v-if="value == item.value"
            class="uvue-cascader-item__icon u-flex-1"
            name="checkbox-mark"
            color="#2979FF"
            size="28"
          ></u-icon>
        </view>
      </scroll-view>
    </u-col>
  </u-row>
</template>

<script>
export default {
  name: "uvue-cascader",
  props: {
    value: { type: [String, Number] },
    height: { type: [String, Number] },
    options: { type: Array, default: () => [] }
  },
  data() {
    return {
      currentTab: ""
    };
  },
  computed: {
    itemList() {
      return this.options.find(option => option.value === this.currentTab)?.children ?? [];
    },
    elHeight() {
      if (this.height) {
        return this.$u.addUnit(this.height);
      } else {
        const length = this.options.length >= 3 ? this.options.length + 1 : 4;
        return this.$u.addUnit(length * 80);
      }
    }
  },
  created() {
    this.options.forEach(option => {
      if (option.children) {
        option.children.forEach(item => {
          if (item.value === this.value) {
            this.currentTab = option.value;
          }
        });
      } else if (option.value === this.value) {
        this.currentTab = option.value;
      }
    });
  },
  methods: {
    tabClick(option) {
      this.currentTab = option.value;
      if (!option.children) {
        this.itemClick(option);
      }
    },
    itemClick(item) {
      this.$emit("input", item.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.uvue-cascader {
  width: 100%;
  background: #fff;
  .uvue-cascader-left {
    background: #eee;
    padding: 0 !important;
    .uvue-cascader-tab {
      padding: 20rpx;
      &.active {
        color: #2979ff;
        background: #fff;
        border-left: 8rpx solid #2979ff;
      }
    }
  }
  .uvue-cascader-right {
    overflow-y: auto;
    .uvue-cascader-item {
      padding: 20rpx;
      &.active {
        color: #2979ff;
      }
    }
  }
}
</style>
