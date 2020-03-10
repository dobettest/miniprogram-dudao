const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('task').doc(event._id).update({
      data:{
        state:event.state,
        fid:event.fid||[]
      }
    })
  } catch (e) {
  }
}