import * as echarts from '../../components/ec-canvas/echarts';

let chart = null;

function initChart1(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
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
        data: [
          { value: 335, name: '待批准' },
          { value: 310, name: '已批准' },
          { value: 234, name: '审核中' },
          { value: 234, name: '已完成' },
        ],
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
  chart.setOption(option);
  return chart;
}
function initChart2(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var  option = {
    title: {
      text: '完成量折线图',
      // subtext: '纯属虚构',
      left: 'center'
    },
    xAxis: {
        type: 'category',
        data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [3, 6, 2,9, 11, 13, 16],
        type: 'line',
        smooth: true
    }]
};
  chart.setOption(option);
  return chart;
}
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec1: {
      onInit: initChart1
    },
    ec2:{
      onInit:initChart2
    }
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  }
});
