<template>
  <view class="uvue-form">
    <u-form v-bind="formOption" ref="uForm" :model="value" :rules="rules">
      <u-form-item v-for="(item, index) in formOption.column" :key="item.prop || index" v-bind="item">
        <!-- 兼容app -->
        <slot
          name="formItem"
          :row="value"
          :column="item"
          :index="index"
          :label="item.label"
          :prop="item.prop"
          :dictData="formDict.dictStorage[item.prop]"
          v-if="$scopedSlots.formItem"
        ></slot>

        <!-- 自定义的表单项 -->
        <slot
          :name="item.prop"
          :row="value"
          :column="item"
          :index="index"
          :label="item.label"
          :prop="item.prop"
          :dictData="formDict.dictStorage[item.prop]"
          v-else-if="$scopedSlots[item.prop]"
        ></slot>

        <!-- 默认的表单项 -->
        <uvue-form-item
          v-bind="item"
          :value="getFormItemValue(item)"
          :dictData="formDict.dictStorage[item.prop]"
          @input="updateProp(item.prop, $event)"
          v-else
        ></uvue-form-item>

        <!-- 表单项的右插槽，app暂不能使用 -->
        <template slot="right">
          <slot
            :name="item.prop + 'Right'"
            :row="value"
            :column="item"
            :index="index"
            :label="item.label"
            :prop="item.prop"
            :dictData="formDict.dictStorage[item.prop]"
          ></slot>
        </template>
      </u-form-item>
    </u-form>

    <u-button
      class="uvue-form-submit"
      type="primary"
      @click="formSubmit"
      :loading="submitLoading"
      v-if="formOption.submitBtn && formType !== 'view'"
      :style="{ width: formOption.submitBtnWidth }"
    >
      {{ formOption.submitBtnText }}
    </u-button>
  </view>
</template>

<script>
import { defaultFormOption, defaultColumnOption } from "./option";
import useDict from "../uvue-dict/index.js";

export default {
  name: "uvue-form",
  props: {
    value: { type: Object, default: () => ({}) },
    option: { type: Object, default: () => ({}) },
    formType: { type: String, default: "add" }
  },
  data() {
    return {
      rules: {},
      submitLoading: false
    };
  },
  computed: {
    formDict() {
      return useDict(this);
    },
    formOption() {
      const result = {
        ...defaultFormOption,
        ...(this.option || {}),
        column: this.option?.column
          ?.map(col => {
            // 处理rules
            if (col.rules) {
              this.rules[col.prop] = col.rules;
            }
            //处理dictData
            if (col.dictData) {
              this.formDict.handleDictData(col.prop, col.dictData, col.dictOption);
            }
            const operation = ["select", "action", "date", "time", "datetime"].includes(col.type) ? "选择" : "输入";
            const disabledFlags = [!!col.disabled];
            this.formType === "add" && disabledFlags.push(!!col.addDisabled);
            this.formType === "edit" && disabledFlags.push(!!col.editDisabled);
            this.formType === "view" && disabledFlags.push(true);
            return {
              ...defaultColumnOption,
              placeholder: `请${operation} ${col.label}`,
              disabled: disabledFlags.some(bool => bool),
              ...col
            };
          })
          //过滤掉需要隐藏的项
          ?.filter(col => {
            const displayFlags = [!!col.display];
            this.formType === "add" && displayFlags.push(!!col.addDisplay);
            this.formType === "edit" && displayFlags.push(!!col.editDisplay);
            this.formType === "view" && displayFlags.push(!!col.viewDisplay);
            return displayFlags.every(bool => bool);
          })
      };
      this.setRules(this.rules);
      console.log(result);
      return result;
    }
  },
  mounted() {
    this.setRules(this.rules);
  },
  methods: {
    setRules(rules) {
      this.$refs.uForm?.setRules(rules);
    },
    resetFields() {
      this.$refs.uForm?.resetFields();
    },
    validate(cb) {
      this.$refs.uForm?.validate(cb);
    },
    updateProp(prop, value) {
      const formData = {
        ...this.value,
        [prop]: value
      };
      this.$emit("input", formData);
    },
    formSubmit() {
      this.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          this.$emit("submit", this.value, () => {
            this.submitLoading = false;
            this.formOption.submitBack && uni.navigateBack();
          });
        }
      });
    },
    getFormItemValue(item) {
      return this.value[item.prop] ?? item.value ?? "";
    }
  }
};
</script>
