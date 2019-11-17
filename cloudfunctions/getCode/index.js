// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//得到小程序码
exports.main = async (event, context) => {
  let qrResult = await cloud.openapi.wxacode.get({
    path: "page/component/user/user",
    width: 430
  });
  console.log(qrResult)
  return await cloud.uploadFile({
    cloudPath: "qr.jpg",
    fileContent: qrResult.buffer
  })
}