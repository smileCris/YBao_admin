const { query } = require('../async-db')

// 用户数据
class UserData {

  // 列表
  async list(ctx) {
    let sql = 'SELECT * FROM user_data'
    let data = await query(sql)
    ctx.body = {
      code: 200,
      message: '请求成功！',
      data
    }
  }

  // 禁用
  async stop(ctx) {
    ctx.req.on('data', async (data) => {
      let getdata = JSON.parse(data)
      let sql = 'UPDATE user_data SET status = ? WHERE id = ?'
      let params = [getdata.status, getdata.id]
      let resdata = await query(sql, params)
      console.log(resdata)
    })
    ctx.body = {
      code: 200,
      message: '请求成功！'
    }
  }
}

module.exports = new UserData()