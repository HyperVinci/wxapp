// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
/*
  article_desc_id
  content
  time
  user_image_url
  user_name
  (likes)
*/
exports.main = async(event, context) => {

  return await db.collection('comments').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      'article_desc_id': event.article_desc_id,
      'content': event.content,
      'time': event.time,
      'user_image_url': event.user_image_url,
      'user_name': event.user_name,
      'likes': 0
    }
  }).catch(err => {
    console.log("uploadComment失败")
  })
}