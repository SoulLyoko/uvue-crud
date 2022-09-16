export type DicItem = {
  label?: string;
  value?: any;
  disabled?: boolean;
  children?: DicItem[];
  [x: string]: any;
};
