// page/component/notice/notice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    title: "",
    posterUrl: "",
    poster_id: "",
    Load:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showLoading({
    //   title: '加载中...',
    // })
    const db = wx.cloud.database()
    const eventChannel = this.getOpenerEventChannel()
    var that = this
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
      that.setData({
          title: data.title,
          poster_id: data.id
        })
    })
    //设置当前页面的标题
    wx.setNavigationBarTitle({
      title: that.data.title
    })
    console.log(that.data.poster_id)
    //获取图片url
    wx.cloud.callFunction({
      name: "getPosterUrl",
      data: {
        poster_id: that.data.poster_id
      },
    }).then(res => {
      console.log(res.result.data[0].url)
      that.setData({
        posterUrl: res.result.data[0].url
      })
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    that.setData({
      Load:false
    })
    // wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that  =this;
    wx.cloud.callFunction({
      name: "getImgUrl",
      data: {
        id: "loading"
      },
      success: function (res) {
        that.setData({
          loadingImg: res.result.data.ImageUrl
        })
      }
    })
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