// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 云函数入口函数
const db = cloud.database()
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const $ = db.command.aggregate
  return db
    .collection('task')
    .aggregate()
    .project({
      _id: 0,
      formatDate: $.dateToString({
        date: '$pdate',
        format: '%Y-%m-%d %H:%M'
      })
    })
    .end()
}