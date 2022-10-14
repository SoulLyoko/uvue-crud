import type { ListOption } from "../types";

import { computed } from "vue";

export const defaultOption: ListOption = {
  rowKey: "id",
  sticky: {},
  search: {},
  empty: {},
  loadmore: {},
  backTop: {},
  loadingPage: {},
  cellGroup: {},
  cell: {}
};

export function useOption(props: any) {
  const option = computed(() => {
    return {
      ...defaultOption,
      ...props.option
    } as ListOption;
  });

  return { option };
}
