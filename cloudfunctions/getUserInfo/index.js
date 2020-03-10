// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection("users").where({
      user_id:event.user_id,
      password:event.password,
      sf:event.sf
    }).get()
  } catch (e) {
     console.error(e)
  }
}