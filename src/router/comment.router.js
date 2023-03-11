const KoaRouter = require('@koa/router')
const { create, reply } = require('../controller/comment.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const commentRouter = new KoaRouter({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, create)

commentRouter.post('/reply', verifyAuth, reply)

module.exports = commentRouter