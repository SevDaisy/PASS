module.exports = {
  userlogin: userlogin,
  personalInfo: personalInfo
}
const app = getApp()
function userlogin(userInfo){
  const d = wx.getStorageSync('userInfo')
  if(!d){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        wx.request({
          method: 'POST',
          dataType: 'json',
          url: 'https://app.morii.top/login',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code,
            nickname: userInfo.nickName,
            gender: userInfo.gender
          },
          success: res=> {
            if (this.userloginCallback) {
              this.userloginCallback(res)
            }
            wx.setStorageSync('userInfo', res.data)
          }
        })
        
      }
    })
  }
  
}
// 上传个人信息
function personalInfo(userdata) {
  wx.request({
    method: 'POST',
    dataType: 'json',
    url: 'https://app.morii.top/personalInfo',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      id : userdata['id'],
      birthday :userdata['birthday'],
      gender: userdata['gender']
    },
    success: function (res) {
      // wx.setStorageSync('userInfo', res.data)
    }
  })
}