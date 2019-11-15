// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
// 返回前五篇文章
exports.main = async (event, context) => {
  return await db.collection('articles').limit(5).get()
}