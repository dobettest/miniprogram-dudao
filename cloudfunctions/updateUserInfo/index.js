const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    let {database,data,user_id}=event
    return await db.collection(database).where({user_id}).update({
      data
    })
  } catch (e) {
  }
}