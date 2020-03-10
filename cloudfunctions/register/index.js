// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id:""+event.id,
        info: ["","",""],
        name: event.name,
        password:event.password,
        islogin: false
        }
    })
  } catch (e) {
    console.error(e)
  }
}