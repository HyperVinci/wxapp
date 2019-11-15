// page/component/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    lines: 0,
    // scrollLeft: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://hbimg.huabanimg.com/033a66af25c089ae1508003a98d41610dabae5eb912e-tzYpJ5_fw658'
    }, {
      id: 1,
      type: 'image',
      url: 'https://hbimg.huabanimg.com/3cd837a0052bcc1984ea791ef6f42c96ffba7dc56b57a-ED9esx_fw658',
    }, {
      id: 2,
      type: 'image',
      url: 'https://hbimg.huabanimg.com/11414d1edfc0286dc49398b983897fa6460cd40a90fa6-o4UHIM_fw658'
    }, {
      id: 3,
      type: 'image',
      url: 'https://hbimg.huabanimg.com/6604fbb1ba76fa5f6cc94aa0366c6b30435facad18e5e-SNpPxE_fw658'
    }, ],
    notice: "文麟-助力少数民族艺术文化走进现代生活-公益创业项目",
    Headlines: [{
      id: 1,
      title: "文麟项目简介",
      type: 1
    }, {
      id: 2,
      title: "团队成员简介",
      type: 2
    }, {
      id: 3,
      title: "文创产品分类",
      type: 3
    }, {
      id: 4,
      title: "民族传统科普",
      type: 4
    }],
    iconList: [{
      id: 1,
      icon: 'questionfill',
      color: 'red',
      name: '好奇',
      type: 1
    }, {
      id: 2,
      icon: 'group_fill',
      color: 'orange',
      name: '加入',
      type: 2
    }, {
      id: 3,
      icon: 'shopfill',
      color: 'yellow',
      name: '经营',
      type: 1
    }, {
      id: 4,
      icon: 'discoverfill',
      color: 'olive',
      name: '公益',
      type: 1
    }],
  },
  //设置轮播的时候记录当前的swiper-item
  lineschange: function(e) {
    this.setData({
      lines: e.detail.current
    })
  },
  //每一个公告的点击
  linesclick: function(e) {
    const that = this;
    // console.log(that.data.lines)
    var HeadlineItem = that.data.Headlines[that.data.lines];
    //console.log(HeadlineItem);
    // console.log(HeadlineItem.type);

    wx.navigateTo({
      url: '/page/component/notice/notice',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', HeadlineItem)
        console.log(HeadlineItem.title)
      }
    })

    {
      //后续的跳转使用
      // wx.navigateTo({
      //   url: '/pages/home/doc/index?id=' + HeadlineItem.id,
      // })
    }
  },
  itemckcred: function(e) {
    var that = this;
    console.log(e);
    var item = e.currentTarget.dataset;
    //以下为页面的跳转
    if (item.itemtype === 1) {
      wx.navigateTo({
        url: '/pages/home/doc/index?id=' + item.index
      });
    }
    if (item.itemtype === 2) {
      wx.navigateTo({
        url: '/pages/home/joinus/index?id=' + item.ind
      });
    }
    if (item.itemtype === 3) {
      wx.navigateTo({
        url: '/pages/home/manage/index?id=' + item.index
      });
    }
    if (item.itemtype === 4) {
      wx.navigateTo({
        url: '/pages/home/profit/index?id=' + item.index
      });
    }
  },

  //tab被选择中的事件
  tabSelect(e) {
    console.log(e)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      // scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // cardSwiper
  cardSwiper(e) {
    // console.log(e)
    this.setData({
      cardCur: e.detail.current
    })
  },
  //跳转到文章详情页面
  toArticle: function() {
    wx.navigateTo({
      url: '../article/article',
      success: function(res) {
        console.log("跳转文章详情页面成功")
      },
      fail: function(res) {
        console.log("跳转文章详情页面失败")
      },
      complete: function(res) {},
    })
  },
  //跳转到商品列表
  // toList: function() {
  //   wx.navigateTo({
  //     url: '/page/component/list/list',
  //     success: function(res) {
  //       console.log('商品列表跳转成功')
  //     },
  //     fail: function(res) {
  //       console.log('商品列表跳转失败')
  //     },
  //     complete: function(res) {
  //       console.log('商品列表跳转完成')
  //     },
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLaunch: function(options) {
    //在这里面进行用户的登录验证


  },
  onLoad: function(options) {


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
    var ArticleList = [];
    var thumbImgList = []
    let that = this;
    wx.cloud.callFunction({
      name: "getArticles",
      success: function(res) {
        console.log(res);
        ArticleList = res.result.data;
        for (let i = 0; i < ArticleList.length; i++) {
          thumbImgList.push(ArticleList[i].thumbUrl)
        }
        wx.cloud.getTempFileURL({
          fileList: thumbImgList,
          success: function(res) {
            console.log(res)
            for (let i = 0; i < ArticleList.length; i++) {
              ArticleList[i].thumbUrl = res.fileList[i].tempFileURL
            }
            console.log(ArticleList)
            that.setData({
              'ArticleList': ArticleList
            })
          },
          fail: function(res) {
            console.log(res);
          }
        })
      },
      fail: function(res) {
        console.log(res);
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