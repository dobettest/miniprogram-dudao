import { cloudFunc, request } from "../../utils/Func";
import runtime from '../../lib/runtime/runtime'
// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    t: 1, //控制左右移动状态
    left: 10,
    num:15,
    banner: [],
    nav: [
      {
        icf:'iconiconfontactivityadd',
        txt: '发布活动',
        src: '../publish/publish?',
        data: 'type=2'
      },
      {
        icf:'iconkuanggong',
        txt: '我的任务',
        src: '../managejob/managejob',
      },
      {
        icf:'iconrenwuzhongxin',
        txt: '任务列表',
        src: '../tasklist/tasklist?'
      },
      {
        icf:'iconlist',
        txt: '活动列表',
        src: '../activityList/activityList?'
      },
      {
        icf:'iconfenpeirenwu',
        txt: '分派任务',
        src: '../addTask/addTask?',
        data: 'type=1'
      }
    ],
    nav1: [
      {
        icf:'iconrenwuzhongxin',
        txt: '任务列表',
        src: '../tasklist/tasklist?',
      },
      {
        icf:'iconlist',
        txt: '活动列表',
        src: '../activityList/activityList?',
      },
      {
        icf:'iconshenhe',
        txt: '任务审核',
        src: '../publish/publish?',
        data: 'type=1'
      
      },
      {
        icf:'iconshenqing',
        txt: '申请任务',
        src: '../addTask/addTask?',
        data: 'type=0'
      }
    ],
    honorList:[
      {
        img_src:'https://www.ecut.edu.cn/_upload/article/images/d9/fb/0c3b55524ad7acdda3ce83ac7872/51bdc0c5-37c6-4834-a191-5c2c06135ac8.jpg',
        type:'勤劳之星',
        name:'钱七虎'
      },
      {
        img_src:'https://www.ecut.edu.cn/_upload/article/images/d9/fb/0c3b55524ad7acdda3ce83ac7872/50d24d7e-0746-41d1-a64f-5966811facb7.jpg',
        type:'效率之星',
        name:'柳和生'
      },
      {
        img_src:'https://www.ecut.edu.cn/_upload/article/images/d9/fb/0c3b55524ad7acdda3ce83ac7872/18520d86-eec0-4b59-b611-f8290f8e95a6.jpg',
        type:'本周之星',
        name:'孙占学'
      },
      {
        img_src:'https://www.ecut.edu.cn/_upload/article/images/d9/fb/0c3b55524ad7acdda3ce83ac7872/5a742c40-94bd-498d-b92b-831965efb1d6.jpg',
        type:'本月之星',
        name:'刘紫春'
      }
    ],
    newsList:[

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function(options) {
    //console.log()
   this.getBanner();
   this.getNewsList()

  },
  async getBanner(){
    let res=await request({url:'/ecut/getBanner'});
    let {data}=res;
    this.setData({banner:data})
  },
  async getNewsList()
  {
    let res=await request({url:'/ecut/getSchoolNews'});
    let {data}=res;
    this.setData({newsList:data})

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.myscroll();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() { 
    let userInfo = wx.getStorageSync(("userinfo")) || {};
    if(!userInfo._id)
    {
     wx.showToast({
       title: '请登录后使用',
       mask:true,
       complete:()=>{
         setTimeout(()=>{
         wx.switchTab({
           url: '/pages/aboutMe/aboutMe',
         });
         },3000
         )
       }
     });
    }
    else
    this.setData({ userInfo})
  },
  search(e)
  {
    wx.navigateTo({
      url: '../result/result?state=' + e.currentTarget.dataset.op,
    })

  },
  publish: function() {
    wx.navigateTo({
      url: '../publish/publish'
    });
  },
  callBack()
  {
    wx.navigateTo({
      url: '../callBack/callBack?type='+this.data.sf,
    })
  },
  tasklist: function(e) {
    wx.navigateTo({
      url: '../tasklist/tasklist?op=' + e.currentTarget.dataset.op,
    })


  },
  myscroll: function() {
    let that = this;
    setInterval(
      function() {
        if (that.data.left > 394 || that.data.left < 10)
          that.setData({
            t: -that.data.t
          })
        that.setData({
          left: that.data.left + 25 * that.data.t,
        })

      },
      1000
    )
  }

})