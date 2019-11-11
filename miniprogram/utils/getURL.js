function getURL(fileID){
  wx.cloud.downloadFile({
    fileID: fileID,
    success: res => {
      // get temp file path
      console.log(res.tempFilePath)
      return res.tempFilePath
    },
    fail: err => {
      // handle error
      console.log('getURL失败', err)
    }
  })
}


module.exports.getURL = getURL
