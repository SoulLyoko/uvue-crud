import { defaultDictOption } from "./option.js";

function useDict(vm) {
  const dictStorage = {};

  function handleDictData(prop, data, option) {
    const dictOption = {
      ...defaultDictOption,
      ...(option || {})
    };
    const dictDataType = Object.prototype.toString.call(data);
    if (dictDataType.includes("Function")) {
      const dictDataFunction = data;
      setDictStorage(prop, dictDataFunction(), dictOption);
    } else if (dictDataType.includes("Promise")) {
      const dictDataPromise = data;
      dictDataPromise
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          const data = eval(dictOption.res);
          setDictStorage(prop, data, dictOption);
        })
        .catch(err => console.error("请求字典错误:" + err));
    } else if (dictDataType.includes("Array")) {
      setDictStorage(prop, data, dictOption);
    }
  }
  function setDictStorage(prop, data, option) {
    const dictOption = {
      ...defaultDictOption,
      ...(option || {})
    };
    vm.$set(
      dictStorage,
      prop,
      data.map(dict => {
        return {
          label: dict[dictOption.label],
          value: dict[dictOption.value],
          text: dict[dictOption.label],
          children: dict[dictOption.children]
        };
      })
    );
  }

  function getDictStorage(prop) {
    return dictStorage[prop];
  }

  return {
    dictStorage,
    handleDictData,
    setDictStorage,
    getDictStorage
  };
}

export default useDict;
