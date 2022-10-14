import type { Data } from "@yusui/types";
import type { AvueFormOption, AvueFormColumn, AvueFormGroup } from "@smallwei/avue";

export interface UvueFormOption<T extends Data = Data> extends AvueFormOption<T> {
  column?: UvueFormColumn<T>[];
  group?: UvueFormGroup<T>[];
}
export interface UvueFormColumn<T extends Data = Data> extends AvueFormColumn<T> {}
export interface UvueFormGroup<T extends Data = Data> extends AvueFormGroup<T> {
  column?: UvueFormColumn<T>[];
}
