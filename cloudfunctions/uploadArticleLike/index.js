// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('article_desc').doc(event.article_desc_id).update({
    data: {
      likes: _.inc(event.like ? 1 : -1)
    }
  }).catch(err => {
    console.log("uploadArticleLike错误")
  })

  // db.collection('articles').where({ article_desc_id: event.article_desc_id }).update({
  //   data: {
  //     likes: _.inc(event.like ? 1 : -1)
  //   }
  // }).catch(err => {
  //   console.log("uploadArticleLike错误")
  // })
}