// page/component/index/index.js
//引入SDK核心类
var QQMapWX = require('../../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js')
//实例化API核心类
const wxMap = new QQMapWX({
  key: 'QMJBZ-HI3CO-FUVWI-SO3Q7-3LAT7-N4BLG'
});//这里需要去腾讯地图开发平台注册账号获取key填入这里，同时需要配置request合法域名
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //用户信息对象
    hasUserInfo: false, //是否已经存储了用户的信息
    hiddenReAuthorizePop: true, //隐藏重新授权确认弹窗
    latitude: "", //维度，浮点数
    longitude: "", //经度，浮点数
    content: "本活动需要获取位置才可以参加"
  },
  //获取到用户信息并保存到data中
  onGotUserInfo: function(e) {
    var that = this;
    //需要点击登录按钮才会触发
    console.log(e)

    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log("data", that.data); //这里会在页面加载完成之后才会执行函数，后续可能要增加回调函数或者写入本地缓存，下次用户无需要写按钮
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //调用getUserMes云函数


    var that = this;
    that.getLocation(); //调用获取用户的地理位置
    //当组件不存在时，提示用户更新微信版本
    if (!wx.canIUse('button.open-type.getUserInfo')) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，请升级到最新版微信版本后重试',
      })
    }
  },
//获取用户经纬度的函数
  getLocation: function() {
    var self = this;
    wx.getLocation({
      type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的坐标，可传入'gcj02'
      altitude: true, //传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
      success: function(res) {
        var latitude = res.latitude; // 纬度，浮点数
        var longitude = res.longitude; // 经度，浮点数
        self.setData({
          latitude: latitude,
          longitude: longitude
        });
        //调用腾讯地图api传入经纬度获取详细的市政街道地址
        wxMap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            console.log(res);
            self.setData({
              location: res.result.address
            })
          },
          fail: function(res) {
            console.log(res);
          }
        })
      },
      fail: function(res) {
        //未授权就弹出弹窗提示用户重新授权
        self.reAuthorize();
      }
    });
  },
  /**
   * 1.2 重新授权按钮点击事件
   * click event   
   */
  openLocationSetting: function() {
    var self = this;
    //先获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success: function(res) {
        if (res.authSetting && !res.authSetting["scope.userLocation"]) {
          //未授权则打开授权设置界面
          wx.openSetting({
            success: function(res) {
              if (res.authSetting && res.authSetting["scope.userLocation"]) {
                self.getLocation();
                self.setData({
                  hiddenReAuthorizePop: true
                })
                wx.showToast({
                  title: '你已经授权位置信息',
                  icon: 'none'
                })
              } else {
                //未授权就弹出弹窗提示用户重新授权 
                self.reAuthorize();
              }
            }
          })
        } else {
          //授权则重新获取位置新（授权设置界面返回首页，首页授权二确弹窗未关闭）
          self.getLocation();
        }
      }
    });
  },
  reAuthorize: function() {
    var self = this;
    self.setData({
      hiddenReAuthorizePop: false
    })
  },

  //跳转到商品列表
  toList: function () {
    wx.navigateTo({
      url: '/page/component/list/list',
      success: function (res) { console.log('商品列表跳转成功') },
      fail: function (res) { console.log('商品列表跳转失败') },
      complete: function (res) { console.log('商品列表跳转完成') },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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