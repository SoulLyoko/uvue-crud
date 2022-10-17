import type { ExtractPropTypes, SetupContext } from "vue";
import type { AvueFormOption, AvueFormColumn, AvueFormGroup } from "@smallwei/avue";
import type { formProps, formEmits } from "../constants";

export type UvueFormProps = ExtractPropTypes<typeof formProps>;
export type UvueFormEmitFn = SetupContext<typeof formEmits>["emit"];

export interface UvueFormOption<T = any> extends AvueFormOption<T> {
  rowKey?: string;
  errorType?: "none" | "toast" | "border-bottom";
  borderBottom?: boolean;
  labelAlign?: "left" | "center" | "right";
  labelStyle?: string | object;
  column?: UvueFormColumn<T>[];
  group?: UvueFormGroup<T>[];
}
export interface UvueFormColumn<T = any> extends AvueFormColumn<T> {
  borderBottom?: boolean;
  rightIcon?: string;
  leftIcon?: string;
  leftIconStyle?: string | object;
  required?: boolean;
  children?: { addBtn?: boolean; delBtn?: boolean } & UvueFormOption;
}
export interface UvueFormGroup<T = any> extends AvueFormGroup<T> {
  column?: UvueFormColumn<T>[];
}
export type UvueFormDefaults = Record<string, UvueFormColumn>;
