const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabbarBot: app.globalData.tabbar_bottom,
    hidden: true,
    defaultAdd: false,
    region: ['广东省', '广州市', '番禺区']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    wx.showLoading({
      title: '加载中...',
    });
    // console.log(options);
    var that = this;
    wx.getStorage({
      key: 'addArr',
      success: function(res) {
        that.setData({
          address: res.data[options.index],
          index: options.index
        })
      },
    })
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            //跳转到授权页面
            url: '/pages/component/auth/auth'
          })
        }
      }
    });
  },
  // 用户改变省市区三级地区时触发的事件,保存到data
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  switchChange: function(e) {
    // console.log(e);
    const that = this;
    that.setData({
      defaultAdd: e.detail.value
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
  // 用户改变省市区三级地区时触发的事件,保存到data
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  //保存用户新增的收获到data
  formSubmit: function(e) {
    var detailMes = e.detail.value;
    var that = this;
    var len = detailMes.phone.length;
    // console.log(detailMes.phone)
    let mobile = /^1\d{10}$/
    //正则表达式验证,输入格式有误，弹出modal提示
    if (!(len == 11 &&mobile.test(detailMes.phone)))
    {
      wx.showModal({
        title: '提示',
        content: '你输入的电话号码格式有误，请重新输入',
        showCancel: false,
        success(res) {
          if (res.confirm) {
          }
        }
      })
      return ;
    }

      let addDesc = {
        cusName: detailMes.name,
        cusPhone: detailMes.phone,
        cusAdd: detailMes.descAdd,
        region: that.data.region,
        defaultAdd: that.data.defaultAdd
      }

      app.globalData.addArr[that.data.index] = addDesc
      // console.log(app.globalData.addArr)
      wx.setStorage({
        key: 'addArr',
        data: app.globalData.addArr,
        success: function (res) {
          console.log("设置地址本地缓存成功");
        }
      })
      wx.navigateBack({

      })
  },
  // 删除该用户的这个地址
  deleteAdd: function(options) {
    // console.log(options);
    // 查询本地缓存并将其中的数据删除，最后跳转回页面
    app.globalData.addArr.splice(options.currentTarget.dataset.delindex, 1)
    wx.setStorage({
      key: 'addArr',
      data: app.globalData.addArr,
    })
    // 删除完成之后返回到地址列表框
    wx.navigateBack({
      
    })
  },
  // 返回到地址列表页面
  returnAddList: function() {
    wx.navigateBack({
      
    })
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