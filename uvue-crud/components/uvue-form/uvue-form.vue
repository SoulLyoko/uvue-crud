<template>
  <view class="uvue-form">
    <u-form ref="uForm" :model="value" :rules="rules" v-bind="formOption">
      <u-form-item v-bind="item" v-for="(item, index) in formOption.column" :key="item.prop || index">
        <!-- 兼容app -->
        <slot
          name="formItem"
          :row="value"
          :column="item"
          :index="index"
          :label="item.label"
          :prop="item.prop"
          :dictData="formDict[item.prop]"
          v-if="$scopedSlots.formItem"
        ></slot>
        <!-- 兼容app -->

        <slot
          :name="item.prop"
          :row="value"
          :column="item"
          :index="index"
          :label="item.label"
          :prop="item.prop"
          :dictData="formDict[item.prop]"
          v-else-if="$scopedSlots[item.prop]"
        ></slot>

        <uvue-form-item
          v-bind="item"
          :value="getFormItemValue(item)"
          :dictData="formDict[item.prop]"
          @input="updateProp(item.prop, $event)"
          v-else
        ></uvue-form-item>

        <template slot="right">
          <slot
            :name="item.prop + 'Right'"
            :row="value"
            :column="item"
            :index="index"
            :label="item.label"
            :prop="item.prop"
            :dictData="formDict[item.prop]"
          ></slot>
        </template>
      </u-form-item>
    </u-form>

    <u-button type="primary" @click="formSubmit" :loading="submitLoading" v-if="formOption.submitBtn">
      {{ formOption.submitBtnText }}
    </u-button>
  </view>
</template>

<script>
import { defaultOption, defaultDictOption } from "./option";

export default {
  name: "uvue-form",
  props: {
    value: { type: Object, default: () => ({}) },
    option: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      formOption: {},
      rules: {},
      formDict: {},
      submitLoading: false
    };
  },
  watch: {
    option: {
      handler(val) {
        this.formOption = {
          ...defaultOption,
          ...(val || {}),
          column: val?.column?.map(col => {
            // 处理rules
            if (col.rules) {
              this.rules[col.prop] = col.rules;
            }
            //处理dictData
            if (col.dictData) {
              this.formDict[col.prop] = [];
              const dictOption = {
                ...defaultDictOption,
                ...(col.dictOption || {})
              };
              const dictDataType = Object.prototype.toString.call(col.dictData);
              if (dictDataType.includes("Function")) {
                this.setFormDict(col.prop, col.dictData(), dictOption);
              } else if (dictDataType.includes("Promise")) {
                col.dictData
                  // eslint-disable-next-line no-unused-vars
                  .then?.(res => {
                    const data = eval(dictOption.res);
                    this.setFormDict(col.prop, data, dictOption);
                  })
                  .catch(err => {
                    console.error("请求字典错误:" + err);
                  });
              } else if (dictDataType.includes("Array")) {
                this.setFormDict(col.prop, col.dictData, dictOption);
              }
            }
            const operation = ["select", "action", "date", "time", "datetime"].includes(col.type) ? "选择" : "输入";
            return {
              type: "text",
              placeholder: "请" + operation + col.label,
              ...col
            };
          })
        };
        this.setRules(this.rules);
      },
      immediate: true,
      deep: true
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
            uni.navigateBack();
          });
        }
      });
    },
    getFormItemValue(item) {
      return this.value[item.prop] ?? item.value ?? "";
    },
    setFormDict(prop, dictData, dictOption) {
      this.formDict = {
        ...this.formDict,
        [prop]: dictData.map(dict => {
          return {
            label: dict[dictOption.label],
            value: dict[dictOption.value],
            text: dict[dictOption.label],
            children: dict[dictOption.children]
          };
        })
      };
    }
  }
};
</script>
