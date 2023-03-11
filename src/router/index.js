const fs = require('fs')

function registerRouters(app) {
  // 读取当前目录下的所有文件
  const files = fs.readdirSync(__dirname)

  for(const file of files) {
    // 获取以.router.js为结尾的文件
    if(!file.endsWith('.router.js')) continue

    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }

}

module.exports = registerRouters