import {
  cloudFunc, uploadFile
} from "../../utils/Func"
import { chooseFile } from "../../utils/chooseFile";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    btn: ["反馈", "提交审核", "发布活动"],
    title: ["详情", "备注", "备注"],
    tempFiles: [],
    userInfo: [],
    relativeArr: [],
    tempinput: ''
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
    let { type } = e.detail.target.dataset;
    let { title, bz } = e.detail.value
    let { tempFiles, userInfo } = this.data
    if (title == '')
      wx.showToast({
        title: '名字不能为空',
      })
    else {
      let pr = [];
      tempFiles.forEach(v => {
        let cloudPath = userInfo.department + "/activity/" + title + "/" + v.name;
        let filePath = v.path;
        pr.push(uploadFile(cloudPath, filePath))
      })
      switch (type) {
        case '1':
          Promise.all(pr).then(res => {
            console.log(res)
            let fid = []
            res.forEach(v => {
              fid.push(v.fileID)
            });
            cloudFunc("updateTask", { title, fid, dep_id: userInfo.dep_id }).then(result => {
              if (result == null)
                wx.showToast({
                  title: '任务已存在',
                  icon: 'none'
                })
              else {
                wx.showToast({
                  title: '任务发布成功',
                })
                wx.navigateBack({
                  delta: 1
                });
              }
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => { console.log(err) })
          break;
        case '2':
          Promise.all(pr).then(res => {
            console.log(res)
            let fid = []
            res.forEach(v => {
              fid.push(v.fileID)
            });
            cloudFunc("addActivity", { title, fid, dep_id: userInfo.dep_id }).then(result => {
              if (result == null)
                wx.showToast({
                  title: '活动已存在',
                  icon: 'none'
                })
              else {
                wx.showToast({
                  title: '活动发布成功',
                })
                wx.navigateBack({
                  delta: 1
                });
              }
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => { console.log(err) })
          break;


      }
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