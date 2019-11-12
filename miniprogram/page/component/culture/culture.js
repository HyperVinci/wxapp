// page/component/culture/culture.js
//引入SDK核心类
const app = getApp();
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
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hiddenReAuthorizePop: true, //隐藏重新授权确认弹窗
    latitude: "", //维度，浮点数
    longitude: "", //经度，浮点数
    content: "本活动需要获取位置才可以参加",
    imageList:[
      {
        name:"青岩古镇",
        imageUrl:"https://hbimg.huabanimg.com/4a674fb3317cae10e86f37203674359866999f896a250-m9CMpR_fw658"
      },
      {
        name:"西江千户苗寨",
        imageUrl:"https://hbimg.huabanimg.com/033a66af25c089ae1508003a98d41610dabae5eb912e-tzYpJ5_fw658"
      },
      {
        name:"色达佛学院",
        imageUrl:"https://hbimg.huabanimg.com/d7d5d6175aba27b1c8b27baa7f883b76c4819bc826048c-g5dioU_fw658"
      }
    ],
    list: [],
    nation:[
      "汉族",
      "壮族",
      "满族",
      "回族",
      "苗族",
      "维吾尔族",
      "土家族",
      "彝族",
      "蒙古族",
      "藏族",
      "布依族",
      "侗族",
      "瑶族",
      "朝鲜族",
      "白族",
      "哈尼族",
      "哈萨克族",
      "黎族",
      "傣族",
      "畲族",
      "傈僳族",
      "仡佬族",
      "东乡族",
      "高山族",
      "拉祜族",
      "水族",
      "佤族",
      "纳西族",
      "羌族",
      "土族",
      "仫佬族",
      "锡伯族",
      "柯尔克孜族",
      "达斡尔族",
      "景颇族",
      "毛南族",
      "撒拉族",
      "布朗族",
      "塔吉克族",
      "阿昌族",
      "普米族",
      "鄂温克族",
      "怒族",
      "京族",
      "基诺族",
      "德昂族",
      "保安族",
      "俄罗斯族",
      "裕固族",
      "乌孜别克族",
      "门巴族",
      "鄂伦春族",
      "独龙族",
      "塔塔尔族",
      "赫哲族",
      "珞巴族"
    ],
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中...稍等片刻',
      mask:true
    });
    let list  = [{}];
    for(let i=0;i<56;i++)
    {
      list[i]={};
      list[i].name =that.data.nation[i] ;
      list[i].id  = i;
    }
    that.setData({
      list:list,
      listCur:list[0]
    })
    
    that.getLocation(); //调用获取用户的地理位置
    //当组件不存在时，提示用户更新微信版本
    if (!wx.canIUse('button.open-type.getUserInfo')) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，请升级到最新版微信版本后重试',
      })
    }
  },
  //导航切换时相应的数据展示内容也要切换
  tabSelect:function(e)
  {
    // console.log(e);
    //更新事件的内容
    this.setData({
      TabCur:e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop:(e.currentTarget.dataset.id-1)*50
    })
  },
  //滑动scroll-view的时候触发的事件
  VerticalMain:function(e)
  {
let that = this;
let list  = that.data.list;
let tabHeight  =0;
if(that.data.load)
{
  for (let i = 0; i < list.length; i++) {
    let view = wx.createSelectorQuery().select("#main-" + list[i].id);
    view.fields({
      size: true
    }, data => {
      list[i].top = tabHeight;
      tabHeight = tabHeight + data.height;
      list[i].bottom = tabHeight;
    }).exec();
  }
  that.setData({
    load: false,
    list: list
  })  
}
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }

  },
  //获取用户经纬度的函数
  getLocation: function () {
    var self = this;
    wx.getLocation({
      type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的坐标，可传入'gcj02'
      altitude: true, //传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
      success: function (res) {
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
          success: function (res) {
            // console.log(res);
            self.setData({
              location: res.result.address
            })

          },
          fail: function (res) {
            console.log(res);
          }
        })
      },
      fail: function (res) {
        //未授权就弹出弹窗提示用户重新授权
        self.reAuthorize();
      }
    });
  },
  /**
   * 1.2 重新授权按钮点击事件
   * click event   
   */
  openLocationSetting: function () {
    var self = this;
    //先获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success: function (res) {
        if (res.authSetting && !res.authSetting["scope.userLocation"]) {
          //未授权则打开授权设置界面
          wx.openSetting({
            success: function (res) {
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
  reAuthorize: function () {
    var self = this;
    self.setData({
      hiddenReAuthorizePop: false
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