const mysql = require('mysql2')

const connnectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: 'Leo20020112.',
  connectionLimit: 5
})

// 判断连接是否成功
connnectionPool.getConnection((err, connection) => {
  if(err) {
    console.log('连接失败', err)
    return
  }

  connection.connect(err => {
    if (err) {
      console.log('和数据交互失败', err)
    } else {
      console.log('数据库连接成功，可以操作数据库')
    }
  })
})

const connection = connnectionPool.promise()
module.exports = connection