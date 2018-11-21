const { query } = require('../async-db')

// 访问量数据
class TrafficData {

  // 获得总访问量数据
  async selectAllData(ctx) {
    let sql = 'SELECT * FROM traffic_all'
    let data = await query(sql)
    ctx.body = {
      code: 200,
      message: '请求成功！',
      data
    }
  }

  // 获得妈妈圈访问量
  async selectCircleData(ctx) {
    let sql = 'SELECT * FROM traffic_circle'
    let data = await query(sql)
    ctx.body = {
      code: 200,
      message: '请求成功！',
      data
    }
  }

  // 获得育儿问答访问量
  async selectQuestionData(ctx) {
    let sql = 'SELECT * FROM traffic_question'
    let data = await query(sql)
    ctx.body = {
      code: 200,
      message: '请求成功！',
      data
    }
  }

  // 获得睡前故事访问量
  async selectStoryData(ctx) {
    let sql = 'SELECT * FROM traffic_story'
    let data = await query(sql)
    ctx.body = {
      code: 200,
      message: '请求成功！',
      data
    }
  }
}

module.exports = new TrafficData()