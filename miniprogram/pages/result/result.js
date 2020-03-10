// pages/result/result.js
import {cloudFunc} from "../../utils/Func.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultList:[],
    state:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getResult(options);
  },
  async getResult(options)
  {
    let that=this;
    await cloudFunc('search',{name:options.content}).then(result=>{
      this.setData({
        resultList:result.data
      })
      if(result.data.length===0)
      {
      let state={
        img_src:'../../images/error.png',
        title:"没有找到结果"
      }
      that.setData({
        state
      })
    }
    }).catch(err=>{
      let state={
        img_src:'../../images/error.png',
        title:"访问出错了"
      }
      that.setData({
        state
      })
      console.log(err)
    })
  },
  handleDetail(){
    wx.navigateTo({
      url: '../task_detail/task_detail',
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})