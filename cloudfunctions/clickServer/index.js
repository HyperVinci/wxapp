// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
var request  =require('request')
var buf = Buffer.from('cloud://zizxzy-rfzn1.7a69-zizxzy-rfzn1-1300589022/author.jpg','utf8')
// 云函数入口函数,接受客服消息，并进行处理之后返回响应的数据
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
console.log(event);
cloud.openapi.customerServiceMessage.uploadTemMedia({
  type:"image",
  media:{
    contentType:"image/png",
    value:buf
  }
})
if (event.Content=="zy")
{
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: '收到',
    },
  })
  return "success"
}
if(event.Content == 'hello')
{
  await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'image',
    image: {
      media_id: '吃吃',
    },
  })
  return "success"
}
}