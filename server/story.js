const { query } = require('../async-db')
const date = new Date();
const now = date.toLocaleDateString() + ' ' + date.toLocaleTimeString('chinese', { hour12: false })

// 睡前故事数据
class StoryData {

  // 列表
  async list(ctx) {
    let sql = 'SELECT * FROM story_data'
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
      let sql = 'UPDATE story_data SET name = ? WHERE id = ?'
      let params = [getdata.name, getdata.id]
      let resdata = await query(sql, params)
      console.log(resdata)
    })
    ctx.body = {
      code: 200,
      message: '请求成功！',
    }
  }

  // 删除
  async delete(ctx) {
    ctx.req.on('data', async (data) => {
      let getdata = JSON.parse(data)
      let sql = 'DELETE FROM story_data WHERE id = ?'
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
      let getdata = JSON.parse(data)
      let sql = 'INSERT INTO story_data(name, file, img, ctime) VALUES(?, ?, ?, ?)'
      let params = [getdata.name, getdata.file, getdata.img, now]
      let resdata = await query(sql, params)
      console.log(resdata)
    })
    ctx.body = {
      code: 200,
      message: '请求成功！'
    }
  }
}

module.exports = new StoryData()