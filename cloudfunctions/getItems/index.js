// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
// 接收开始索引，一次返回十条记录
exports.main = async (event, context) => {
  const index = event.index
  return await db.collection('items').skip(index).get()
}