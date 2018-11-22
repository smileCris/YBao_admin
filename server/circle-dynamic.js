const { query } = require('../async-db')

// 妈妈圈动态数据
class CircleDynamic {

  // 列表
  async list(ctx) {
    let sql = 'SELECT * FROM circle_dynamic'
    let data = await query(sql)
    ctx.body = {
      code: 200,
      message: '请求成功！',
      data
    }
  }

  // 删除
  async delete(ctx) {
    ctx.req.on('data', async (data) => {
      let getdata = JSON.parse(data)
      let sql = 'DELETE FROM circle_dynamic WHERE id = ?'
      let params = [getdata.id]
      let resdata = await query(sql, params)
      console.log(resdata)
    })
    ctx.body = {
      code: 200,
      message: '请求成功！'
    }
  }
}

module.exports = new CircleDynamic()