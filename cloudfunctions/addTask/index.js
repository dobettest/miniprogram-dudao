const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    let type = 0;
    let res = await db.collection('task').where({
      name: event.title
    }).get();
    if (res.data.length > 0)
      return null;
    else {
      let res1 = await db.collection('admin').where({
        user_id: event.user_id
      }).get();
      if (res1.data.length > 0 && event.sf == 0)
        type = 1;
      return db.collection('task').add({
        data: {
          name: event.title,
          state: event.state,
          user_id: event.user_id,
          type: type,
          pdate:event.pdate,
          fdate: '',
          bz: event.bz,
          fid: event.fid || [],
          dep_id: event.dep_id
        }
      })
    }
  } catch (e) {
    return e
  }
}