Component({
  /**
   * 组件的属性列表
   */
  properties: {


  },

  /**
   * 组件的初始数据
   */
  data: {
    tempinput: '',
    history: [],
    record: []
  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    let history = wx.getStorageSync("history");
    this.data.history=history
  },
  detached: function () {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleMatch(e) {
      if (e.detail.value.length > 0) {
        var reggex = RegExp(e.detail.value);
        let matchArr = [];
        let history = this.data.history || [];
        history.forEach(v => {
          if (v.match(reggex))
            matchArr.push(v);
        })
        this.setData({
          tempinput: e.detail.value,
          matchArr
        })
      } else {
        this.setData({
          tempinput: '',
          matchArr: []
        })
      }
    },
    setContent() {
      console.log(this.data.tempinput)
      let history = this.data.history || [];
      history.some(v => v === this.data.tempinput) ? console.log("存在") : history.push(this.data.tempinput)
     this.data.history=history
      console.log([...this.data.history])
    },
    search_func(e) {
      let data = e.currentTarget.dataset.content ? e.currentTarget.dataset.content : this.data.tempinput;
      if (data.length > 0) {
        this.setContent()
        wx.setStorageSync("history", this.data.history);
        wx.navigateTo({
          url: '../result/result?content=' + data,
        });
        this.setData({ tempinput: '', matchArr: [] })
      } else {
        wx.showToast({
          title: '搜索内容不能为空',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: true,
        });

      }
    }
  }
})