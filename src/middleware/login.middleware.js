const jwt = require('jsonwebtoken')
const { NAME_OR_PASSWORD_IS_REQUIRED, PASSWORD_IS_INCORRENT, NAME_IS_NOT_EXISTS, UNAUTHORIZATION } = require("../config/error")
const { query } = require('../service/user.service')
const md5Password = require('../utils/md5-password')
const { PUBLIC_KEY } = require('../config/keys')

const verifyLogin = async function(ctx, next) {
  const { name, password } = ctx.request.body

  if(!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  const users = await query(name)
  const user = users[0]

  if(!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }

  ctx.user = user

  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization

  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }

  const token = authorization.replace('Bearer ', '')

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })

    ctx.user = result
    await next()
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}