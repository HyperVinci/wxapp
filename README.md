# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档] https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html
- [小程序开发指南教程] https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0008aeea9a8978ab0086a685851c0a
- [小程序云开发公共课资料] https://docs.qq.com/doc/DY1J1RUFWcVhveU9p

## 需求分析

### 1、用户初始化（全局对象）
#### （1）用户位置定位

#### （2）获取用户基本信息
```
  userInfo:{
    "userAvatar": String,   //用户头像，每次进入小程序时获取
    "userName": String,     //用户名，每次进入小程序时获取
    "userLocation": String, //用户地理位置，每次进入小程序时获取
    "userAddress":[         //用户地址信息，用户自己填写
      {
        "addressName": String,
        "addressDesc": String,
      },
      {...},
      ...
    ]
  }
```
---

### 2、购物功能
#### （1）商品挑选界面
##### 左侧为导航栏，记录商品种类
##### 右侧为商品列表
在导航栏可选取商品种类，右侧会显示该种类的所有商品，并且可以将商品加入购物车。
##### 底部有一条记录，显示当前购物车所有商品金额，并且点击记录会打开购物车详细列表

#### （2）购物车详细列表（可参考CC小商店或其他小程序）

#### （3）商品详细页面（最后完成）

#### （4）代码分析
```
  cart:{
    "totalMoney": double,   //记录购物车所有商品金额
    "totalCount": int,           //记录所有商品数量
    "items":[
      {
        "id": int,          //商品id
        "name": String,     //商品名称
        "price": double,    //商品单价
        "count": int,       //商品个数
        "itemPrice": double,    //商品单价 * 商品个数
        "desc": String      //商品描述
      }，
      {...},
      ...
    ]
  }
```
每次操作购物车时对数据进行更新
---

### 3、订单提交
用户购物完毕后，进入付款界面，订单提交（此处必须有事务处理，避免付款后没有提交订单）

```
  order:{
    "id": int,
    "time": long,
    "flag": int,            //记录订单状态，已下单、已发货、已收货、已评价
    "totalMoney": double,   //记录购物车所有商品金额
    "totalCount": int,           //记录所有商品数量
    "items":[
      {
        "id": int,          //商品id
        "name": String,     //商品名称
        "price": double,    //商品单价
        "count": int,       //商品个数
        "itemPrice": double,    //商品单价 * 商品个数
        "desc": String      //商品描述
      }，
      {...},
      ...
    ]
  }
```
---

### 4、订单查询
每个用户可以查看自己的订单

  

