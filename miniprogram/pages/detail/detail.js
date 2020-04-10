import { request, cloudFunc, formatTime } from "../../utils/Func"
import regeneratorRuntime from '../../lib/runtime/runtime'
import {detail} from "../../templates/templates";
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: {},
    timer: '',
    comments: [],
    userInfo: {},
    history: {},
    options: {},
    resultList:[],
    newsList:[],
    err:{

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let userInfo = wx.getStorageSync("userinfo");
    let history = wx.getStorageSync("history") || {};
    this.setData({ userInfo, history, options })
    this.getData();
    if(options.type=='newsdetail')
    this.cal()
  },
  async update() {
    await this.updateUserInfo()
    this.getData()
  },
  async getData() {
    let { options } = this.data
    switch (options.type) {
      case "newsdetail":
        let res = await request({ url: '/ecut/getNews', data: { url: options.href } })
        let res1 = await cloudFunc('getNews', { name: options.biaoti })
        if (res1 == null) {
          await cloudFunc('addNews', { name: options.biaoti })
          res1 = await cloudFunc('getNews', { name: options.biaoti })
        }
        console.log(res, res1)
        let news = res.data
        news.name = options.biaoti
        Object.assign(news, res1)
        console.log(news)
        this.setData({ news: res.data })
        break;
        case "moreNews":
        res = await request({ url: '/ecut/moreNews'})
        console.log(res)
        this.setData({
          newsList:res.data.list
        })
        break;
      case "searchtask":
        let {resultList}=this.data
        resultList =await cloudFunc('search',{name:options.content})
        console.log(resultList)
        if(resultList.data.length==0)
          this.setData({err:{
            err_msg:"没有找到结果"
          }})
        else
        this.setData({
        resultList:resultList.data
        })
        console.log(!this.data.err.msg)
        break;
    }
      

  },
  updateUserInfo() {
    let {userInfo}=this.data
    let jf = ++userInfo.jf
    wx.cloud.callFunction({
      name: "updateUserInfo",
      data: {
        database: userInfo.sf > 0 ? 'admin' : 'users',
        user_id: userInfo.user_id,
        data: {
          jf
        }
      }
    })
  },
  onUnload: function () {
    let { timer } = this.data
    console.log("unload", this.data.userInfo)
    wx.setStorageSync('userinfo', this.data.userInfo);
    clearTimeout(timer)//不是在onhide时触发
  },
  /**
   * 生命周期函数--监听页面显示
   */
  cal() {
    let { timer, history, options } = this.data;
    let read = history.read || []
    if (read.some(v => v.name == options.biaoti && v.rdate == new Date().getDate())) {
      console.log("今天加过分了哦")
      return;
    }
    console.log("计时开始")
    history.read = history.read || []
    timer = setTimeout(async ()=>{
        await this.updateUserInfo()
        history.read.push({ name: options.biaoti, rdate: new Date().getDate() })
        wx.setStorageSync("history", history);
    }, 20000)
    console.log("set", timer)
    this.setData({ timer })
  },
  getNews(e) {
    console.log(e)
    let {
      href,
      biaoti
    } = e.currentTarget.dataset
    href='http://news.ecut.edu.cn'+href
    console.log(href)
    detail('newsdetail',{href,biaoti})
  },
  onShow: function () {


  }
})