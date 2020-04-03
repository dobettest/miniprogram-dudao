import * as echarts from '../../components/ec-canvas/echarts';
import { cloudFunc } from '../../utils/Func';

let chart1 = null;
let chart2=null;
let dataList1=[]
Page({
  data: {
    ec1: {
      lazyLoad:true,
    },
    ec2:{
      lazyLoad:true,
    },
    userInfo:{}
  },
  onLoad: function(options){
    chart1=null;
    chart2=null;
    let userInfo=wx.getStorageSync("userinfo");
    this.echartsComponnet1= this.selectComponent('#canvas1');
    //this.echartsComponnet2= this.selectComponent('#canvas2');
    console.log(this.echartsComponnet1)
     this.setData({userInfo})
    this.getData1()
  },
  initChart1:function(){
    this.echartsComponnet1.init((canvas, width, height,dpr) => {
      // 初始化图表
      chart1 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      // Chart.setOption(this.getOption());
      this.setOption1(chart1);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart1;
    });
  },
  async getData1(){
    let {userInfo}=this.data;
    let data={}
    if(userInfo.sf==1 && userInfo.dep_id==0)
    data={
      type:1
    }
    else if(userInfo.sf==0)
    data={
      user_id:userInfo.user_id
    }
    else
    data={
      dep_id:userInfo.dep_id
    }
    console.log(data)
    dataList1=await cloudFunc('getTaskInfo',{data})
    console.log(dataList1)
    if (!chart1){
      this.initChart1(); //初始化图表
    }else{
      this.setOption1(chart1); //更新数据
    }
  },
  setOption1: function (chart) {
    chart1.clear();  // 清除
    chart1.setOption(this.getOption1());  //获取新数据
  },
  getOption1:function(){
    var option = {
      title: {
        text: '任务量占比图',
        // subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['待批准', '已批准', '审核中', '已完成']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: dataList1,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    return option;
  },
  // function initChart2(canvas, width, height, dpr) {
  //   chart = echarts.init(canvas, null, {
  //     width: width,
  //     height: height,
  //     devicePixelRatio: dpr // new
  //   });
  //   let userInfo=wx.getStorageSync("userinfo");
  //   console.log(userInfo)
  //   canvas.setChart(chart);
  //   var  option = {
  //     title: {
  //       text: '完成量折线图',
  //       // subtext: '纯属虚构',
  //       left: 'center'
  //     },
  //     xAxis: {
  //         type: 'category',
  //         data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  //     },
  //     yAxis: {
  //         type: 'value'
  //     },
  //     series: [{
  //         data: [3, 6, 2,9, 11, 13, 16],
  //         type: 'line',
  //         smooth: true
  //     }]
  // };
  //   chart.setOption(option);
  //   return chart;
  // },
  //options(Object)
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  }
});
