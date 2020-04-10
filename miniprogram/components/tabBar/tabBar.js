// components/navBar/navBar.js
import { TabBar, Color } from "../../config"
// import regeneratorRuntime from "/../lib/runtime/runtime"
// import { switchTab } from "../utils/asyncfunc";
// var initList=[];
Component({

  /**
   * 组件的初始数据
   * 
   */
  properties:{
    themeColor:{
      type:String,
      value:"green"
    }
  },
  data: {
    index:0,
    navList:[
      {
        icf: 'iconshouye',
        text: '首页',
        Selected: true,
        pagePath: '../test1/test1.xml'
      },
      {
        icf: 'iconwodeA',
        text: '我的',
        Selected: false,
        pagePath: '../songDetail/songDetail'
      }
    ]
  },
  methods: {
    change(e) {
      let { index } = e.currentTarget.dataset;
      let { navList } = this.data;
      navList.forEach((v, i) => {
        v.Selected = i == index ? true : false
      })
      this.setData({navList})
      console.log(navList)
      let pagePath = navList[navList.findIndex(v => v.Selected == true)].pagePath
      // wx.switchTab({
      //   url: pagePath
      // });

    }
  }
})
//Page Object