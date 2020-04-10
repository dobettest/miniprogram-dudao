import { cloudFunc, formatTime } from "../../utils/Func";
import regeneratorRuntime from '../../lib/runtime/runtime'
// components/comment/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment:{
      type:Array,
      value:[]
    },
    name:{
      type:String,
      value:""
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo:{},
    content:""

  },
  pageLifetimes:{
    show:function(){
      let userInfo=wx.getStorageSync("userinfo")||{};
      this.setData({userInfo})
      console.log(userInfo)
      }

  },


  /**
   * 组件的方法列表
   */
  methods: {
    zan(e){
      let {comment}=this.data
      console.log(e,comment)
      let {index,id}=e.currentTarget.dataset;
      comment[index].zan=!comment.zan
      var n=comment[index].zan?-1:1;
      comment[index].num+=n
      this.setData({comment})
      console.log()

    },
    setcontent(e){
      this.setData({content:e.detail.value})
    },
    async comment(e){
      let {name,userInfo,content,comment}=this.data
      if(content=="")
      return;
      let d=new Date()
      let pdate=formatTime(d)
      // let pdate=d.getFullYear()+'-'+d.getMonth()+1+'-'+d.getDate()+':'+d.getHours()+':'+d.getMinutes()
      let comment1={
        user_id:userInfo.user_id,
        content,
        num:0,
        pdate
      }
      comment=[comment1,...comment]
      await cloudFunc('updateNews',{
        name,
        data:{
          comments:comment
        }

      })
      this.setData({content:""})
      this.triggerEvent("update")
    }

  }
})
