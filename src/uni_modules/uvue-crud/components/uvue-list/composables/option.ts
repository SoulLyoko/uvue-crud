import { computed } from "vue";

export const defaultOption = {
  rowKey: "id", // 唯一键
  formPath: "", // form页面的地址
  formKeys: [],
  sticky: {}, // 吸顶属性
  search: {}, // 搜索栏属性
  empty: {}, // 空数据属性
  loadmore: {}, // 加载更多属性
  backtop: {}, // 返回顶部属性
  loading: {} // 加载属性
};

export function useOption(props: any) {
  const option = computed(() => {
    return {
      ...defaultOption,
      ...props.option
    };
  });

  return { option };
}
