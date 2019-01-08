const { query } = require('../async-db')

// 通知数据
class NoticeData {

  // 列表
  async list(ctx) {
    let sql = 'SELECT * FROM notice_data'
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
      let sql = 'UPDATE notice_data SET content = ? WHERE id = ?'
      let params = [getdata.content, getdata.id]
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
      let sql = 'DELETE FROM notice_data WHERE id = ?'
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
      let sql = 'INSERT INTO notice_data(content, ctime) VALUES(?, ?)'
      let params = [getdata.content, now]
      let resdata = await query(sql, params)
      console.log(resdata)
    })
    ctx.body = {
      code: 200,
      message: '请求成功！'
    }
  }
}

module.exports = new NoticeData()