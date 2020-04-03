// miniprogram/pages/tasklist/tasklist.js
import {
  cloudFunc
} from "../../utils/Func"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    err: '',
    resultList: '',
    userInfo: {},
    totalPage: '',
    currentPage: 0,
    allSelect: true,
    tasklist: '',
    tabs: [{
      title: '待批准',
      state:0,
      isActive: true
    },
    {
      title: '已批准',
      state:1,
      isActive: false
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      resultList
    } = this.data
    let userInfo = wx.getStorageSync("userinfo");
    this.setData({
      resultList,
      err: {}
    })
    this.data.userInfo = userInfo
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
    let data={}
    if(userInfo.sf==1 && userInfo.dep_id==0)
    data={
      type:1,
      state:tabs[tabs.findIndex(v=>v.isActive==true)].state
    }
    else
    data={
      state:tabs[tabs.findIndex(v=>v.isActive==true)].state,
    }
    console.log(data)
    await cloudFunc('queryActivity',{
        data,
        num: currentPage * 8,
        limit: 8
      }).then(result => {
        result.data.forEach(v => v.isSelect = allSelect);
        this.setData({
          resultList: [...resultList, ...result.data],
          totalPage: Math.ceil(result.totalnum.total / 8),
        })
        if (result.data.length == 0 && currentPage == 0) {
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
        console.log(result)
        wx.stopPullDownRefresh()
      }).catch(error => {
        let err = {
          img_src: '../../images/error.png',
          title: "访问出错了"
        }
        that.setData({
          err
        })
        console.log(error)
      })
  },
  handleDetail() {
    wx.navigateTo({
      url: '../task_detail/task_detail',
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      resultList: [],
      currentPage: 0
    })
    this.getResult()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.currentPage >= this.data.totalPage) {
      wx.showToast({
        title: '没有更多数据',
      })
    } else {
      this.data.currentPage++;
      this.getResult()
    }
  },
  detail: function (e) {
    wx.navigateTo({
      url: '../contact/contact?fname=' + e.currentTarget.dataset.fname,
    })

  }
})