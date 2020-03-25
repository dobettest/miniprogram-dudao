// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let result=await db.collection('task').where({user_id:event.user_id}).get()||{}
    let state0 = result.data.filter(v => v.state == 0).length
    let state1 = result.data.filter(v => v.state == 1).length
    let state2 = result.data.filter(v => v.state == 2).length
    let state3 = result.data.filter(v => v.state == 3).length
    let res = [state0, state1, state2, state3]
    return res;
}