export const listOption = {
  rowKey: "id"
};

const group = [
  {
    label: "group1",
    prop: "group1",
    collapse: false,
    column: [
      { label: "slot", prop: "slot", type: "slot" },
      { label: "input", prop: "input", type: "input" },
      { label: "textarea", prop: "textarea", type: "textarea" }
    ]
  },
  {
    label: "group2",
    prop: "group2",
    column: [
      { label: "select", prop: "select", type: "select", dicUrl: "single" },
      { label: "cascader", prop: "cascader", type: "cascader", dicUrl: "tree" },
      { label: "datetime", prop: "datetime", type: "date" }
    ]
  },
  {
    label: "group3",
    prop: "group3",
    column: [
      { label: "checkbox", prop: "checkbox", type: "checkbox", dicUrl: "single" },
      { label: "radio", prop: "radio", type: "radio", dicUrl: "datetime" },
      { label: "switch", prop: "switch", type: "switch", dicUrl: "single" }
    ]
  },
  {
    label: "group4",
    prop: "group4",
    column: [
      {
        label: "dynamic",
        prop: "dynamic",
        type: "dynamic",
        children: {
          labelWidth: 70,
          column: [
            { label: "column1", prop: "column1", rules: [{ required: true, message: "请输入" }] },
            { label: "column2", prop: "column2" }
          ]
        }
      }
    ]
  }
];

// const column = group.map(g => g.column).flat();
const column = [{ label: "isTabs", prop: "isTabs", type: "switch", dicUrl: "single" }];

export const formOption = {
  labelWidth: 70,
  tabs: true,
  group,
  column
};
