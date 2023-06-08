import type { UvueListProps, UvueListEmitFn } from "../types";

import { useVModel } from "@vueuse/core";

export function useSearch(props: UvueListProps, emit: UvueListEmitFn) {
  const searchValue = useVModel(props, "searchValue");
  const searchListeners = {
    onSearch: (value: string) => emit("search", value),
    onChange: (value: string) => emit("search-change", value),
    onCustom: (value: string) => emit("search-custom", value),
    onBlur: (value: string) => emit("search-blur", value),
    onFocus: (value: string) => emit("search-focus", value),
    onClear: () => emit("search-clear"),
    onClick: () => emit("search-click"),
    onClickIcon: () => emit("search-click-icon")
  };

  return { searchValue, searchListeners };
}
