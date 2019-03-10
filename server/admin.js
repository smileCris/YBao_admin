const { query } = require('../async-db')

// 管理员数据
class AdminData {

  // 账号详情
  async person(ctx) {
    let getdata = await new Promise((resovle, reject) => {
      try {
        ctx.req.on("data", (data) => {
          let parseData = JSON.parse(data)  
          let sql = 'SELECT * FROM admin_data WHERE username = ? and password = ?'
          let params = [parseData.username, parseData.password]
          let resdata = query(sql, params)
          resovle(resdata)
        })
      } catch (err) {
        reject(err)
      }
    })
    getdata.length == 0 ?
      ctx.body = {
        code: 500,
        message: '请求失败！'
      } :
      ctx.body = {
        code: 200,
        message: '请求成功！',
        getdata
      }
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
      let getdata = JSON.parse(data)
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
      let getdata = JSON.parse(data)
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
    let date = new Date()
    let now = date.toLocaleDateString() + ' ' + date.toLocaleTimeString('chinese', { hour12: false })
    ctx.req.on('data', async (data) => {
      let getdata = JSON.parse(data)
      let sql = 'INSERT INTO admin_data(username, password, status, avatar, email, address, ctime) VALUES(?, ?, ?, ?, ?, ?, ?)'
      let params = [
        getdata.username,
        getdata.password,
        1,
        getdata.avatar,
        getdata.email,
        getdata.address,
        now
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