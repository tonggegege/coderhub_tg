const KoaRouter = require('@koa/router')
const { showAvatar, create } = require('../controller/user.controller')

const userRouter = new KoaRouter({ prefix: '/users' })
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

userRouter.post('/', verifyUser, handlePassword, create)

userRouter.get('/avatar/:userId', showAvatar)

module.exports = userRouter