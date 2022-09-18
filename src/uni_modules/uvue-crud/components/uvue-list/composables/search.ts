import { useVModel } from "../../../composables";

export function useSearch(props: any, emit: any) {
  const searchValue = useVModel(props, "searchValue");
  const searchListeners = {
    onChange: (...args: any) => emit("search-change", ...args),
    onSearch: (...args: any) => emit("search", ...args),
    onCustom: (...args: any) => emit("search-custom", ...args),
    onBlur: (...args: any) => emit("search-blur", ...args),
    onFocus: (...args: any) => emit("search-focus", ...args),
    onClear: (...args: any) => emit("search-clear", ...args),
    onClick: (...args: any) => emit("search-click", ...args),
    onClickIcon: (...args: any) => emit("search-click-icon", ...args)
  };

  return { searchValue, searchListeners };
}
