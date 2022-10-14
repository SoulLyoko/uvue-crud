import { computed, ref } from "vue";
import type { UvueFormOption, UvueFormColumn, UvueFormGroup } from "../types";

export const defaultFormOption: UvueFormOption = {
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

export function handleGroup(group: any[] = [], formType: string) {
  return group.map(g => {
    return {
      ...defaultFormGroup,
      ...g,
      column: handleColumn(g.column, formType)
    };
  });
}

export function handleColumn(column: any[] = [], formType: string) {
  return column.map(col => {
    const operation = ["select", "cascader", "date", "time", "datetime"].includes(col.type) ? "选择" : "输入";
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

export function handleDynamic(dynamic: any, formType: string) {
  return {
    ...dynamic,
    submitBtn: false,
    emptyBtn: false,
    addBtn: true,
    delBtn: true,
    column: handleColumn(dynamic.column, formType)
  };
}

export function flatGroupColumn({ column, group }: { column: any[]; group: any[] }) {
  return [...column, ...group.map(g => g.column).flat()];
}

export function useOption(props: any, emit: any) {
  const option = computed(() => {
    return {
      ...defaultFormOption,
      ...props.option,
      ...props.permission,
      column: handleColumn(props.option.column, props.formType),
      group: handleGroup(props.option.group, props.formType)
    };
  });

  const defaults = Object.fromEntries(flatGroupColumn(option.value).map(col => [col.prop, col]));
  emit("update:defaults", defaults);

  const defaultCollapse = computed(() => {
    return option.value.group?.filter((g: any) => g.collapse).map((g: any) => g.prop);
  });

  const currentTab = ref(0);
  const currentGroup = computed(() => {
    return option.value.group[currentTab.value] ?? [];
  });

  return { option, defaultCollapse, currentTab, currentGroup };
}
