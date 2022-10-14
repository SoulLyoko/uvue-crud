import type { ExtractPropTypes, SetupContext } from "vue";
import type { listProps, listEmits } from "../constants";

export type UvueListProps = ExtractPropTypes<typeof listProps>;
export type UvueListEmitFn = SetupContext<typeof listEmits>["emit"];

export interface UvueListOption<T = any> {
  /** 唯一键 */
  rowKey?: string;
  /** [吸顶属性](https://uiadmin.net/uview-plus/components/sticky.html#props) */
  sticky?: object | false;
  /** [搜索栏属性](https://uiadmin.net/uview-plus/components/search.html#props) */
  search?: object | false;
  /** [空数据属性](https://uiadmin.net/uview-plus/components/empty.html#props) */
  empty?: object | false;
  /** [加载更多属性](https://uiadmin.net/uview-plus/components/loadMore.html#props) */
  loadmore?: object | false;
  /** [返回顶部属性](https://uiadmin.net/uview-plus/components/backTop.html#props) */
  backTop?: object | false;
  /** [加载页属性](https://uiadmin.net/uview-plus/components/loadingPage.html#props) */
  loadingPage?: object | false;
  /** [单元格组属性](https://uiadmin.net/uview-plus/components/cell.html#cellgroup-props) */
  cellGroup?: object;
  /** [单元格属性](https://uiadmin.net/uview-plus/components/cell.html#cell-props) */
  cell?: object;
  /** 对列表数据格式化 */
  formatter?: (row: T) => any;
}
