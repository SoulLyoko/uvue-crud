<script>
import { defaultDictOption } from "./option";

export default {
  name: "uvue-dict",
  props: ["value"],
  render() {
    return "";
  },
  data() {
    return {};
  },
  methods: {
    handleDictData(prop, data, option) {
      const dictOption = {
        ...defaultDictOption,
        ...(option || {})
      };
      const dictDataType = Object.prototype.toString.call(data);
      if (dictDataType.includes("Function")) {
        const dictDataFunction = data;
        this.setDictStorage(prop, dictDataFunction(), dictOption);
      } else if (dictDataType.includes("Promise")) {
        const dictDataPromise = data;
        dictDataPromise
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            const data = eval(dictOption.res);
            this.setDictStorage(prop, data, dictOption);
          })
          .catch(err => console.error("请求字典错误:" + err));
      } else if (dictDataType.includes("Array")) {
        this.setDictStorage(prop, data, dictOption);
      }
    },
    setDictStorage(prop, data, option) {
      const dictOption = {
        ...defaultDictOption,
        ...(option || {})
      };
      let dictStorage = this.value || {};
      dictStorage[prop] = dictMap(data);

      function dictMap(dictArr) {
        return dictArr.map(dict => {
          // 兼容select的多列模式mutil-column
          if (Array.isArray(dict)) return dictMap(dict);

          let children = dict[dictOption.children];
          if (children?.length) {
            children = dictMap(dict.children);
          }

          return {
            label: dict[dictOption.label],
            value: dict[dictOption.value],
            text: dict[dictOption.label],
            children
          };
        });
      }

      this.$emit("input", dictStorage);
    },
    getDictStorage(prop) {
      return this.dictStorage[prop];
    }
  }
};
</script>
