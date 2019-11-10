// page/component/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getURL: function (fileID) {
    wx.cloud.init({
      env: 'yejh-o2d0r'
    })
    wx.cloud.downloadFile({
      fileID: fileID,
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
        return res.tempFilePath
      },
      fail: err => {
        // handle error
        console.log('getURL失败', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getURL('cloud://yejh-o2d0r.7965-yejh-o2d0r-1300611403/my-image.jpg')
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