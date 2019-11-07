// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  console.log(db.collection('items').doc('cd415c85-ad4b-48d0-88d1-df0e04a36e9b').get()) 
  return await db.collection('items').doc('cd415c85-ad4b-48d0-88d1-df0e04a36e9b').get()
}