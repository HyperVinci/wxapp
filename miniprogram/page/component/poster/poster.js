  // page/component/poster/poster.js
  const app = getApp()

  var WxParse = require('../../../wxParse/wxParse.js');
  Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    eventGetImage: function(event) {
      console.log(event)
      console.log(event.detail);
      this.setData({
        poster: event.detail.tempFilePath,
      })
    },
    saveToAlbum: function() {
      {
        const _this = this;
        // 获取用户是否开启用户授权相册
        wx.getSetting({
          success(res) {
            // 如果没有则获取授权
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  _this.saveImg();
                },
                fail() {
                  // 如果用户拒绝过或没有授权，则再次打开授权窗口
                  // （ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
                  wx.showModal({
                    title: '获取权限失败',
                    content: '是否打开设置页，允许小程序保存图片到你的相册',
                    success: () => {
                      wx.openSetting({
                        success(sRes) {
                          if (sRes.authSetting['scope.writePhotosAlbum']) {
                            setTimeout(() => {
                              _this.saveImg();
                            }, 200);
                          }
                        },
                      });
                    },
                  });
                },
              });
            } else {
              // 有则直接保存
              _this.saveImg();
            }
          },
        });
          wx.showLoading({
            title: '正在保存中...', // 提示的内容,
            mask: true, // 显示透明蒙层，防止触摸穿透,
          });

          wx.saveImageToPhotosAlbum({
            filePath: _this.data.poster,
            success() {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000,
                mask: true,
              });
            },
            fail() {
              wx.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 2000,
                mask: true,
              });
            },
          });
        }
      },
    saveImg:function() {
      const {
        tempImgPath
      } = this.data;
    },
    previewPoster:function(e)
    {
  var current   =  this.data.poster;
  wx.previewImage({
    urls: [current],
    current:current,
    fail:res=>{
      console.log(res);
    }
  })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(app.globalData)
      var that = this;
      that.setData({
        painting: {
          width: 320,
          height: 568,
          views: [{
              type: 'image',
              url: app.globalData.bgPoster,
              top: 0,
              left: 0,
              width: 320,
              height: 557
            },
            {
              type: 'image',
              url: app.globalData.userInfo.avatarUrl,
              top: 27.5,
              left: 29,
              width: 55,
              height: 55
            },
            {
              type: 'text',
              content: app.globalData.userInfo.nickName,
              fontSize: 16,
              color: '#402D16',
              textAlign: 'left',
              top: 33,
              left: 96,
              bolder: true
            },
            {
              type: 'text',
              content: '一起来感受民族传统文化吧！',
              fontSize: 15,
              color: '#563D20',
              textAlign: 'left',
              top: 59.5,
              left: 96
            },
            {
              type: 'image',
              url: 'http://ww1.sinaimg.cn/large/006GbN2Egy1g914ecopifj30j60srq3s.jpg',
              top: 116,
              left: 52.5,
              width: 150,
              height: 210
            },
            {
              type: 'image',
              url: 'http://ww1.sinaimg.cn/large/006GbN2Egy1g91463z539j30e80e83zl.jpg',
              top: 413,
              left: 45,
              width: 98,
              height: 98
            },
            {
              type: 'text',
              content: '宋定窑白釉平底-繁花若素',
              fontSize: 16,
              lineHeight: 21,
              color: '#383549',
              textAlign: 'left',
              top: 356,
              left: 44,
              width: 287,
              MaxLineNumber: 2,
              breakWord: true,
              bolder: true
            },
            {
              type: 'text',
              content: '长按保存到相册,点击可预览海报',
              fontSize: 16,
              color: '#383549',
              textAlign: 'left',
              top: 448,
              left: 155.5,
              lineHeight: 20,
              MaxLineNumber: 2,
              breakWord: true,
              width: 155
            }
          ]
    }
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
