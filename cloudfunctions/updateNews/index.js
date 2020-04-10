const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    let {name,data}=event
    return await db.collection('Schoolnews').where({name}).update({
      data
    })
  } catch (e) {
  }
}