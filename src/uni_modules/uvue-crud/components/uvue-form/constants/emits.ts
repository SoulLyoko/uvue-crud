import type { UvueFormDefaults, UvueFormOption } from "../types";

export const formEmits = {
  "update:modelValue": (e: any) => e,
  "update:defaults": (e: UvueFormDefaults) => e,
  "update:permission": (e: UvueFormOption) => e,
  submit: (e: any, f: () => void) => e && f
};
