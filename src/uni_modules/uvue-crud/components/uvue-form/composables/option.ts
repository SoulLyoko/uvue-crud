import type { FormType } from "@smallwei/avue";
import type {
  UvueFormOption,
  UvueFormColumn,
  UvueFormGroup,
  UvueFormProps,
  UvueFormEmitFn,
  UvueFormDefaults
} from "../types";

import { computed, ref } from "vue";

export const defaultFormOption: UvueFormOption = {
  menuBtn: true, // 是否显示按钮
  submitBtn: true, // 是否显示提交按钮
  submitText: "提交", // 提交按钮文字
  emptyBtn: true, // 是否显示清空按钮
  emptyText: "清空" // 清空按钮文字
};

export const defaultFormColumn: UvueFormColumn = {
  type: "text",
  display: true,
  addDisplay: true,
  editDisplay: true,
  viewDisplay: true,
  disabled: false,
  addDisabled: false,
  editDisabled: false,
  clearable: true
};

export const defaultFormGroup: UvueFormGroup = {
  display: true,
  collapse: true
};

export const defaultDictOption = {
  label: "label",
  value: "value",
  children: "children",
  res: "res.data"
};

export function handleGroup(group: UvueFormGroup[] = [], formType: FormType) {
  return group.map(g => {
    return {
      ...defaultFormGroup,
      ...g,
      column: handleColumn(g.column, formType)
    };
  });
}

export function handleColumn(column: UvueFormColumn[] = [], formType: FormType) {
  return column.map(col => {
    const operation =
      col.type && ["select", "cascader", "date", "time", "datetime"].includes(col.type) ? "选择" : "输入";
    const disabledFlags = [!!col.disabled];
    formType === "add" && disabledFlags.push(!!col.addDisabled);
    formType === "edit" && disabledFlags.push(!!col.editDisabled);
    formType === "view" && disabledFlags.push(true);

    const displayFlags = [col.display != false];
    formType === "add" && displayFlags.push(col.addDisplay != false);
    formType === "edit" && displayFlags.push(col.editDisplay != false);
    formType === "view" && displayFlags.push(col.viewDisplay != false);

    const result = {
      ...defaultFormColumn,
      placeholder: `请${operation} ${col.label}`,
      disabled: disabledFlags.some(bool => bool),
      display: displayFlags.every(bool => bool),
      ...col
    };

    if (col.type === "dynamic") {
      result.children = handleDynamic(col.children, formType);
    }

    return result;
  });
}

export function handleDynamic(dynamic: UvueFormColumn["children"] = {}, formType: FormType) {
  return {
    ...dynamic,
    submitBtn: false,
    emptyBtn: false,
    addBtn: true,
    delBtn: true,
    column: handleColumn(dynamic.column, formType)
  };
}

export function flatGroupColumn({ column, group }: Pick<UvueFormOption, "group" | "column">) {
  return [...column!, ...group!.map(g => g.column!).flat()];
}

export function useOption(props: UvueFormProps, emit: UvueFormEmitFn) {
  const defaultValues = ref({});
  const defaults = ref<UvueFormDefaults>({});
  const option = computed<UvueFormOption>(() => {
    const result = {
      ...defaultFormOption,
      ...props.option,
      ...props.permission,
      column: handleColumn(props.option.column, props.formType!),
      group: handleGroup(props.option.group, props.formType!)
    };

    const allColumns = flatGroupColumn(result);
    defaults.value = Object.fromEntries(allColumns.map(col => [col.prop, col]));
    emit("update:defaults", defaults.value);
    defaultValues.value = Object.fromEntries(allColumns.filter(e => "value" in e).map(col => [col.prop, col.value]));

    return result;
  });

  const defaultCollapse = computed(() => {
    return option.value.group?.filter(g => g.collapse).map(g => g.prop);
  });

  const currentTab = ref(0);
  const currentGroup = computed(() => {
    return option.value.group?.[currentTab.value] ?? [];
  });

  return { option, defaultCollapse, currentTab, currentGroup, defaultValues, defaults };
}
