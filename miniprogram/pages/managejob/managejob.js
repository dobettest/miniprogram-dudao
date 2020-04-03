// miniprogram/pages/tasklist/tasklist.js
import {
  cloudFunc
} from "../../utils/Func"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    err: {},
    resultList: [],
    userInfo: {},
    totalPage: '',
    currentPage: 0,
    allSelect: true,
    tabs: [
     {
        title: '待催办',
        state:-3,
        isActive: true,
      },
      {
        title: '待批准',
        state:0,
        isActive:false,
      },
      {
        title: '待审核',
        state:2,
        isActive: false,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      resultList,
    } = this.data
    let userInfo = wx.getStorageSync(("userinfo")) || {};
    this.setData({
      userInfo,
      resultList,
      err: {}
    })
    this.getResult()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  handleDetail() {
    wx.navigateTo({
      url: '../task_detail/task_detail',
    })
  },
  selectItem(e) {
    let {
      index
    } = e.currentTarget.dataset;
    let {
      resultList
    } = this.data
    let i = resultList.findIndex((v, i) => i == index);
    resultList[i].isSelect = !resultList[i].isSelect
    let allSelect = resultList.every(v => v.isSelect);
    this.setData({
      resultList,
      allSelect
    })
  },
  selectAll(e) {
    let {
      resultList,
      allSelect
    } = this.data;
    allSelect = !allSelect
    resultList.forEach(v => {
      v.isSelect = allSelect
    });
    this.setData({
      resultList,
      allSelect
    })
  },
  handleItemChange(e) {
    let {
      tabs
    } = this.data
    const {
      index
    } = e.detail;
    this.setData({
      resultList: [],
      currentPage: 0,
      err: {}
    })
    tabs.forEach((v, i) => {
      v.isActive = i == index ? true : false
    })
    this.setData({
      tabs
    })
    this.getResult();
  },
  async getResult() {
    let that = this;
    let {
      resultList,
      currentPage,
      allSelect,
      userInfo,
      tabs
    } = this.data;
    let data= userInfo.dep_id>0?{
        dep_id:userInfo.dep_id,
        state:tabs[tabs.findIndex(v=>v.isActive==true)].state,
        type:0
    }:{
      state:tabs[tabs.findIndex(v=>v.isActive==true)].state,
      type:1
  }
    let result = await cloudFunc('queryTask', {
      data,
      num: currentPage * 6,
      limit: 6
    })
    console.log(result)
    result.data.forEach(v => v.isSelect = allSelect)
    resultList = [...resultList, ...result.data]
    this.setData({
      resultList,
      totalPage: Math.ceil(result.totalnum.total / 6),
    })
    if (resultList.length == 0 && currentPage == 0) {
      allSelect = false
      let err = {
        img_src: '../../images/error.png',
        title: "没有找到结果"
      }
      that.setData({
        err,
        allSelect
      })
    }
    wx.stopPullDownRefresh()
  },
  handleDetail() {
    wx.navigateTo({
      url: '../task_detail/task_detail',
    })
  },
  updateTask(e) {
    let {
      resultList,
      tabs
    } = this.data;
    let {
      op
    } = e.currentTarget.dataset;
    let arr = resultList.filter(v => v.isSelect) || [];
    let pr = [];
    console.log(op)
    arr.forEach(v => {
      pr.push(cloudFunc('updateTask', {
        _id: v._id,
        state:tabs[tabs.findIndex(v=>v.isActive==true)].state+parseInt(op)
      }))
    });
    this.setData({
      resultList: [],
      currentPage: 0,
    })
    console.log(arr.length, arr)
    Promise.all([...pr]).then(res => {
      this.getResult()
    }).catch(err => {
      console.log(err)
    })
  },
  onPullDownRefresh: function() {
    this.data.resultList=[]
    this.data.currentPage=0
    this.getResult()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.currentPage >= this.data.totalPage) {
      wx.showToast({
        title: '没有更多数据',
      })
    } else {
      this.data.currentPage++;
      this.getResult()
    }
  },
  detail: function(e) {
    wx.navigateTo({
      url: '../contact/contact?fname=' + e.currentTarget.dataset.fname,
    })

  }
})