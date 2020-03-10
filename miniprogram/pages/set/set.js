// miniprogram/pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  options:[
    {
      img_src:"../../images/qk.png",
      title:'清空缓存',
      opened:false,
      func:'qk'
    },
    {
      img_src:"../../images/qx.png",
      title:'权限设置',
      opened:false,
      func:'qx'
    },
    {
      img_src:"../../images/zt.png",
      title:'主题设置',
      opened:false,
      func:'zt'
    },
    {
      img_src:"../../images/zh.png",
      title:'账号设置',
      opened:false,
      func:'night'
    },
    {
      img_src:"../../images/mm.png",
      title:'密码设置',
      opened:false,
      func:'night'
    },
    {
      img_src:"../../images/night.png",
      title:'夜间模式',
      opened:false,
      func:'night'
    },
  ],
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
  op(e){
    console.log(e)
    let options=this.data.options;
    options[e.currentTarget.dataset.index].opened=!options[e.currentTarget.dataset.index].opened;
    this.setData({
      options
    })
  },
  qk()
  {
    wx.showModal({
      title: '设置',
      content: '是否清空缓存',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.setStorageSync("history",[]);
        }
      }
    });
      

  },
  qx(){
    wx.openSetting({
      success: (result) => {
        console.log(result)
      }})
      
  },
  night(e){
    wx.navigateTo({
      url: '../set_detail/set_detail',
    });
      
  }
})