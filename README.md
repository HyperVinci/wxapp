## 需求分析

### 1、用户初始化（全局对象）
#### （1）用户位置定位

#### （2）获取用户基本信息
```
  userInfo:{
    "_id": String,          //用户id
    "avatarUrl": String,    //用户头像，每次进入小程序时获取
    "nickName": String,     //用户名，每次进入小程序时获取
    "gender": int,          //1表示男
    "userLocation": String, //用户地理位置，每次进入小程序时获取
    "userAddress":[         //用户地址信息，用户自己填写
      {
        "addressName": String,    //地址名称（如家、公司）
        "addressDesc": String,    //详细地址
      },
      {...},
      ...
    ]
  }
```

### 2、购物功能
#### （1）商品挑选界面
##### 左侧为导航栏，记录商品种类
##### 右侧为商品列表
在导航栏可选取商品种类，右侧会显示该种类的所有商品，并且可以将商品加入购物车。
每条商品列表显示商品名称、单价、描述、购买数量（默认为0）、+按钮和-按钮。点击+按钮会使购买数量+1，点击-按钮会使购买数量-1（下限为0），且会调用setData方法，使cart中的对应item的count自增或自减。

##### 底部有一条长条形记录，显示当前购物车所有商品金额，并且点击记录会打开购物车详细列表
底部记录左侧显示购物车总金额和商品总件数，右侧有下单按钮。点击下单按钮会进入购物车详细列表，列举购物车中每款商品的名称、单价、图片、购买数量、购买价格，最下方会有支付按钮。点击支付按钮跳转到支付页面。

#### （2）购物车页面（可参考CC小商店或其他小程序）
点击下方的购物车记录，会进入详细的购物车页面，显示所有已选商品的信息，并且有一个“提交订单”按钮用于用户提交订单

#### （3）商品详细页面（最后完成）

#### （4）代码分析
用户每次添加商品、修改商品数量、移除商品时对cart数据进行更新
```
  cart:{
    "totalMoney": double,   //记录购物车所有商品金额
    "totalCount": int,           //记录所有商品数量
    "items":[
      {
        "item_id": int,          //商品id
        "name": String,     //商品名称
        "price": double,    //商品单价
        "count": int,       //商品个数
        "itemPrice": double,    //商品单价 * 商品个数
        "image_url": String,    //商品图片
      }，
      {...},
      ...
    ]
  }
```


### 3、订单提交
用户购物完毕后，进入付款界面，订单提交（此处必须有事务处理，避免付款后没有提交订单）

```
  order:{
    "order_id": int,
    "userId": int,          //所属用户id
    "time": long,           //下单时间戳
    "flag": int,            //记录订单状态，已下单、已发货、已收货、已评价
    "totalMoney": double,   //记录购物车所有商品金额
    "totalCount": int,           //记录所有商品数量
    "items":[
      {
        "item_id": int,          //商品id
        "name": String,     //商品名称
        "price": double,    //商品单价
        "count": int,       //商品个数
        "itemPrice": double,    //商品单价 * 商品个数
        "image_url": String,    //商品图片
        "desc": String      //商品描述
      }，
      {...},
      ...
    ]
  }
```


### 4、订单查询
使用多表查询，连接orders表和uses表，可实现每个用户查看自己的订单


### 5、地址管理

### 6、文章详情
使用wxParse插件


## 云数据库
### 1、items表：记录商品信息，在后台由管理员添加。当用户进入到商品浏览页面时获取商品信息
```
  //sql语法
  create table items if not exists(
    item_id int primary key auto_increment,          //商品id
    name varchar(20) not null,     //商品名称
    price double not null,         //商品单价
    image_url varchar(50),         //商品图片
    desc varchar(20)               //商品描述
  )
```

```
  //json格式
  item:{
    "_id": int,              //商品id
    "name" String,          //商品名称
    "price" double,         //商品单价
    "type" String           //商品类别
    "image_url": String,    //商品图片
    "desc" String           //商品描述
  }
```

### 2、users表：记录用户信息。当用户退出小程序时，小程序上传用户信息
```
  /json格式
  userInfo:{
    "_id": String,          //用户id
    "avatarUrl": String,    //用户头像，每次进入小程序时获取
    "nickName": String,     //用户名，每次进入小程序时获取
    "gender": int,          //1表示男
    "userLocation": String, //用户地理位置，每次进入小程序时获取
    "userAddress":[         //用户地址信息，用户自己填写
      {
        "addressName": String,    //地址名称（如家、公司）
        "addressDesc": String,    //详细地址
      },
      {...},
      ...
    ]
  }
```

### 3、orders表：记录订单信息。当用户下单时，
```
  //json格式
  order:{
    "_id": int,              //订单id
    "userId": int,          //所属用户id
    "time": long,           //下单时间戳
    "flag": int,            //记录订单状态，已下单、已发货、已收货、已评价
    "totalMoney": double,   //记录购物车所有商品金额
    "totalCount": int,           //记录所有商品数量
    "items":[
      {
        "item_id": int,          //商品id
        "name": String,          //商品名称
        "price": double,         //商品单价，由于商品单价可能会变动，所有要存储购买时单价
        "type": String           //商品类别
        "count": int,            //商品个数
        "itemPrice": double,     //商品单价 * 商品个数
      }，
      {...},
      ...
    ]
  }
```

### 4、articles表


### 5、article_desc表


### 7、comments表
```
  comment:{
    "_id"
    "article_desc_id"
    "user_name"
    "user_image_url"
    "content"
    "time"
    "likes"
  }
```

### 主要事项，要使用腾讯地图api需要到https://lbs.qq.com/qqmap_wx_jssdk/index.html这里注册账号并且填入到首页index.js的开头的key中
