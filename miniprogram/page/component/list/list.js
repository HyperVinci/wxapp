// page/component/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    items:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("获取items", this.data.items)
    wx.cloud.callFunction({
      name: "getItems",
      data: {

      },
      success: res =>{
        console.log(res.result.data)
        that.setData({
          items: res.result.data
        })
        console.log("获取items成功", that.data.items)
      },
      fail: res=>{
        console.log("获取items失败", that.data.items)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})