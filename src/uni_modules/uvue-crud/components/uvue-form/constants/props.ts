import type { PropType } from "vue";
import type { UvueFormOption, UvueFormColumn, UvueFormDefaults } from "../types";

export const formProps = {
  modelValue: { type: Object, default: () => ({}) },
  option: { type: Object as PropType<UvueFormOption>, default: () => ({}) },
  defaults: { type: Object as PropType<UvueFormDefaults>, default: () => ({}) },
  permission: { type: Object as PropType<UvueFormOption>, default: () => ({}) },
  formType: { type: String as PropType<"add" | "edit" | "view"> },
  renderAs: { type: String as PropType<"form" | "form-item" | "form-dynamic">, default: "form" },
  columnItem: { type: Object as PropType<UvueFormColumn>, default: () => ({}) }
};
