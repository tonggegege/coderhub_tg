const KoaRouter = require('@koa/router')
const { create } = require('../controller/file.controller')
const { handleAvater } = require('../middleware/file.middleware')
const {verifyAuth} = require('../middleware/login.middleware')

const fileRouter = new KoaRouter({ prefix: "/file" })



fileRouter.post("/avater", verifyAuth, handleAvater, create)

module.exports = fileRouter