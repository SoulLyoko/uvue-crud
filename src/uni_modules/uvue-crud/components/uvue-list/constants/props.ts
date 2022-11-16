import type { PropType } from "vue";
import type { UvueListOption } from "../types";

export const listProps = {
  /** 列表数据 */
  data: { type: Array as PropType<any[]>, default: () => [] },
  /** 列表配置 */
  option: { type: Object as PropType<UvueListOption>, default: () => ({}) },
  /** 搜索栏绑定值 */
  searchValue: { type: String },
  /** 加载更多状态 */
  status: { type: String as PropType<"loadmore" | "loading" | "nomore"> },
  /** 页面的滚动距离，通过 onPageScroll 生命周期获取 */
  scrollTop: { type: Number, default: 0 }
};
