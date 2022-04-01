<template>
  <view class="uvue-form-item__content">
    <slot v-if="$scopedSlots.default"></slot>

    <template v-else>
      <u-input v-bind="$attrs" @input="updateValue" v-if="inputTypes.includes($attrs.type)"></u-input>

      <template v-if="$attrs.type === 'select'">
        <!-- 作为select组件的label显示 -->
        <u-input
          v-bind="$attrs"
          type="select"
          :value="selectLabel"
          @click="!$attrs.disabled && (selectShow = true)"
        ></u-input>
        <u-select
          v-bind="$attrs"
          v-model="selectShow"
          :default-value="selectDefaultValue"
          :list="$attrs.dictData"
          @confirm="selectConfirm"
        ></u-select>
      </template>

      <template v-if="pickerTypes.includes($attrs.type)">
        <!-- 作为picker组件的value显示 -->
        <u-input
          v-bind="$attrs"
          type="select"
          :value="pickerLabel"
          @click="!$attrs.disabled && (pickerShow = true)"
        ></u-input>
        <u-picker
          v-bind="$attrs"
          v-model="pickerShow"
          mode="time"
          :params="pickerParams"
          :default-time="$attrs.value"
          @confirm="pickerConfirm"
        ></u-picker>
      </template>

      <u-checkbox-group v-bind="$attrs" v-if="$attrs.type === 'checkbox'">
        <u-checkbox
          v-for="dict in $attrs.dictData"
          :key="dict.value"
          v-bind="dict"
          :value="checkboxValue(dict)"
          :name="dict.value"
          @change="checkboxChange"
        >
          {{ dict.label }}
        </u-checkbox>
      </u-checkbox-group>

      <u-radio-group v-bind="$attrs" @change="updateValue" v-if="$attrs.type === 'radio'">
        <u-radio
          v-for="dict in $attrs.dictData"
          :key="dict.value"
          v-bind="dict"
          :value="$attrs.value"
          :name="dict.value"
        >
          {{ dict.label }}
        </u-radio>
      </u-radio-group>

      <u-rate v-bind="$attrs" v-if="$attrs.type === 'rate'"></u-rate>

      <u-switch v-bind="$attrs" v-model="switchValue" @change="updateValue" v-if="$attrs.type === 'switch'"></u-switch>

      <template v-if="$attrs.type === 'action'">
        <!-- 作为action组件的label显示 -->
        <u-input
          v-bind="$attrs"
          type="select"
          :value="actionLabel"
          @click="!$attrs.disabled && (actionShow = true)"
        ></u-input>
        <u-action-sheet
          v-bind="$attrs"
          v-model="actionShow"
          :list="$attrs.dictData"
          @click="actionClick"
        ></u-action-sheet>
      </template>
    </template>
  </view>
</template>

<script>
import { filterTreeNode, toString } from "../../utils";

export default {
  name: "uvue-form-item",
  data() {
    return {
      inputTypes: ["text", "password", "textarea", "number"], // 显示input组件的类型
      pickerTypes: ["date", "time", "datetime"], // 显示picker组件的类型
      selectShow: false, // select弹框的显隐
      pickerShow: false, // picker弹框的显隐
      actionShow: false, // 操作菜单的显隐
      switchValue: this.$attrs.activeValue === this.$attrs.value // 开关绑定的值
    };
  },
  computed: {
    // select组件的默认值
    selectDefaultValue() {
      const { dictData, value, mode, transform } = this.$attrs;
      if (mode === "mutil-column") {
        //多列
        const valueData = transform ? value.split(",") : value;
        const filterIndex = dictData
          .flat()
          .filter(item => valueData.includes(item.value))
          .map((item, index) => index);
        return filterIndex;
      } else if (mode === "mutil-column-auto") {
        //多列联动
        const valueData = transform ? value.split(",") : value;
        const filterIndex = filterTreeNode(dictData, (item, index) => {
          item.nodeIndex = index;
          return valueData.includes(item.value);
        }).map(item => item.nodeIndex);
        return filterIndex;
      } else {
        //单列
        const findIndex = dictData.findIndex(item => item.value === value);
        return [Math.max(0, findIndex)];
      }
    },
    // 已选择select的label
    selectLabel() {
      const { dictData, value, mode, transform } = this.$attrs;
      if (mode === "mutil-column") {
        //多列
        const valueData = transform ? value.split(",") : value;
        const filter = dictData.flat().filter(item => valueData.includes(item.value));
        return filter.map(item => item.label).join("-");
      } else if (mode === "mutil-column-auto") {
        //多列联动
        const valueData = transform ? value.split(",") : value;
        const filter = filterTreeNode(dictData, item => valueData.includes(item.value));
        return filter.map(item => item.label).join("-");
      } else {
        //单列
        const find = dictData.find(item => item.value === value) || {};
        return find.label || toString(value);
      }
    },
    // 已选择action的label
    actionLabel() {
      const { dictData, value } = this.$attrs;
      const find = dictData.find(dict => dict.value === value) || {};
      return find.label || toString(value);
    },
    pickerParams() {
      switch (this.$attrs.type) {
        case "date":
          return {
            year: true,
            month: true,
            day: true,
            timestamp: true
          };
        case "time":
          return {
            hour: true,
            minute: true,
            second: true,
            timestamp: true
          };
        case "datetime":
          return {
            year: true,
            month: true,
            day: true,
            hour: true,
            minute: true,
            second: true,
            timestamp: true
          };
        default:
          return undefined;
      }
    },
    pickerLabel() {
      const { value, format, type } = this.$attrs;
      const defaultFormat = {
        date: "yyyy-mm-dd",
        time: "hh:MM:ss",
        datetime: "yyyy-mm-dd hh:MM:ss"
      };
      return value ? this.$u.timeFormat(new Date(value), format || defaultFormat[type]) : toString(value);
    }
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    selectConfirm(selected) {
      const { mode, transform } = this.$attrs;
      let value = "";
      if (!mode || mode === "single-column") {
        //单列
        value = selected[0].value;
      } else {
        //多列和多列联动
        value = selected.map(item => item.value);
        value = transform ? value.join(",") : value;
      }
      this.updateValue(value);
    },
    pickerConfirm(value) {
      const { valueFormat, type } = this.$attrs;
      const defaultValueFormat = {
        date: "yyyy-mm-dd",
        time: "hh:MM:ss",
        datetime: "yyyy-mm-dd hh:MM:ss"
      };
      const result = this.$u.timeFormat(value.timestamp, valueFormat || defaultValueFormat[type]);
      this.updateValue(result);
    },
    checkboxChange({ value: check, name }) {
      const { value, transform } = this.$attrs;
      const valueData = transform ? value.split(",") : value;
      let result = [];
      if (check) {
        result = [...valueData, name];
      } else {
        result = valueData.filter(e => e !== name);
      }
      result = transform ? result.join(",") : result;
      this.updateValue(result);
    },
    checkboxValue(dictItem) {
      const { value, transform } = this.$attrs;
      const valueData = transform ? value.split(",") : value;
      return valueData.includes(dictItem.value);
    },
    actionClick(index) {
      const value = this.$attrs.dictData[index].value;
      this.updateValue(value);
    }
  }
};
</script>

<style scoped>
.uvue-form-item__content {
  width: 100%;
  margin-left: 20rpx;
}
</style>
