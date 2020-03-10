import {
  cloudFunc
} from "../../utils/Func.js"
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    btn: ["申请任务", "分配任务"],
    title:["详情", "备注"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {
      type
    } = options;
    this.setData({
      type
    })
    wx.setNavigationBarTitle({
      title: this.data.btn[type],
    })
  },
  publish(e) {
    console.log(e)
    let { type } = e.detail.target.dataset;
    type=parseInt(type)
    let { title, bz,uid} = e.detail.value
    uid=uid==''?app.globalData.userInfo.user_id:uid
    console.log(uid)
     if (title == ''||bz==''||uid=='')
      wx.showToast({
        title: '必填项不能为空',
      })
      else
          cloudFunc("addTask", { title,state:type,uid,bz}).then(result => {
            if (result == null)
              wx.showToast({
                title: '任务已存在',
                icon: 'none'
              })
            else
              wx.showToast({
                title: '任务添加成功',
              })
           })
  }
})