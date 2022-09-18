import type { PropType } from "vue";

export default {
  data: { type: Array as PropType<any[]>, default: () => [] },
  option: { type: Object, default: () => ({}) },
  searchValue: { type: String },
  loading: { type: Boolean },
  status: { type: String },
  scrollTop: { type: Number }
};
