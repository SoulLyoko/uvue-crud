import type { PropType } from "vue";
import type { UvueListOption } from "../types";

export const listProps = {
  data: { type: Array as PropType<any[]>, default: () => [] },
  option: { type: Object as PropType<UvueListOption>, default: () => ({}) },
  searchValue: { type: String },
  loading: { type: Boolean },
  status: { type: String },
  scrollTop: { type: Number }
};
