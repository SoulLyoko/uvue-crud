import { computed, ref } from "vue";

export const defaultFormOption = {
  submitBtn: true, // 是否显示提交按钮
  submitText: "提交", // 提交按钮文字
  emptyBtn: true, // 是否显示清空按钮
  emptyText: "清空" // 清空按钮文字
};

export const defaultColumnOption = {
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

export const defaultGroupOption = {
  display: true,
  collapse: true
};

export const defaultDictOption = {
  label: "label",
  value: "value",
  children: "children",
  res: "res.data"
};

function handleGroup(group: any[] = [], formType: string) {
  return group.map(g => {
    return {
      ...defaultGroupOption,
      ...g,
      column: handleColumn(g.column, formType)
    };
  });
}

function handleColumn(column: any[] = [], formType: string) {
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

    return {
      ...defaultColumnOption,
      placeholder: `请${operation} ${col.label}`,
      disabled: disabledFlags.some(bool => bool),
      display: displayFlags.every(bool => bool),
      ...col
    };
  });
}

export function flatGroupColumn({ column, group }: { column: any[]; group: any[] }) {
  return [...column, ...group.map(g => g.column).flat()];
}

export function useOption(props: any, emit: any) {
  const option = computed(() => {
    console.log("🚀 ~ file: option.ts ~ line 77 ~ option ~ props.permission", props.permission);
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
