const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  try {
     let res= await db.collection('activity').where({name:event.title}).get()//.then(res=>
     if(res.data.length>0)
     return null;
      else
        return db.collection('activity').add({ data: { name: event.title, state: 0,date:db.serverDate(),fid:event.fid||[],dep_id:event.dep_id||0} })
  } catch (e) {
    console.error(e)
  }
}