/**
 * 递归建树
 * @param {array} list 需要建树的数据
 * @param {string} parentId 上级id
 * @param {object} config
 * @returns {array} 最后生成的树
 */
export function buildTree(list, parentId = "0", config = {}) {
  const defaultConfig = { idKey: "id", parentIdKey: "parentId" };
  config = { ...defaultConfig, ...config };
  return list
    .filter(item => item[config.parentIdKey] === parentId)
    .map(parent => {
      let children = null;
      const hasChildren = list.some(item => String(item[config.parentIdKey]) === String(parent[config.idKey]));
      if (hasChildren) {
        children = buildTree(list, String(parent[config.idKey]));
      }
      return {
        ...parent,
        children
      };
    });
}

/**
 * 树扁平化，多级树扁平为一维数组
 * @param {array} tree 树数组
 * @param {string} childrenKey 子数组的key
 * @returns {array} 扁平化后的一维数组
 */
export function flatTree(tree, childrenKey = "children") {
  return tree
    .map(item => {
      if (item[childrenKey] && item[childrenKey].length) {
        return [item, flatTree(item[childrenKey])];
      } else {
        return item;
      }
    })
    .flat(Infinity);
}

/**
 * 过滤树节点
 * @param {array} tree 树数组
 * @param {function} fn 传入的方法,相当于Array.filter,返回true或false
 * @param {string} childrenKey 子数组的key
 * @returns {array} 过滤出的节点
 */
export function filterTreeNode(tree, fn, childrenKey = "children") {
  const list = [...tree];
  const result = [];
  list.forEach((node, index) => {
    fn(node, index) && result.push(node);
    node[childrenKey] && result.push(...filterTreeNode(node[childrenKey], fn, childrenKey));
  });
  // for (const [index, node] of list) {
  //   fn(node, index) && result.push(node);
  //   node[childrenKey] && list.push(...node[childrenKey]);
  // }
  return result;
}

/**
 * 查找树节点
 * @param {array} tree 树数组
 * @param {function} fn 传入方的法,相当于Array.find,返回true或false
 * @param {string} childrenKey 子数组的key
 * @returns {object|null} 查找到的节点
 */
export function findTreeNode(tree, fn, childrenKey = "children") {
  const list = [...tree];
  for (const node of list) {
    if (fn(node)) return node;
    node[childrenKey] && list.push(...node[childrenKey]);
  }
  return null;
}

/**
 *@description 提取tree指定结构
 */
export function treeMap(treeData = [], fn, childrenKey = "children") {
  return treeData.map(item => treeMapEach(item, fn, childrenKey));
}

/**
 *@description 提取tree指定结构
 */
export function treeMapEach(data, fn, childrenKey = "children") {
  const haveChildren = Array.isArray(data[childrenKey]) && data[childrenKey].length > 0;
  const conversionData = fn(data) || {};
  if (haveChildren) {
    return {
      ...conversionData,
      [childrenKey]: data[childrenKey].map(i => treeMapEach(i, fn, childrenKey))
    };
  } else {
    return {
      ...conversionData
    };
  }
}
