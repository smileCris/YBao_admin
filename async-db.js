const mysql = require('mysql')

// 创建数据池
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'ybao_db'
})

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    // 在数据池中进行会话操作
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          // 如果有错误就抛出
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }