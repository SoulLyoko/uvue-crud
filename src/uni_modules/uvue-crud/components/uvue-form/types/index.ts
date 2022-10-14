import type { ExtractPropTypes, SetupContext } from "vue";
import type { AvueFormOption, AvueFormColumn, AvueFormGroup } from "@smallwei/avue";
import type { formProps, formEmits } from "../constants";

export type UvueFormProps = ExtractPropTypes<typeof formProps>;
export type UvueListEmitFn = SetupContext<typeof formEmits>["emit"];

export interface UvueFormOption<T = any> extends AvueFormOption<T> {
  column?: UvueFormColumn<T>[];
  group?: UvueFormGroup<T>[];
}
export interface UvueFormColumn<T = any> extends AvueFormColumn<T> {}
export interface UvueFormGroup<T = any> extends AvueFormGroup<T> {
  column?: UvueFormColumn<T>[];
}
export type UvueFormDefaults = Record<string, UvueFormColumn>;
