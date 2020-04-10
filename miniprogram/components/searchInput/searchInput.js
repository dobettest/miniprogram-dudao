import { detail } from "../../templates/templates";
Component({
  data: {
    tempinput: '',
    history:{},
    record: []
  },
  pageLifetimes:{
    show:function(){
    let history = wx.getStorageSync("history")||{};
    this.data.history=history
    console.log(this.data.history)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleMatch(e) {
      if (e.detail.value.length > 0) {
        var reggex = RegExp(e.detail.value);
        let matchArr = [];
        let search=this.data.history.search||[]
        search.forEach(v => {
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
      let search = this.data.history.search || [];
      search.some(v => v === this.data.tempinput) ? console.log("存在") :search.push(this.data.tempinput)
      this.data.history.search=search
      console.log(this.data.history)
    },
    search_func(e) {
      let data = e.currentTarget.dataset.content ? e.currentTarget.dataset.content : this.data.tempinput;
      if (data.length > 0) {
        this.setContent()
        wx.setStorageSync("history", this.data.history);
        this.setData({ tempinput: '', matchArr: [] })
        detail('searchtask',{content:data})
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