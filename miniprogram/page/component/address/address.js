const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabbarBot: app.globalData.tabbar_bottom,
    hidden: true,
    arraylist: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    });
    var that  = this;
    wx.getStorage({
      key: 'addArr',
      success: function(res) {
that.setData({
  arraylist:res.data
})
      },
    })
  },
  add: function() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否要新增收货地址？',
      success: res => {
        if (res.confirm) {
          that.wxaddress();
        } else if (res.cancel) {
          wx.redirectTo({
            url: '/page/component/address/add/add',
          });
        }
      }
    })
  },
  // 编辑用户的地址信息
  editAdd:function(e)
  {
    console.log(e)
    var that = this;
wx.redirectTo({
  url: '/page/component/edit/edit?index='+e.currentTarget.dataset.index,
})
  },
  //获取微信的收货地址
  wxaddress: function() {
    var that = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.address']) {
          wx.chooseAddress({
            success(res) {
              console.log(res);
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

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

  }
})