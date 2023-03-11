const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require("../config/error")
const userService = require('../service/user.service')
const md5password = require("../utils/md5-password")

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
 
  // 差一个功能 名字和密码要什么格式 需要几个字符（正则）
  const user = await userService.query(name)
  if (user.length) {
    return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
  }

  await next()
}

const handlePassword = async(ctx, next) => {
  const { password } = ctx.request.body

  ctx.request.body.password = md5password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}