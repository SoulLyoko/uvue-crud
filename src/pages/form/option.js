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
    {
      label: "品类",
      prop: "category",
      type: "select",
      mode: "mutil-column-auto",
      dictData: [
        {
          label: "美食",
          value: "美食",
          children: [
            { label: "快餐便当", value: "快餐便当" },
            { label: "龙虾烧烤", value: "龙虾烧烤" },
            { label: "米粉面馆", value: "米粉面馆" },
            { label: "特色小吃", value: "特色小吃" },
            { label: "地方菜系", value: "地方菜系" },
            { label: "炸鸡炸串", value: "炸鸡炸串" }
          ]
        },
        {
          label: "甜点饮品",
          value: "甜点饮品",
          children: [
            { label: "面包蛋糕", value: "面包蛋糕" },
            { label: "可口甜品", value: "可口甜品" },
            { label: "奶茶果汁", value: "奶茶果汁" },
            { label: "醒脑咖啡", value: "醒脑咖啡" },
            { label: "凉茶冰淇淋", value: "凉茶冰淇淋" }
          ]
        },
        {
          label: "超市便利",
          value: "超市便利",
          children: [
            { label: "超市卖场", value: "超市卖场" },
            { label: "宠物用品", value: "宠物用品" },
            { label: "便利店", value: "便利店" },
            { label: "日用百货", value: "日用百货" },
            { label: "茶酒专卖", value: "茶酒专卖" },
            { label: "零食干果", value: "零食干果" }
          ]
        }
      ]
    },
    { label: "起送价", prop: "send" },
    { label: "配送费", prop: "fee" },
    { label: "评分", prop: "score" },
    { label: "销量", prop: "sales" },
    { label: "距离", prop: "distance" },
    { label: "速度", prop: "speed" },
    {
      label: "标签",
      prop: "tags",
      type: "checkbox",
      dictData: pro()
    },
    { label: "优惠", prop: "discount" }
  ]
};
