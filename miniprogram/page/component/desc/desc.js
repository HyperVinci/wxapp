// pages/detail/detail.js
// const ajax = require('../../utils/ajax.js');
// const utils = require('../../utils/util.js');
const app = getApp();


// var imgUrls = [];
// var detailImg = [];
var item_desc_id = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    isLike: false,
    showDialog: false,
    goods: null,
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
  },
  //预览图片
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    // this.setData({
    //   isLike: !this.data.isLike
    // });
    // ajax.request({
    //   method: 'GET',
    //   url: 'collection/addShopCollection?key=' + utils.key + '&goodsId=' + goodsId,
    //   success: data => {
    //     console.log("收藏返回结果：" + data.message)
    //     wx.showToast({
    //       title: data.message,
    //       icon: 'success',
    //       duration: 2000
    //     });
    //   }
    // })
  },
  // 跳到购物车
  toCar() {
    wx.navigateTo({
      url: '../cart/cart',
    })
  },
  // 立即购买
  immeBuy() {
    // wx.showToast({
    //   title: '购买成功',
    //   icon: 'success',
    //   duration: 2000
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    item_desc_id = options.item_desc_id;
    console.log('item_desc_id:' + item_desc_id);
    //加载商品详情
    that.goodsInfoShow();
  },
  // getURL: function (fileID) {
  //   wx.cloud.init({
  //     env: 'yejh-o2d0r'
  //   })
  //   wx.cloud.downloadFile({
  //     fileID: fileID,
  //     success: res => {
  //       // get temp file path
  //       console.log(res.tempFilePath)
  //       return res.tempFilePath
  //     },
  //     fail: err => {
  //       // handle error
  //       console.log('getURL失败', err)
  //     }
  //   })
  // },
  goodsInfoShow: function(success) {
    var that = this;
    wx.cloud.callFunction({
      name: "getItemDescById",
      data: {
        item_desc_id: item_desc_id
      }
    }).then(data => {
      var goodsItem = data.result.data;
      goodsItem.itemMoney = goodsItem.price
      goodsItem.count = 1
      that.setData({
        goods: goodsItem
      })

    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * sku 弹出
   */
  toggleDialog: function() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
   * sku 关闭
   */
  closeDialog: function() {
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
  /* 减数 */
  delCount: function(e) {
    console.log("刚刚您点击了减1");
    var count = this.data.goods.count;
    var goods = this.data.goods
    // 商品总数量-1
    if (count > 1) {
      goods.count--;
    }
    // 将数值与状态写回  
    this.setData({
      goods: goods
    });
    this.priceCount();
  },
  /* 加数 */
  addCount: function(e) {
    console.log("刚刚您点击了加1");
    var count = this.data.goods.count;
    var goods = this.data.goods
    // 商品总数量+1  
    if (count < 10) {
      goods.count++;
    }
    // 将数值与状态写回  
    this.setData({
      goods: goods
    });
    this.priceCount();
  },
  //价格计算
  priceCount: function(e) {
    this.data.goods.itemMoney = this.data.goods.price * this.data.goods.count;
    this.setData({
      goods: this.data.goods
    })
  },
  /**
   * 加入购物车
   */
  addCar: function(e) {
    var goods = this.data.goods;
    goods.isSelect = false;
    var count = this.data.goods.count;

    var name = this.data.goods.name;
    if (name.length > 13) {
      goods.name = name.substring(0, 13) + '...';
    }

    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart') || [];
    console.log("arr,{}", arr);
    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        if (arr[j].item_desc_id == item_desc_id) {
          // 相等的话，给count+1（即再次添加入购物车，数量+1）  
          arr[j].count = arr[j].count + 1;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          //关闭窗口
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          this.closeDialog();
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('cart', arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      this.closeDialog();
      return;
    } catch (e) {
      console.log(e)
    }
  },

  // //用户购买推送订单消息
  // buy() {
  //   const that = this
  //   wx.requestSubscribeMessage({
  //     tmplIds: ['iClEtI_1cJOdp6E-W8j_4gMJsDTahSmHQZlMZWcatO4'],
  //     success(res) {
  //       console.log(res)
  //       if (res.errMsg === 'requestSubscribeMessage:ok') {
  //         wx.cloud.callFunction({
  //           name: "subscribeOrder",
  //           data: {
  //             data: that.data.goods,
  //             time: new Date()
  //           },
  //         }).then(res => {
  //           console.log("发送消息成功", res)
  //           wx.showToast({
  //             title: '订阅成功',
  //             icon: 'success',
  //             duration: 2000,
  //           });
  //         }).catch(err => {
  //           console.log("发送消息失败", err)
  //           wx.showToast({
  //             title: '订阅失败',
  //             icon: 'success',
  //             duration: 2000,
  //           });
  //         })
  //       }
  //     },
  //     fail(err) {
  //       console.log(err)
  //     }
  //   })

  // }

})