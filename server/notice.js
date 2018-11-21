const { query } = require('../async-db')
const date = new Date();
const now = date.toLocaleDateString() + ' ' + date.toLocaleTimeString('chinese', { hour12: false })

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
      let getdata = JSON.parse(data.toString())
      let sql = 'UPDATE notice_data SET content = ? WHERE id = ?'
      let params = [getdata.content.toString(), getdata.id]
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
    ctx.req.on('data', async (data) => {
      let getdata = JSON.parse(data.toString())
      let sql = 'INSERT INTO notice_data(content, ctime) VALUES(?, ?)'
      let params = [getdata.content.toString(), now.toString()]
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