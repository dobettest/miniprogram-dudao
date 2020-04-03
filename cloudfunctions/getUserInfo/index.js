// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    let {userInfo,database}=event
    return await db.collection(database).where({
      user_id:userInfo.user_id,
      password:userInfo.password
    }).get()
  } catch (e) {
     console.error(e)
  }
}