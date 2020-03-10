Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgc:{
      type:String,
      value:''
    }

  },
  /**
   * 组件的初始数据
   */
  data: {
    MyDate: {

    },
    weekBar: [
      {
        name: '星期一'
      },
      {
        name: '星期二'
      },
      {
        name: '星期三'
      },
      {
        name: '星期四'
      },
      {
        name: '星期五'
      },
      {
        name: '星期六'
      },
      {
        name: '星期日'
      }
    ]

  },
  ready: function () {
    let { MyDate, weekBar } = this.data
    let d = new Date()
    MyDate.year = d.getFullYear()
    MyDate.month = d.getMonth() + 1
    MyDate.monthLength = this.getMonthLength(MyDate.year, MyDate.month)
    MyDate.today = d.getDate()
    this.getWeekBar(MyDate.year,MyDate.month-1)
    console.log(MyDate)
    this.setData({ MyDate})
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getWeekBar(year, month) {
      let {weekBar}=this.data
      var week = ['日', '一', '二', '三', '四', '五', '六']
      var temp = new Date(year, month, 1)
      var firstday = temp.getDay()//获取每个月1号的星期
      weekBar.forEach((v, i) => {
        weekBar[i].name = week[firstday]
        firstday < 6 ? firstday++ : firstday = 0

      });
      this.setData({weekBar})
    },
    isLeapYear(year) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
        return true;
      return false;
    },
    getMonthLength(year, month) {
      var length;
      length = this.isLeapYear(year) && month == 2 ? 28 : 29
      var arr1 = [1, 3, 5, 7, 8, 10, 12];
      arr1.some(v => v == month) ? length = 31 : '';
      var arr2 = [4, 6, 9, 11];
      arr2.some(v => v == month) ? length = 30 : ''
      return length
    },
    preMonth(e) {
      let { MyDate } = this.data;
      MyDate.month > 1 ? MyDate.month-- : (function a() { MyDate.month = 12; MyDate.year-- }());
      MyDate.monthLength = this.getMonthLength(MyDate.year, MyDate.month)
      this.setData({ MyDate })
      this.getWeekBar(MyDate.year,MyDate.month-1)
    },
    nextMonth(e) {
      let { MyDate } = this.data;
      MyDate.month < 12 ? MyDate.month++ : (function a() { MyDate.month = 1; MyDate.year++ }());
      MyDate.monthLength = this.getMonthLength(MyDate.year, MyDate.month)
      this.setData({ MyDate })
      this.getWeekBar(MyDate.year,MyDate.month-1)
    }

  }
})

