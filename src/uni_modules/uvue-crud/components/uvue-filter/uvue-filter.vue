<template>
  <view>
    <uvue-dict ref="dict" v-model="dictStorage"></uvue-dict>
    <u-dropdown
      v-if="filterOption && filterOption.items && filterOption.items.length"
      v-bind="filterOption"
      ref="uDropdown"
      class="uvue-filter"
      :class="{ 'is-open': isOpen }"
      @open="dropdownOpen"
      @close="dropdownClose"
      @hook:mounted="dropdownMounted"
    >
      <u-dropdown-item
        v-for="filterItem in filterOption.items || []"
        :key="filterItem.prop"
        v-bind="filterItem"
        v-model="filterFormData[filterItem.prop]"
        :options="dictStorage[filterItem.prop]"
      >
        <template v-if="filterItem.multiple">
          <scroll-view scroll-y :style="{ height: $u.addUnit(filterItem.height) }">
            <view class="uvue-filter-multiple">
              <u-checkbox-group @change="checkboxChange">
                <u-checkbox
                  v-for="item in dictStorage[filterItem.prop]"
                  :key="item.value"
                  v-model="item.checked"
                  :name="item.value"
                >
                  {{ item.label }}
                </u-checkbox>
              </u-checkbox-group>
              <u-row gutter="20" style="margin-top: 20px">
                <u-col span="6">
                  <u-button type="primary" @click="confirmCheck(filterItem)">确定</u-button>
                </u-col>
                <u-col span="6">
                  <u-button @click="clearCheck(filterItem.options)">清空</u-button>
                </u-col>
              </u-row>
            </view>
          </scroll-view>
        </template>

        <template v-else-if="filterItem.cascader">
          <uvue-cascader
            v-model="filterFormData[filterItem.prop]"
            :options="dictStorage[filterItem.prop]"
            :height="filterItem.height"
            @input="cascaderChange"
          ></uvue-cascader>
        </template>
      </u-dropdown-item>
    </u-dropdown>
  </view>
</template>

<script>
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
      isOpen: false,
      dictStorage: {}
    };
  },
  computed: {
    filterOption() {
      return {
        ...(this.option || {}),
        items: this.option?.items?.map(item => {
          if (item.options || item.dictData) {
            this.$set(this.dictStorage, item.prop, []);
            setTimeout(() => {
              this.$refs.dict.handleDictData(item.prop, item.options || item.dictData, item.dictOption);
            });
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
      }, 100);
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
    background-color: #fff;
  }
}
</style>
