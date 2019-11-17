// page/component/user/user.js
//引入SDK核心类
var QQMapWX = require('../../../qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js')
//实例化API核心类
const wxMap = new QQMapWX({
  key: 'QMJBZ-HI3CO-FUVWI-SO3Q7-3LAT7-N4BLG'
}); //这里需要去腾讯地图开发平台注册账号获取key填入这里，同时需要配置request合法域名
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
    content: "本活动需要获取位置才可以参加",
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  //获取到用户信息并保存到data中
  onGotUserInfo: function(e) {
    var that = this;
    //需要点击登录按钮才会触发
    // console.log(e)

    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorage({
      key: 'userInfo',
      data: JSON.stringify(that.data.userInfo),
    });
    wx.setStorage({
      key: 'hasUserInfo',
      data: that.data.hasUserInfo,
    })

    console.log("data", that.data); //这里会在页面加载完成之后才会执行函数，后续可能要增加回调函数或者写入本地缓存，下次用户无需要写按钮
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var that = this;
    //一种友好提示用户，正在加载中
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();

    function numDH() {
      if (i < 20) {
        setTimeout(function() {
          that.setData({
            visitTotal: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(999),
          forksCount: that.coutNum(8888),
          visitTotal: that.coutNum(77777)
        })
      }
    }

    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        const userIn = JSON.parse(res.data);
        that.setData({
          userInfo: userIn
        })
      }
    });
    wx.getStorage({
      key: 'hasUserInfo',
      success: function(res) {
        that.setData({
          hasUserInfo: res.data
        })
      }
    });

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
  toPoster:function()
  {
wx.navigateTo({
  url: '../poster/poster?posterImageUrl=' +"cloud://zizxzy-rfzn1.7a69-zizxzy-rfzn1-1300589022/author.jpg",
  success:res=>{
    console.log(res);
  },
  fail:res=>{
    console.log(res);
  }
})
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
            // console.log(res);
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

  //随机计算用户的积分，收益，保证金，后期应该改为动态从数据库中获取
  coutNum(e) {
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },
  // CopyLink(e) {

  // },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // showQrcode() {

  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading(); //隐藏
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that  =this;

    //获取个人中心波浪背景图
    wx.cloud.callFunction({
      name: "getImgUrl",
      data: {
        id: "wave"
      },
      success: function (res) {
        that.setData({
          waveImg: res.result.data.ImageUrl
        })
      }
    })
    wx.cloud.callFunction({
      name: "getImgUrl",
      data: {
        id: "background"
      },
      success: function (res) {
        wx.cloud.getTempFileURL({
          fileList: new Array(res.result.data.ImageUrl),
          success: function (res) {
            // console.log(res)
            that.setData({
              bgImg: res.fileList[0].tempFileURL
            })
          },
          fail: res => {
            console.log(res)
          }
        })
      },
      fail: res => {
        console.log(res)
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