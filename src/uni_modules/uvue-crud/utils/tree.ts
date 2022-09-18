import type { Data, TreeNode } from "../types";

import { jsonClone } from "./object";

export interface BuildTreeOptions {
  /**
   * 父级id
   * @default "0"
   * */
  parentId?: string | number;
  /**
   * 节点id键名
   * @default "id"
   * */
  idKey?: string;
  /**
   * 父级节点id键名
   * @default "parentId"
   */
  parentIdKey?: string;
}
/**
 * 递归建树
 * @param {Array} list 需要建树的数据
 * @param {BuildTreeOptions} options
 */
export function buildTree<T extends Data>(list: T[], options: BuildTreeOptions = {}) {
  const { parentId = "0", idKey = "id", parentIdKey = "parentId" } = options;
  return list
    .filter(item => item[parentIdKey] === parentId)
    .map(parent => {
      const result: TreeNode<T> = { ...parent };
      let children = null;
      const hasChildren = list.some(item => item[parentIdKey] === parent[idKey]);
      if (hasChildren) {
        children = buildTree(list, { ...options, parentId: parent[idKey] });
      }
      children?.length && (result.children = children);
      return result;
    });
}

export interface FlatTreeOptions {
  /**
   * 子数组的key
   * @default "children"
   */
  childrenKey?: string;
  /**
   * 起始的深度
   *  @default 0
   */
  depth?: number;
  /**
   * 是否返回深度值_depth
   *  @default false
   */
  returnDepth?: boolean;
  /**
   * 是否返回子节点
   * @default false
   */
  returnChildren?: boolean;
}
/**
 * 树扁平化，多级树扁平为一维数组
 * @param {Array} tree 树数组
 * @param {FlatTreeOptions} options
 */
export function flatTree<T extends TreeNode>(tree: T[], options: FlatTreeOptions = {}): T[] {
  const { childrenKey = "children", depth = 0, returnDepth = false, returnChildren = false } = options;
  const list = jsonClone(tree);
  return list
    .map((node: T & { _depth?: number }) => {
      returnDepth && (node._depth = depth);
      if (node[childrenKey]?.length) {
        return [node, flatTree(node[childrenKey], { ...options, depth: depth + 1 })];
      } else {
        return node;
      }
    })
    .flat(Infinity)
    .map(e => {
      !returnChildren && delete (e as T)[childrenKey];
      return e;
    }) as T[];
}

export interface FilterTreeOptions {
  /**
   * 子数组的key
   * @default "children"
   */
  childrenKey?: string;
  /**
   * true返回扁平化数组,false返回树结构
   * @default true
   */
  flat?: boolean;
}
/**
 * 过滤树节点
 * @param {Array} tree 树数组
 * @param {Function} fn 传入过滤的方法,相当于Array.filter,函数内返回true或false
 * @param {FilterTreeOptions} options
 */
export function filterTree<T extends TreeNode>(tree: T[], fn: (node: T) => boolean, options: FilterTreeOptions = {}) {
  const { childrenKey = "children", flat = true } = options;
  const list = jsonClone(tree);
  if (flat) {
    const result = [];
    for (const node of list) {
      fn(node) && result.push(node);
      node[childrenKey] && list.push(...node[childrenKey]);
    }
    return result;
  } else {
    return list.filter(node => {
      const hasChildren = node[childrenKey]?.length;
      (node[childrenKey] as T[]) = hasChildren && filterTree(node[childrenKey], fn, options);
      return fn(node) || node[childrenKey]?.length;
    });
  }
}

export interface FindTreeOptions {
  /**
   * 子数组的key
   * @default "children"
   */
  childrenKey?: string;
  /**
   * 是否返回子节点
   * @default false
   */
  returnChildren?: boolean;
}
/**
 * 查找树节点
 * @param {Array} tree 树数组
 * @param {Function} fn 传入查找的方法,相当于Array.find(node=>boolean),函数内返回true或false
 * @param {FindTreeOptions} options
 */
export function findTree<T extends TreeNode>(tree: T[], fn: (node: T) => boolean, options: FindTreeOptions = {}) {
  const { childrenKey = "children", returnChildren = false } = options;
  const list = jsonClone(tree);
  for (const node of list) {
    if (fn(node)) {
      !returnChildren && delete node[childrenKey];
      return node;
    }
    node[childrenKey] && list.push(...node[childrenKey]);
  }
  return null;
}

export interface TreeMapOptions<T> {
  /**
   * 子数组的key
   * @default "children"
   */
  childrenKey?: string;
  /**
   * 父级节点
   * @default null
   */
  parent?: T | null;
  /**
   * 起始的深度
   * @default 0
   */
  depth?: number;
}
/**
 * 提取tree指定结构
 * @param {Array} tree 树数组
 * @param {Function} fn 传入的方法,相当于Array.map((node, index, parent, depth)=>any),函数内返回新的结构
 * @param {TreeMapOptions} options
 */
export function treeMap<T extends TreeNode, N extends TreeNode>(
  tree: T[],
  fn: (node: T, index: number, parent: T | null, depth: number) => N,
  options: TreeMapOptions<T> = {}
): N[] {
  const { childrenKey = "children", parent = null, depth = 0 } = options;
  const result = tree.map((node, index) => {
    const hasChildren = node[childrenKey]?.length;
    const conversionData = fn(node, index, parent, depth) || node;
    if (hasChildren) {
      return {
        ...conversionData,
        [childrenKey]: treeMap(node[childrenKey], fn, { ...options, parent: node, depth: depth + 1 })
      };
    } else {
      return { ...conversionData };
    }
  });
  return result;
}
