const { query } = require('../async-db')

// 妈妈圈主题数据
class CircleTheme {

  // 列表
  async list(ctx) {
    let sql = 'SELECT * FROM circle_theme'
    let data = await query(sql)
    ctx.body = {
      code: 200,
      message: '请求成功！',
      data
    }
  }

  // 编辑
  async edit(ctx) {
    ctx.req.on('data', async (data) => {
      let getdata = JSON.parse(data)
      let sql = 'UPDATE circle_theme SET theme = ? WHERE id = ?'
      let params = [getdata.theme, getdata.id]
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
      let sql = 'DELETE FROM circle_theme WHERE id = ?'
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
      let getdata = JSON.parse(data.toString())
      let sql = 'INSERT INTO circle_theme(theme, accountName, ctime) VALUES(?, ?, ?)'
      let params = [getdata.theme.toString(), getdata.accountName.toString(), now.toString()]
      let resdata = await query(sql, params)
      console.log(resdata)
    })
    ctx.body = {
      code: 200,
      message: '请求成功！'
    }
  }
}

module.exports = new CircleTheme()