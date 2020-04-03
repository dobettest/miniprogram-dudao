// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let result=await db.collection('task').where(event.data).get()||{}
    let state0 = result.data.filter(v => v.state == 0).length
    let state1 = result.data.filter(v => v.state == 1).length
    let state2 = result.data.filter(v => v.state == 2).length
    let state3 = result.data.filter(v => v.state == 3).length
  let res = [
    { value:state0, name: '待批准' },
    { value:state1, name: '已批准' },
    { value:state2, name: '审核中' },
    { value:state3, name: '已完成' },
  ]
  return res;
}