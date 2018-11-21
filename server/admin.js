const { query } = require('../async-db')
const date = new Date();
const now = date.toLocaleDateString() + ' ' + date.toLocaleTimeString('chinese', { hour12: false })

// 管理员数据
class AdminData {

  // 账号详情
  async person(ctx) {
    let resdata = {}
    // return new Promise((resolve, reject) => {
    try {
      ctx.req.on('data', async (data) => {
        let getdata = JSON.parse(data.toString())
        let sql = 'SELECT * FROM admin_data WHERE username = ? and password = ?'
        let params = [getdata.username.toString(), getdata.password.toString()]
        resdata = await query(sql, params)
        console.log(resdata)
      })
    } catch (err) {
      console.log(err)
    }
    ctx.body = {
      code: 200,
      message: '请求成功！',
      resdata
    }
    // })
  }

  // 列表
  async list(ctx) {
    let sql = 'SELECT * FROM admin_data'
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
      let getdata = JSON.parse(data.toString())
      let sql = 'UPDATE admin_data SET status = ? WHERE id = ?'
      let params = [getdata.status, getdata.id]
      let resdata = await query(sql, params)
      console.log(resdata)
    })
    ctx.body = {
      code: 200,
      message: '请求成功！'
    }
  }

  // 删除
  async delete(ctx) {
    ctx.req.on('data', async (data) => {
      let getdata = JSON.parse(data.toString())
      let sql = 'DELETE FROM admin_data WHERE id = ?'
      let params = [getdata.id]
      let resdata = await query(sql, params)
      console.log(resdata)
    })
    ctx.body = {
      code: 200,
      message: '请求成功！'
    }
  }

  // 增加
  async add(ctx) {
    ctx.req.on('data', async (data) => {
      let getdata = JSON.parse(data.toString())
      let sql = 'INSERT INTO admin_data(username, password, avatar, email, address, ctime) VALUES(?, ?, ?, ?, ?, ?)'
      let params = [
        getdata.username.toString(),
        getdata.password.toString(),
        getdata.avatar.toString(),
        getdata.email.toString(),
        getdata.address.toString(),
        now.toString()
      ]
      let resdata = await query(sql, params)
      console.log(resdata)
    })
    ctx.body = {
      code: 200,
      message: '请求成功！'
    }
  }
}

module.exports = new AdminData()