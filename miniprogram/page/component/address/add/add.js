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
    region: ['广东省', '广州市', '番禺区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data)
wx.showLoading({
  title: '加载中...',
});
wx.getSetting({
  success:res=>{
    if (!res.authSetting['scope.userInfo']) {
      wx.redirectTo({
        //跳转到授权页面
        url: '/pages/component/auth/auth'
      })
  }
}
  });
  },
  // 返回到地址列表展示页面
  returnAddList: function () {
    wx.redirectTo({
      url: '/page/component/address/address',
    })
  },
// 用户改变省市区三级地区时触发的事件,保存到data
RegionChange:function(e)
{
  this.setData({
    region:e.detail.value
  })
},
//保存用户新增的收获到data
  formSubmit:function(e)
  {
    var detailMes =  e.detail.value;
    var that  =this;
    that.setData({
      cusName:detailMes.name,
      cusPhone:detailMes.phone,
      cusAdd:detailMes.descAdd
    })
 wx.navigateBack({
   
 })
  },
  // switch选择框改变时触发,判断是否为默认地址
  switchChange:function(e)
  {
    console.log(e);
    const that  =this;
    that.setData({
      defaultAdd:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
wx.hideLoading();
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