const { query } = require('../async-db')
const { uploadFile } = require('./upload/upload')
const path = require('path')

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

  // 增加-图片上传
  async addPic(ctx) {
    let result = { success: false }
    let serverFilePath = path.join(__dirname, '/upload/upload-files')
    // 上传文件事件
    result = await uploadFile(ctx, {
      fileType: 'common', // common or album
      path: serverFilePath
    })
    ctx.body = {
      code: 200,
      message: '请求成功！',
      data: {
        img: result.fileProps.img
      }
    }
  }

  // 增加-文件上传
  async addFile(ctx) {
    let result = { success: false }
    let serverFilePath = path.join(__dirname, '/upload/upload-files')
    // 上传文件事件
    result = await uploadFile(ctx, {
      fileType: 'common', // common or album
      path: serverFilePath
    })
    ctx.body = {
      code: 200,
      message: '请求成功！',
      data: {
        file: result.fileProps.file
      }
    }
  }

  // 增加
  async add(ctx) {
    let date = new Date()
    let now = date.toLocaleDateString() + ' ' + date.toLocaleTimeString('chinese', { hour12: false })
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