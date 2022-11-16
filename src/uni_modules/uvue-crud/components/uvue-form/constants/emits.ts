import type { UvueFormDefaults } from "../types";

export const formEmits = {
  "update:modelValue": (e: any) => e,
  "update:defaults": (e: UvueFormDefaults) => e,
  submit: (form: any, done: () => void) => form && done
};
