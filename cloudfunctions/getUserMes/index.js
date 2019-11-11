// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext =  cloud.getWXContext()
  let { OPENID, APPID, UNIONID } =  await cloud.getWXContext()
  //返回用户的openid

  return await db.collection('cart').doc('my_cart').get();//获取购物车的所有物品
}

