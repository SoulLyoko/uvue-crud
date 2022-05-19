<template>
  <view class="uvue-form">
    <uvue-dict ref="dict" v-model="dictStorage"></uvue-dict>
    <u-form v-bind="formOption" ref="uForm" :model="value" :rules="rules">
      <template v-for="(item, index) in formOption.column">
        <u-form-item :key="item.prop || index" v-bind="objectOption[item.prop]" v-if="objectOption[item.prop].display">
          <!-- 兼容app -->
          <slot
            name="formItem"
            :row="value"
            :column="objectOption[item.prop]"
            :index="index"
            :label="objectOption[item.prop].label"
            :prop="item.prop"
            :dictData="dictStorage[item.prop]"
            v-if="$scopedSlots.formItem"
          ></slot>

          <!-- 自定义的表单项 -->
          <slot
            :name="item.prop"
            :row="value"
            :column="objectOption[item.prop]"
            :index="index"
            :label="objectOption[item.prop].label"
            :prop="item.prop"
            :dictData="dictStorage[item.prop]"
            v-else-if="$scopedSlots[item.prop]"
          ></slot>

          <!-- 默认的表单项 -->
          <uvue-form-item
            v-bind="objectOption[item.prop]"
            :value="getFormItemValue(objectOption[item.prop])"
            :dictData="dictStorage[item.prop]"
            @input="updateProp(item.prop, $event)"
            v-else
          ></uvue-form-item>

          <!-- 表单项的右插槽，app暂不能使用 -->
          <template slot="right">
            <slot
              :name="item.prop + 'Right'"
              :row="value"
              :column="objectOption[item.prop]"
              :index="index"
              :label="objectOption[item.prop].label"
              :prop="item.prop"
              :dictData="dictStorage[item.prop]"
            ></slot>
          </template>
        </u-form-item>
      </template>
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

export default {
  name: "uvue-form",
  props: {
    value: { type: Object, default: () => ({}) },
    option: { type: Object, default: () => ({}) },
    defaults: { type: Object, default: () => ({}) },
    formType: { type: String, default: "add" }
  },
  data() {
    return {
      rules: {},
      submitLoading: false,
      dictStorage: {},
      objectOption: {}
    };
  },
  computed: {
    allColumn() {
      const result = this.option?.column?.map(col => {
        //处理dictData
        if (col.dictData) {
          this.$set(this.dictStorage, col.prop, []);
          setTimeout(() => {
            this.$refs.dict.handleDictData(col.prop, col.dictData, col.dictOption);
          });
        }
        const operation = ["select", "action", "date", "time", "datetime"].includes(col.type) ? "选择" : "输入";
        const disabledFlags = [!!col.disabled];
        this.formType === "add" && disabledFlags.push(!!col.addDisabled);
        this.formType === "edit" && disabledFlags.push(!!col.editDisabled);
        this.formType === "view" && disabledFlags.push(true);

        const displayFlags = [col.display != false];
        this.formType === "add" && displayFlags.push(col.addDisplay != false);
        this.formType === "edit" && displayFlags.push(col.editDisplay != false);
        this.formType === "view" && displayFlags.push(col.viewDisplay != false);
        return {
          ...defaultColumnOption,
          placeholder: `请${operation} ${col.label}`,
          disabled: disabledFlags.some(bool => bool),
          display: displayFlags.every(bool => bool),
          ...col
        };
      });
      return result;
    },
    formOption() {
      const result = {
        ...defaultFormOption,
        ...(this.option || {}),
        column: this.allColumn
      };
      return result;
    }
  },
  watch: {
    allColumn: {
      handler(val) {
        let temp = {};
        val.forEach(col => {
          temp[col.prop] = col;
        });
        this.setOption(temp);
        this.$emit("update:defaults", temp);
      },
      deep: true,
      immediate: true
    },
    defaults: {
      handler(val) {
        this.setOption(val);
      },
      deep: true
    }
  },
  methods: {
    setOption(val) {
      this.objectOption = val;
      this.rules = {};
      Object.entries(val).forEach(([key, col]) => {
        // 处理rules
        if (col.rules) {
          this.rules[key] = col.rules;
        }
      });
      this.setRules(this.rules);
      this.clearValidate();
    },
    clearValidate(props) {
      const fields = this.$refs.uForm?.fields;
      const fieldsToClear = props?.length ? fields?.filter(e => props.includes(e.prop)) : fields;
      fieldsToClear?.forEach(field => {
        field.validateMessage = "";
        field.validateState = "";
      });
    },
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
          //use:handleSubmit(form,loading,back)
          this.$emit(
            "submit",
            this.value,
            () => {
              this.submitLoading = false;
            },
            () => {
              uni.navigateBack();
            }
          );
        }
      });
    },
    getFormItemValue(item) {
      return this.value[item.prop] ?? item.value ?? "";
    }
  }
};
</script>
