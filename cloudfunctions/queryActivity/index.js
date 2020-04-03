const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    let res = await db.collection('activity').where(event.data).orderBy("date", 'desc').limit(event.limit).skip(event.num).get();
    res.totalnum = await db.collection('activity').where({
      state: event.data.state,
    }).count();
    return res;
  } catch (e) {
  }
}