// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => await db.collection('items').where({
  status: _.eq(0)
})
  .limit(MAX_LIMIT)
  .get()
