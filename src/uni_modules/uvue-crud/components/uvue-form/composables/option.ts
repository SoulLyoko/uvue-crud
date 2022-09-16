import { computed } from "vue";

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

export const defaultDictOption = {
  label: "label",
  value: "value",
  children: "children",
  res: "res.data"
};

export function useOption(props: any, emit: any) {
  const option = computed(() => {
    return {
      ...defaultFormOption,
      ...props.option,
      column:
        props.option.column?.map((col: any) => {
          const operation = ["select", "date", "time", "datetime"].includes(col.type) ? "选择" : "输入";
          const disabledFlags = [!!col.disabled];
          props.formType === "add" && disabledFlags.push(!!col.addDisabled);
          props.formType === "edit" && disabledFlags.push(!!col.editDisabled);
          props.formType === "view" && disabledFlags.push(true);

          const displayFlags = [col.display != false];
          props.formType === "add" && displayFlags.push(col.addDisplay != false);
          props.formType === "edit" && displayFlags.push(col.editDisplay != false);
          props.formType === "view" && displayFlags.push(col.viewDisplay != false);

          return {
            ...defaultColumnOption,
            placeholder: `请${operation} ${col.label}`,
            disabled: disabledFlags.some(bool => bool),
            display: displayFlags.every(bool => bool),
            ...col
          };
        }) ?? []
    };
  });

  const defaults = Object.fromEntries(
    option.value.column.map((col: any) => {
      return [col.prop, col];
    })
  );
  emit("update:defaults", defaults);

  return option;
}
