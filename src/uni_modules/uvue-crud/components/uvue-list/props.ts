import type { PropType } from "vue";
import type { ListOption } from "./types";

export default {
  data: { type: Array as PropType<any[]>, default: () => [] },
  option: { type: Object as PropType<ListOption>, default: () => ({}) },
  searchValue: { type: String },
  loading: { type: Boolean },
  status: { type: String },
  scrollTop: { type: Number }
};
