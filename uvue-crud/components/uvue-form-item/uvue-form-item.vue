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
        <u-input v-bind="$attrs" type="select" @click="!$attrs.disabled && (pickerShow = true)"></u-input>
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
          :value="$attrs.value.includes(dict.value)"
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
      const { dictData, value } = this.$attrs;
      const findIndex = dictData.findIndex(dict => dict.value === value);
      return [findIndex];
    },
    // 已选择select的label
    selectLabel() {
      const { dictData, value } = this.$attrs;
      const find = dictData.find(dict => dict.value === value) || {};
      return find.label || "";
    },
    // 已选择action的label
    actionLabel() {
      const { dictData, value } = this.$attrs;
      const find = dictData.find(dict => dict.value === value) || {};
      return find.label || "";
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
    }
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    selectConfirm(value) {
      this.updateValue(value[0].value);
    },
    pickerConfirm(value) {
      const { format, type } = this.$attrs;
      const defaultFormat = {
        date: "yyyy-mm-dd",
        time: "hh:MM:ss",
        datetime: "yyyy-mm-dd hh:MM:ss"
      };
      const result = this.$u.timeFormat(value.timestamp, format || defaultFormat[type]);
      this.updateValue(result);
    },
    checkboxChange({ value, name }) {
      let result = [];
      if (value) {
        result = [...this.$attrs.value, name];
      } else {
        result = this.$attrs.value.filter(e => e !== name);
      }
      this.updateValue(result);
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
