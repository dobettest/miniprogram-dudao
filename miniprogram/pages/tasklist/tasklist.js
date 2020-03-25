// miniprogram/pages/tasklist/tasklist.js
import {
  cloudFunc
} from "../../utils/Func"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0, //结果状态
    err: '',
    resultList: '',
    userInfo: {},
    totalPage: '',
    currentPage: 0,
    allSelect: true,
    tasklist: '',
    tabs: [{
      title: '待批准',
      isActive: true
    },
    {
      title: '已批准',
      isActive: false
    },
    {
      title: '审核中',
      isActive: false
    },
    {
      title: '已完成',
      isActive: false
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      resultList,
      currentIndex
    } = this.data
    let userInfo = wx.getStorageSync("userinfo");
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
      resultList,
      tasklist,
      currentIndex,
      tabs,
      err
    } = this.data
    const {
      index
    } = e.detail;
    currentIndex = index
    this.setData({
      resultList: [],
      currentPage: 0,
      err: {}
    })
    tabs.forEach((v, i) => {
      v.isActive = i == index ? true : false
    })
    this.setData({
      tabs,
      currentIndex
    })
    this.getResult();
  },
  async getResult() {
    let that = this;
    let {
      tasklist,
      resultList,
      currentIndex,
      currentPage,
      allSelect,
      userInfo
    } = this.data;
    await cloudFunc('queryTask', userInfo.sf > 0 ?
      {
        data: {
          dep_id: userInfo.dep_id,
          state: currentIndex
        },
        num: currentPage * 7,
        limit: 7
      } : {
        data: {
          user_id: userInfo.user_id,
          state: currentIndex
        },
        num: currentPage * 7,
        limit: 7
      }).then(result => {
        result.data.forEach(v => v.isSelect = allSelect);
        this.setData({
          resultList: [...resultList, ...result.data],
          totalPage: Math.ceil(result.totalnum.total / 7),
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

  },
  setClipboardData(e)
  {
    console.log(e)
    let {name}=e.currentTarget.dataset;
    wx.setClipboardData({data: name});

  }
})