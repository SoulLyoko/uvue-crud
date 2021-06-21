export const option = {
  rowKey: "id",
  formPath: "/pages/form/form",
  margin: "20rpx",
  padding: "20",
  navigateFormType: "view",
  formKeys: []
};

export const filter = {
  items: [
    {
      title: "排序",
      prop: "sort",
      options: [
        { label: "综合排序", value: "" },
        { label: "销量优先", value: "sales" },
        { label: "距离优先", value: "distance" },
        { label: "速度优先", value: "speed" },
        { label: "评分优先", value: "score" }
      ]
    },
    {
      title: "品类",
      prop: "category",
      cascader: true,
      options: [
        { label: "全部品类", value: "" },
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
    {
      title: "速度",
      prop: "speed",
      options: [
        { label: "全部", value: "" },
        { label: "30分钟内", value: 30 },
        { label: "40分钟内", value: 40 },
        { label: "50分钟内", value: 50 },
        { label: "60分钟内", value: 60 }
      ]
    },
    {
      title: "标签",
      prop: "tags",
      multiple: true,
      // transform: true,
      options: [
        { label: "热情掌柜", value: "热情掌柜" },
        { label: "分量充足", value: "分量充足" },
        { label: "价格便宜", value: "价格便宜" },
        { label: "销量热门", value: "销量热门" }
      ]
    }
  ]
};

export const listData = [
  {
    id: 1,
    title: "XXX过桥米线",
    img: "/uvue-crud/build/h5/static/waimai.png",
    category: "米粉面馆",
    send: 20,
    fee: 1,
    score: 4.6,
    sales: 3929,
    distance: 1200,
    speed: 35,
    tags: ["分量充足", "热情掌柜"],
    discount: ["30减9", "45减14", "60减26", "90减45"]
  },
  {
    id: 2,
    title: "XXX柠檬茶",
    img: "/uvue-crud/build/h5/static/waimai.png",
    category: "奶茶果汁",
    send: 25,
    fee: 0,
    score: 4.7,
    sales: 2960,
    distance: 1200,
    speed: 31,
    tags: ["销量热门", "热情掌柜"],
    discount: ["26减3", "8元无门槛红包"]
  },
  {
    id: 3,
    title: "XX酸菜鱼",
    img: "/uvue-crud/build/h5/static/waimai.png",
    category: "快餐便当",
    send: 15,
    fee: 0.5,
    score: 4.7,
    sales: 3273,
    distance: 1300,
    speed: 30,
    tags: ["价格便宜"],
    discount: ["19减18", "42减19", "68减28"]
  }
];
