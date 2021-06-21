<template>
  <u-dropdown
    v-bind="filterOption"
    class="uvue-filter"
    :class="{ 'is-open': isOpen }"
    ref="uDropdown"
    v-show="filterOption && filterOption.items && filterOption.items.length"
    @open="dropdownOpen"
    @close="dropdownClose"
    @hook:mounted="dropdownMounted"
  >
    <u-dropdown-item
      v-for="filterItem in filterOption.items || []"
      :key="filterItem.prop"
      v-bind="filterItem"
      v-model="filterFormData[filterItem.prop]"
      :options="filterDict.dictStorage[filterItem.prop]"
    >
      <template v-if="filterItem.multiple">
        <view class="uvue-filter-multiple">
          <u-checkbox-group @change="checkboxChange">
            <u-checkbox
              v-for="option in filterDict.dictStorage[filterItem.prop]"
              :key="option.value"
              v-model="option.checked"
              :name="option.value"
            >
              {{ option.label }}
            </u-checkbox>
          </u-checkbox-group>
          <u-row gutter="20" style="margin-top: 30rpx">
            <u-col span="6" style="text-align: center">
              <u-button type="primary" @click="confirmCheck(filterItem)">确定</u-button>
            </u-col>
            <u-col span="6" style="text-align: center">
              <u-button @click="clearCheck(filterItem.options)">清空</u-button>
            </u-col>
          </u-row>
        </view>
      </template>

      <template v-else-if="filterItem.cascader">
        <uvue-cascader
          v-model="filterFormData[filterItem.prop]"
          :options="filterDict.dictStorage[filterItem.prop]"
          @input="cascaderChange"
        ></uvue-cascader>
      </template>
    </u-dropdown-item>
  </u-dropdown>
</template>

<script>
import useDict from "../uvue-dict/index.js";

export default {
  name: "uvue-filter",
  props: {
    option: { type: Object, default: () => ({}) },
    filterForm: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      filterFormData: {},
      checked: [],
      isOpen: false
    };
  },
  computed: {
    filterDict() {
      return useDict(this);
    },
    filterOption() {
      return {
        ...(this.option || {}),
        items: this.option?.items?.map(item => {
          if (item.options || item.dictData) {
            this.filterDict.handleDictData(item.prop, item.options || item.dictData, item.dictOption);
          }
          return item;
        })
      };
    }
  },
  watch: {
    filterFormData: {
      handler(val) {
        this.$emit("update:filterForm", val);
        this.$emit("filter-change", val);
      },
      deep: true
    }
  },
  methods: {
    closeFilter() {
      this.$refs.uDropdown.close();
    },
    cascaderChange() {
      this.closeFilter();
    },
    confirmCheck({ prop, transform }) {
      const value = transform ? this.checked.join(",") : this.checked;
      this.$set(this.filterFormData, prop, value);
      this.closeFilter();
    },
    clearCheck(options) {
      this.checked = [];
      options.forEach(e => {
        this.$set(e, "checked", false);
      });
    },
    checkboxChange(e) {
      this.checked = e;
    },
    /**
     * 解决dropdown组件放在sticky组件下会遮挡其他元素的问题
     */
    dropdownMounted() {
      setTimeout(() => {
        this.$refs.uDropdown.contentHeight = 0;
      });
    },
    dropdownOpen() {
      this.$refs.uDropdown.getContentHeight();
    },
    dropdownClose() {
      this.$refs.uDropdown.contentHeight = 0;
    }
  }
};
</script>

<style lang="scss">
.uvue-filter {
  .uvue-filter-multiple {
    padding: 30rpx;
    background: #fff;
  }
}
</style>
