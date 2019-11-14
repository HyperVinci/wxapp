// miniprogram/page/article/article.js
var WxParse = require('../../../wxParse/wxParse.js');

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: null,
    like: false,
    comments: null,
    userInfo: null,
    imgList: [],
    commentUploadLoding: false,
    submitStop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    wx.showLoading({
      title: '正在加载中',
    })
    wx.cloud.callFunction({
      name: "clickArticle",
      data: {
        article_desc_id: "1"
      }
    }).catch()

    wx.cloud.callFunction({
      name: "getArticleDescById",
      data: {
        article_desc_id: "1"
      },

    }).then(res => {
      const data = res.result.data
      console.log(data)
      // 处理时间
      data.time = data.time.substr(0, 10) + ' ' + data.time.substr(11, 5)

      //处理点赞
      wx.getStorage({
        key: data._id + '_like',
        success: function(res) {
          console.log(res)
          that.setData({
            like: res.data
          })
        },
      })

      that.setData({
        article: data
      })

      this.getComments(data._id)
      WxParse.wxParse('content', 'html', data.html, that);
      console.log(this.data.article)
    })

    //得到用户信息
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        const userIn = JSON.parse(res.data);
        console.log("用户信息", userIn)
        that.setData({
          userInfo: userIn
        })
      }
    });


  },

  getComments: function(article_desc_id) {
    const that = this
    wx.cloud.callFunction({
      name: "getCommentsByArticleId",
      data: {
        article_desc_id: article_desc_id
      }
    }).then(res => {
      var commments = res.result.data
      for (var i = 0; i < commments.length; ++i) {
        commments[i].time = commments[i].time.substr(0, 10) + ' ' + commments[i].time.substr(11, 5)
      }

      console.log(commments)
      that.setData({
        comments: commments
      })
    })
  },

  uploadLike: function() {
    console.log(this.data.article._id)
    wx.cloud.callFunction({
        name: "uploadArticleLike",
        data: {
          article_desc_id: this.data.article._id,
          like: this.data.like
        }
      })
      .catch(err => {
        console.log("uploadLike出错", err)
      })
  },

  like: function() {
    var like = this.data.like
    if (like) {
      like = false
    } else {
      like = true
    }
    this.setData({
      like: like
    })
    wx.setStorage({
      key: this.data.article._id + '_like',
      data: like
    });
    this.uploadLike()
  },

  uploadComment: function() {
    const that = this
    const content = this.data.textareaValue
    if (!this.data.submitStop && content && content.length > 3) {
      that.setData({
        commentUploadLoding: true,
        submitStop: true,

      })

      const time = new Date()
      wx.cloud.callFunction({
        name: "uploadComment",
        data: {
          'article_desc_id': this.data.article._id,
          'content': content,
          'time': time,
          'user_image_url': this.data.userInfo.avatarUrl,
          'user_name': this.data.userInfo.nickName
        }
      }).then(res => {
        console.log(res.result)
        that.setData({
          commentUploadLoding: false
        })
        wx.showToast({
          title: '上传成功'
        })
        //设置等待时间
        setTimeout(function () {
          that.setData({
            submitStop: false
          })
        }, 5000)
      })
    }else if(this.data.submitStop){
      wx.showToast({
        title: '点击过于频繁',
        icon: 'none'
      })
    }else if(content == null || content.length <= 3){
      wx.showToast({
        title: '评论内容过短',
        icon: 'none'
      })
    }
  },

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  textareaInput(e) {
    this.setData({
      textareaValue: e.detail.value
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