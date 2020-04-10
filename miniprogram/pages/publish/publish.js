import {
  cloudFunc, uploadFile, removeFile, formatTime
} from "../../utils/Func"
import { chooseFile } from "../../utils/chooseFile";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    btn: ["申办活动", "提交审核", "发布活动","提交反馈"],
    msg:['活动','任务','活动','问题'],
    tempFiles: [],
    userInfo: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let userInfo = wx.getStorageSync("userinfo");
    let {
      type
    } = options;
    this.setData({
      type,
      userInfo
    })
    wx.setNavigationBarTitle({
      title: this.data.btn[type],
    })
  },
publish(e) {
    console.log(e)
    let { title, bz } = e.detail.value
    let { tempFiles, userInfo,type} = this.data
    if (title == '' || bz == '')
      wx.showToast({
        title: '必填项不能为空',
      })
    else {
      let pr= [];
      let fid=[]
      let dir=type == 1 ? 'task' : 'activity';
      tempFiles.forEach(v => {
        let cloudPath =dir+ "/" + title + "/" + v.name;
        let filePath = v.path;
        pr.push(uploadFile(cloudPath, filePath))
      })
      let pdate=formatTime(new Date())
      Promise.all(pr).then(res => {
        console.log(res)
        res.forEach(v => {
          fid.push(v.fileID)
        })
        switch (type) {
          case '0':
            cloudFunc("addActivity", { title, fid,bz, dep_id: userInfo.dep_id, state: 0, user_id:userInfo.user_id,sf:userInfo.sf,pdate}).then(res=>{
              if (res == null){
                wx.showToast({
                  title: '活动已存在',
                  icon: 'none'
                })
                removeFile({fileList:fid})
              }
              else {
                wx.showToast({
                  title: '活动申请提交成功',
                })
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  });
                },2000)
              }
            })
            break;
          case '1':
            console.log(title)
            cloudFunc("updateTask", { title, fid,state:2}).then(result => {
              if (result == null){
                wx.showToast({
                  title: '任务不存在或不符合审核提交',
                  icon: 'none'
                })
                removeFile({fid})
              }
              else {
                wx.showToast({
                  title: '提交审核成功',
                })
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  });
                },2000)
              }
              console.log(result)
            }).catch(err => {
              console.log(err)
            })
            break;
          case '2':
            cloudFunc("addActivity", { title, fid,bz,dep_id: userInfo.dep_id, state: 1, user_id:userInfo.user_id,pdate}).then(result => {
              if (result == null){
                wx.showToast({
                  title: '活动已存在',
                  icon: 'none'
                })
                removeFile({fileList:fid})
              }
              else {
                wx.showToast({
                  title: '活动发布成功',
                })
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  });
                },2000)
              }
            }).catch(err => {
              console.log(err)
            })
            break;
            case '3':
              cloudFunc("addActivity", { title, fid, dep_id: userInfo.dep_id, state: 1, user_id:userInfo.user_id}).then(result => {
                if (result == null){
                  wx.showToast({
                    title: '反馈已存在',
                    icon: 'none'
                  })
                  removeFile({fileList:fid})
                }
                else {
                  wx.showToast({
                    title: '反馈成功',
                  })
                  setTimeout(function(){
                    wx.navigateBack({
                      delta: 1
                    });
                  },2000)
                }
              }).catch(err => {
                console.log(err)
              })
              break;
        }  
      }).catch(err => { console.log(err)
      removeFile({fileList:fid}) });
    }
  },
  async addFiles() {
    let result = await chooseFile();
    console.log(result)
    let tempFiles = result
    this.setData({ tempFiles })
  },
  removeFile(e) {
    console.log(e)
    let { tempFiles } = this.data;
    tempFiles = tempFiles.filter(v => v.name != e.currentTarget.dataset.k)
    this.setData({ tempFiles })
  }
})