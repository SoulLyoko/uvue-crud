const pro = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: [
          { label: "热情掌柜", value: "热情掌柜" },
          { label: "分量充足", value: "分量充足" },
          { label: "价格便宜", value: "价格便宜" },
          { label: "销量热门", value: "销量热门" }
        ]
      });
    }, 1000);
  });
};

export const formOption = {
  labelWidth: 100,
  column: [
    { label: "标题", prop: "title" },
    { label: "图片", prop: "img" },
    { label: "品类", prop: "category" },
    { label: "起送价", prop: "send" },
    { label: "配送费", prop: "fee" },
    { label: "评分", prop: "score" },
    { label: "销量", prop: "sales" },
    { label: "距离", prop: "distance" },
    { label: "速度", prop: "speed" },
    {
      label: "标签",
      prop: "tags",
      type: "select",
      dictData: pro()
    },
    { label: "优惠", prop: "discount" }
  ]
};
