// miniprogram/pages/aboutMe/aboutMe.js
import {
  cloudFunc, uploadFile, chooseImage, showToast
} from "../../utils/Func"
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    otherInfoList: [{
      //img_src:"../../images/sc.png",
      css: 'iconshoucang',
      title: '我的收藏',
      color: 'red',
      func: 'sc'
    },
    {
      //img_src:"../../images/lsjl.png",
      css: 'iconlishi',
      title: '历史记录',
      color: 'yellow',
      func: 'ls'
    },
    {
      //img_src:"../../images/rc.png",
      css: 'iconricheng',
      color: '#408ED6',
      title: '日程安排',
      func: 'richeng'
    },
    {
      //img_src:"../../images/fk.png",
      css: 'iconfankui',
      title: '反馈',
      color: '#666',
      func: 'fk'
    },
    {
      //img_src:"../../images/about.png",
      css: 'iconguanyu',
      title: '关于',
      color: 'green',
      func: 'about'
    },
    {
      //img_src:"../../images/sz.png",
      css: 'iconshezhi',
      title: '设置',
      color: '#ccc',
      func: 'sz'
    }
    ],
      remind: '加载中',
      help_status: false,
      userid_focus: false,
      passwd_focus: false,
      angle:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync(("userinfo")) || {};
    this.setData({
      userInfo,
      num: userInfo.dj
    })
    console.log(userInfo)
  },
  onReady:function(){
    let userInfo = wx.getStorageSync(("userinfo")) || {};
    this.setData({
      userInfo,
      num: userInfo.dj||0
    })
    if(!userInfo._id)
    this.loginfrm()
  },
  fk() {
    wx.navigateTo({
      url: '../publish/publish?type=3',
    });

  },
  richeng()
  {
    wx.navigateTo({
      url: '../richeng/index',
    })
  },
  sz() {
    wx.navigateTo({
      url: '../set/set',
    });

  },
  
  async login(e) {
    let userInfo = e.detail.value;
    console.log(userInfo)
    console.log(e)
    let result={}
    switch(userInfo.sf){
      case '0':
        result = await cloudFunc("getUserInfo", {database:"users",userInfo})||{};
        break;
      case '1':
        result = await cloudFunc("getUserInfo", {database:"admin",userInfo})||{};
    }
    console.log(result)
    if (result.data.length > 0) {
      let userInfo = result.data[0]
      wx.setStorageSync("userinfo", userInfo);
      this.setData({
        userInfo
      })
    } else {
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        image: '',
        duration: 1500,
      });
    }
  },
  logout() {
    this.setData({
      userInfo: {}
    })
    wx.clearStorageSync();
    wx.setNavigationBarTitle({
      title: '登录',
    });
    this.loginfrm()
  },
  loginfrm(){
    setTimeout(()=>{
      this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(res=>{
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(this.data.angle !== angle){
        this.setData({
          angle: angle
        });
      }
    });
  },
  async changeHeader() {
    let { userInfo } = this.data;
    let result=await chooseImage();
    console.log(result)
    let { tempFilePaths } = result
    let cloudPaths = "users/" + userInfo.user_id + '/header.jpg';
    userInfo.header = tempFilePaths[0];//先修改再上传
    // this.setData({
    //   userInfo
    // })
    Promise.all([uploadFile(cloudPaths, tempFilePaths[0]),cloudFunc('updateUserInfo',userInfo)]).then(res=>{
      console.log(res);
      this.setData({userInfo})
    })
  },
  about(){
    wx.navigateTo({
      url: '../about/about'
  })
  },
  inputFocus: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': true
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': false
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function(e){
    if(e.target.id == 'help'){
      this.hideHelp();
    }
  },
  showHelp: function(e){
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e){
    this.setData({
      'help_status': false
    });
  }
})