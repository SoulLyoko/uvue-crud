import type { PropType } from "vue";
import type { UvueListOption } from "../types";

export const listProps = {
  data: { type: Array as PropType<any[]>, default: () => [] },
  option: { type: Object as PropType<UvueListOption>, default: () => ({}) },
  searchValue: { type: String },
  status: { type: String as PropType<"loadmore" | "loading" | "nomore"> },
  scrollTop: { type: Number }
};
