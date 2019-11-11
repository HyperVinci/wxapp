// pages/home/home.js

var sectionData = [];
sectionData['newGoods'] = [];
var ifLoadMore = true;
var page = 1; //默认第一页
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbars: null,
    currentTab: 0,
    banners: null,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    menus: null,
    brands: null,
    hidden: false,
    menus: [
      {
        "id": 1,
        "menuName": "自营",
        "imgUrl": "https://m.360buyimg.com/mobilecms/jfs/t7930/307/1143783545/25656/a167df62/599aa7feN91f03e0b.png",
        "clickUrl": null,
        "seq": 1
      }, {
        "id": 2,
        "menuName": "新人专享",
        "imgUrl": "https://m.360buyimg.com/babel/s132x132_jfs/t10762/151/321904602/14728/4c836625/59cc69f9Na24dd977.png",
        "clickUrl": null,
        "seq": 2
      }, {
        "id": 3,
        "menuName": "全球购",
        "imgUrl": "https://m.360buyimg.com/mobilecms/jfs/t5965/339/3633548361/13799/cd4d0416/5954cf81N3294a71c.png",
        "clickUrl": null,
        "seq": 3
      }, {
        "id": 4,
        "menuName": "物流查询",
        "imgUrl": "https://m.360buyimg.com/mobilecms/jfs/t5842/205/151189300/13247/a6de2d/591d94edNc42fb94d.png",
        "clickUrl": null,
        "seq": 4
      }, {
        "id": 5,
        "menuName": "领券",
        "imgUrl": "https://m.360buyimg.com/mobilecms/jfs/t5872/340/146804759/11154/f4ae1409/591d94c4N79a488cc.png",
        "clickUrl": null,
        "seq": 5
      }, {
        "id": 6,
        "menuName": "拼团",
        "imgUrl": "https://m.360buyimg.com/mobilecms/jfs/t17509/324/1413437865/15080/f7029302/5ac98982Nf9710996.png",
        "clickUrl": null,
        "seq": 6
      }, {
        "id": 7,
        "menuName": "家居",
        "imgUrl": "https://m.360buyimg.com/mobilecms/jfs/t5656/351/153181074/12227/e35aa8d/591d9456Naa85e195.png",
        "clickUrl": null,
        "seq": 7
      }]
  },
  // 导航切换监听
  navbarTap: function(e) {
    console.debug(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //加载navbar导航条
    that.navbarShow();
    //加载banner轮播
    that.bannerShow();
    //加载menu分类导航菜单
    that.menuShow();
    //加载新品特卖
    that.brandShow();

    //加载福利专场
    that.newGoodsShow();
  },
  navbarShow: function(success) {
    var that = this;
    that.setData({
      navbars: [{
        "id": 1,
        "navbarName": "今日推荐",
        "clickUrl": null,
        "seq": 1
      }, {
        "id": 2,
        "navbarName": "护肤",
        "clickUrl": null,
        "seq": 2
      }, {
        "id": 3,
        "navbarName": "母婴",
        "clickUrl": null,
        "seq": 3
      }, {
        "id": 4,
        "navbarName": "家居",
        "clickUrl": null,
        "seq": 4
      }, {
        "id": 5,
        "navbarName": "国际",
        "clickUrl": null,
        "seq": 5
      }]
    })
  },
  bannerShow: function(success) {
    var that = this;
    wx.cloud.callFunction({
      name: "getBanners",
      success: data => {
        that.setData({
          banners: data.result.data
        })
        console.log(data.result)
      }
    })
  },
  menuShow: function(success) {
    // var that = this;
    // ajax.request({
    //   method: 'GET',
    //   url: 'home/menus?key=' + utils.key,
    //   success: data => {
    //     that.setData({
    //       menus: data.result
    //     })
    //     console.log(data.result)
    //   }
    // })
  },
  brandShow: function(success) {
    // var that = this;
    // ajax.request({
    //   method: 'GET',
    //   url: 'activity/brands?key=' + utils.key + '&type=temai&page=1&size=5',
    //   success: data => {

    //     that.setData({
    //       brands: data.result.list
    //     })
    //     console.log("brands：" + data.result.list)
    //   }
    // })
  },
  newGoodsShow: function(success) {
    var that = this;
    wx.cloud.callFunction({
      name: "getItems",
      data: {
        index: (page - 1) * 10
      },
      success: data => {
        var newGoodsData = data.result.data
        page += 1;
        if (ifLoadMore) {
          //加载更多
          if (newGoodsData.length > 0) {
            console.log(newGoodsData)
            //日期以及title长度处理
            for (var i in newGoodsData) {
              //商品名称长度处理
              var name = newGoodsData[i].name;
              if (name.length > 26) {
                newGoodsData[i].name = name.substring(0, 23) + '...';
              }
            }
            sectionData['newGoods'] = sectionData['newGoods'].concat(newGoodsData);

          } else {
            ifLoadMore = false;
            this.setData({
              hidden: true
            })
            wx.showToast({
              title: '暂无更多内容！',
              icon: 'loading',
              duration: 2000
            })
          }

        }
        that.setData({
          newGoods: sectionData['newGoods'],
          // isHideLoadMore: true
        });
        wx.stopPullDownRefresh(); //结束动画
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉");
    var that = this;
    console.log('加载更多');
    if (ifLoadMore != null) {
      that.newGoodsShow();

    }
  },
  show: function(e) {
    // var that = this;
    // var goodsId = e.currentTarget.dataset.goodsid;
    // console.log('goodsId:' + goodsId);
    // //新增商品用户点击数量
    // that.goodsClickShow(goodsId);
    // //跳转商品详情
    // wx.navigateTo({
    //   url: '../detail/detail?goodsId=' + goodsId
    // })
  },
  catchTapCategory: function(e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log('goodsId:' + goodsId);
    //新增商品用户点击数量
    that.goodsClickShow(goodsId);
    //跳转商品详情
    wx.navigateTo({
      url: '../desc/desc?item_desc_id=' + goodsId
    })
  },
  goodsClickShow(goodsId) {
    // console.log('增加商品用户点击数量');
    // var that = this;
    // ajax.request({
    //   method: 'GET',
    //   url: 'goods/addGoodsClickRate?key=' + utils.key + '&goodsId=' + goodsId,
    //   success: data => {
    //     console.log("用户点击统计返回结果：" + data.message)
    //   }
    // })
  },
})





// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     isLoding: true,

//     items: []

//   },


//   toItemDesc:function(e){
//     console.log(e)
//     const index = e.currentTarget.id
//     const item = this.data.items[index]
//     wx.cloud.callFunction({
//       name: "getItemDescById",
//       data: {
//         item_desc_id: item.item_desc_id
//       },
//       success: res => {
//         const data = res.result.data
//         console.log(data)
//         const jsonstr = JSON.stringify(data)
//         wx.navigateTo({
//           url: '../desc/desc?item=' + jsonstr,
//           success: res => {
//             console.log('todesc跳转成功')
//           },
//           fail: res => {
//             console.log('todesc跳转失败')
//           }
//         })
//       },
//       fail: res => {
//         wx.showToast({
//           title: '获取商品详情失败，请重试或联系管理员'
//         })
//       }
//     })

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function(options) {
//     wx.showLoading({
//       title: 'loding',
//     })
//     var that = this;
//     console.log("获取items", this.data.items)
//     wx.cloud.callFunction({
//       name: "getItems",
//       data: {

//       },
//       success: res => {
//         console.log(res.result.data)
//         var items = res.result.data
//         for (let i = 0; i < items.length; ++i) {
//           items[i].count = 0
//           items[i].itemMoney = 0.0
//         }
//         that.setData({
//           items: items,
//           isLoding: true
//         })
//         console.log("获取items成功", that.data.items)
//       },
//       fail: res => {
//         wx.showToast({
//           title: '获取商品详情失败，请重试或联系管理员'
//         })
//       },
//       complete: res=>{
//         wx.hideLoading()
//       }
//     })
//   },

//   tocart: function() {
//     var selected = []
//     const items = this.data.items
//     for (let i = 0; i < items.length; ++i) {
//       if (items[i].count > 0) {
//         selected.push(items[i])
//       }
//     }
//     const q = JSON.stringify(selected)
//     wx.navigateTo({
//       url: '../cart/cart?items=' + q,
//       success: res => {
//         console.log('tocart跳转成功')
//       },
//       fail: res => {
//         console.log('tocart跳转失败')
//       }
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function() {

//   }
// })