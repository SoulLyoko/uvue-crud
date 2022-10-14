export const listEmits = {
  "update:searchValue": (e: any) => e,
  loadmore: () => true,
  search: (e: string) => e,
  "search-change": (e: string) => e,
  "search-custom": (e: string) => e,
  "search-blur": (e: string) => e,
  "search-focus": (e: string) => e,
  "search-clear": () => true,
  "search-click": () => true,
  "search-click-icon": () => true,
  "item-click": (row: any, index: number) => row
};
