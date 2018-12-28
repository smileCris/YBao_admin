const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

const fileProps = {
  img: '',
  file: ''
}

/**
 * 同步创建文件目录
 * @param {string} dirname 目录绝对地址
 * @return {boolean} 创建目录结果
 */
mkdirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param {string} fileName 获取上传文件的后缀名
 * @return {string} 文件后缀名
 */
getSuffixName = (fileName) => {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param {object} ctx koa上下文
 * @param {object} options 文件上传参数 fileType文件类型，path文件存放路径
 * @return {promise}
 */
uploadFile = (ctx, options) => {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({ headers: req.headers })

  // 获取类型
  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)
  let mkdirResult = mkdirsSync(filePath)

  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = {
      success: false,
      fileProps: ''
    }

    /**
     * 解析请求文件事件
     * @param {object} fieldname 上传文件标识
     * @param {object} file 上传的文件流句柄
     * @param {object} filename 文件名（含扩展名）
     * @param {object} encoding 文件编码类型
     * @param {object} mimetype 文件mime类型
     */
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      // Math.random().toString(16).substr(2)  0到1的随机数转16进制取小数点后的数
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      getSuffixName(filename).toLowerCase() == ('mp3' || 'wav') ? fileProps.file = fileName
        : getSuffixName(filename).toLowerCase() == ('jpg' || 'jpeg' || 'png' || 'gif')
          ? fileProps.img = fileName : ''
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到指定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', () => {
        result.success = true
        result.fileProps = fileProps
        console.log('文件上传成功！')
      })
    })

    // 解析结束事件
    busboy.on('finish', () => {
      console.log('文件上传结束！')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', (err) => {
      console.log('文件上传出错！')
      reject(result)
    })

    req.pipe(busboy)
  })
}

module.exports = {
  uploadFile
}