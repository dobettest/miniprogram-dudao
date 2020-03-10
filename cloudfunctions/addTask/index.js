const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    let res= await db.collection('task').where({ name: event.title}).get();
      if (res.data.length> 0)
       return null;
    else
        return db.collection('task').add({ data: { name: event.title, state: event.state, user_id: event.uid, date: db.serverDate(), bz: event.bz, fid: event.fid || []} })
  } catch (e) {
    console.error(e)
  }
}