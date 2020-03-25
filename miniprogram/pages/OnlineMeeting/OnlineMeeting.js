// pages/OnlineMeeting/OnlineMeeting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trtcConfig:{
      sdkAppID: '1400337794',  // 开通实时音视频服务创建应用后分配的 SDKAppID
      userID: '201720181625', // 用户 ID，可以由您的帐号系统指定
      userSig: 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zIhwgaG5kBsYWhmZAqVL07JTiwoyExRsjI0MTAwNjY3tzSByKRWFGQWpQLFTU1NjQwMDCCiJZm5YDELUwNDMzMLc6gpmelA4wtDA73MzHJMk9zyDVPDStx9spKjcipLUqqKAwKdMzMtIwrN8ioCPJ1MfIttlWoBtRMyXQ__', // 身份签名，相当于登录密码的作用
      template: 'grid',        // 画面排版模式
  },
  template: '1v1',
    headerHeight: app.globalData.headerHeight,
    statusBarHeight: app.globalData.statusBarHeight,
  entryInfos: [
    { icon: "../../images/call.png", title: "语音聊天室", desc: "<trtc-room>", navigateTo: "../voice-room/join-room/joinRoom" },
    { icon: "../../images/doubleroom.png", title: "双人通话", desc: "<trtc-room>", navigateTo: "../videocall/videocall" },
    { icon: "../../images/multiroom.png", title: "多人会议", desc: "<trtc-room>", navigateTo: "../meeting/meeting" }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  selectTemplate: function(event) {
    console.log('index selectTemplate', event)
    this.setData({
      template: event.detail.value,
    })
  },
  handleEntry: function(e) {
    let url = this.data.entryInfos[e.currentTarget.id].navigateTo
    wx.navigateTo({
      url: url,
    })
  },
})