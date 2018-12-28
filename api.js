const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

const path = require('path')
const static = require('koa-static')

const traffic = require('./server/traffic')
const story = require('./server/story')
const circleTheme = require('./server/circle-theme')
const circleDynamic = require('./server/circle-dynamic')
const question = require('./server/question')
const notice = require('./server/notice')
const admin = require('./server/admin')
const user = require('./server/user')

router
  // 数据分析模块
  .get('/api/traffic/all', traffic.selectAllData) // 总访问量
  .get('/api/traffic/circle', traffic.selectCircleData) // 妈妈圈访问量
  .get('/api/traffic/question', traffic.selectQuestionData) // 育儿问答访问量
  .get('/api/traffic/story', traffic.selectStoryData) // 睡前故事访问量

  // 睡前故事模块
  .get('/api/story/list', story.list) // 故事列表
  .post('/api/story/edit', story.edit) // 故事编辑
  .post('/api/story/delete', story.delete) // 删除故事
  .post('/api/story/add', story.add) // 添加故事
  .post('/api/story/addPic', story.addPic) // 添加故事-上传图片
  .post('/api/story/addFile', story.addFile) // 添加故事-上传文件

  // 妈妈圈模块
  .get('/api/circle/listTheme', circleTheme.list) // 主题列表
  .post('/api/circle/editTheme', circleTheme.edit) // 主题编辑
  .post('/api/circle/deleteTheme', circleTheme.delete) // 删除主题
  .post('/api/circle/addTheme', circleTheme.add) // 添加主题
  .get('/api/circle/listDynamic', circleDynamic.list) // 动态列表
  .post('/api/circle/deleteDynamic', circleDynamic.delete) // 删除动态

  // 育儿问答模块
  .get('/api/question/list', question.list) // 问答列表
  .post('/api/question/delete', question.delete) // 删除问答

  // 系统通知模块
  .get('/api/notice/list', notice.list) // 通知列表
  .post('/api/notice/edit', notice.edit) // 通知编辑
  .post('/api/notice/delete', notice.delete) // 删除通知
  .post('/api/notice/add', notice.add) // 添加通知

  // 系统管理模块
  .post('/api/admin/person', admin.person)  // 个人信息
  .get('/api/admin/list', admin.list) // 账号列表
  .post('/api/admin/stop', admin.stop) // 账号编辑
  .post('/api/admin/delete', admin.delete) // 删除账号
  .post('/api/admin/add', admin.add) // 添加账号

  // 用户管理模块
  .get('/api/user/list', user.list) // 用户列表
  .post('/api/user/stop', user.stop) // 用户编辑


app.use(router.routes(), router.allowedMethods())

app.on('error', () => {})
app.use(static(
  path.join(__dirname, '/server/upload/upload-files/common')
))

app.listen(3000, () => {
  console.log('应用实例，访问地址为  http://127.0.0.1:3000')
})