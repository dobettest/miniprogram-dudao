import {
  cloudFunc, formatTime
} from "../../utils/Func.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync("userinfo") || {};
    wx.setNavigationBarTitle({
      title:userInfo.sf>0?"分派任务":"申请任务",
    })
    this.setData({
      userInfo
    })
  },
  publish(e) {
    console.log(e)
    let { title, bz, uid } = e.detail.value
    let { userInfo } = this.data
    let {sf,dep_id,user_id}=userInfo
    uid =sf>0?uid:user_id
    console.log(uid)
    if (title == '' || bz == '' || uid == '')
      wx.showToast({
        title: '必填项不能为空',
      })
    else{
      let pdate=formatTime(new Date())
      cloudFunc("addTask", { title, state:sf>0?1:0,user_id:uid, bz, dep_id,pdate,sf}).then(result => {
        console.log(result)
        if (result == null)
          wx.showToast({
            title: '任务已存在',
            icon: 'none'
          })
        else {
          wx.showToast({
            title: '任务添加成功',
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            });
          },2000)
         
        }
      })
  }
}
})