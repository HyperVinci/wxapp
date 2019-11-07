Component({
  properties: {
    name: {
      type: String,
      value: ""
    },
    //弹窗类型：modal:模态框 slot:自定义弹窗
    type: {
      type: String,
      value: ""
    },
    //默认关闭蒙版关闭弹窗
    hidden: {
      type: Boolean,
      value: true
    },
    //弹窗标题
    title: {
      type: String,
      value: '提示'
    },
    //弹窗内容信息
    content: {
      type: String,
      value: ''
    },
    //默认显示取消按钮
    showCancel: {
      type: Boolean,
      value: true
    },
    //取消按钮文字
    cancelTxt: {
      type: String,
      value: '取消'
    },
    //取消按钮字体颜色
    cancelColor: {
      type: String,
      value: ''
    },
    //默认展示确定按钮
    showConfirm: {
      type: Boolean,
      value: true
    },
    //确定按钮文字
    confirmTxt: {
      type: String,
      value: '确定'
    },
    //确定按钮字体颜色
    confirmColor: {
      type: String,
      value: ''
    }
  },
  data: {
    text: "text",
  },
  methods: {
    // 点击蒙版关闭弹窗
    hideModal: function () {
      this.setData({
        hidden: true,
      })
    },
    // 确定按钮单击事件监听
    confirm: function () {
      this.hideModal()
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('confirm', myEventDetail, myEventOption)
    },
    // 取消按钮单击事件监听
    cancel: function () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('cancel', myEventDetail, myEventOption)
    }
  }
})
