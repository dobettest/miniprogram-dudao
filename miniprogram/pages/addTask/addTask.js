import {
  cloudFunc
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
    uid = uid == '' ? userInfo.user_id : uid
    let dep_id = userInfo.dep_id
    console.log(uid)
    if (title == '' || bz == '' || uid == '')
      wx.showToast({
        title: '必填项不能为空',
      })
    else
      cloudFunc("addTask", { title, state:userInfo.sf>0?1:0,user_id:uid, bz, dep_id }).then(result => {
        if (result == null)
          wx.showToast({
            title: '任务已存在',
            icon: 'none'
          })
        else {
          wx.showToast({
            title: '任务添加成功',
          })
          wx.navigateBack({
            delta: 1
          });
        }
      })
  }
})