// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 推送订单信息
exports.main = async (event, context) => {
  console.log(event)
  try {
    const { OPENID } = cloud.getWXContext();
    const result = await db.collection('orders').add({
      data:{
        touser: OPENID,
        page: 'page/component/order/order',    // 订阅消息卡片点击后会打开小程序的哪个页面
        data: event.data,
        templateId: 'iClEtI_1cJOdp6E-W8j_4gMJsDTahSmHQZlMZWcatO4',
        done: false, // 消息发送状态设置为 false
      }
     
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}