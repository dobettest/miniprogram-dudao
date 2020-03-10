const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('users').doc(event.user_id).update({
      data:event.data
    })
  } catch (e) {
  }
}