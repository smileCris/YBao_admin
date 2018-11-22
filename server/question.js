const { query } = require('../async-db')

// 育儿问答数据
class QuestionData {

  // 列表
  async list(ctx) {
    let sql = 'SELECT * FROM question_data'
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
      let sql = 'DELETE FROM question_data WHERE id = ?'
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

module.exports = new QuestionData()