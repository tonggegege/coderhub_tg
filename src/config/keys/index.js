const fs = require('fs')
const path = require('path')

// 默认情况下相对目录和node程序的启动目录有关系 启动目录详见（package.json）
// 以下这种方法错误
// const PRIVATE_KEY = fs.readFileSync('./private.key')
// const PUBLIC_KEY = fs.readFileSync('./public.key')

// path.resolve拼接绝对路径
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './public.key'))

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}