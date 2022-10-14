import type { UvueListOption } from "../types";

import { computed } from "vue";

export const defaultOption: UvueListOption = {
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
    } as UvueListOption;
  });

  return { option };
}
