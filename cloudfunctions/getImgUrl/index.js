// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数,获取常用图片url
exports.main = async (event, context) => {
 return await db.collection("frequentImgs").doc(event.id).get()
}