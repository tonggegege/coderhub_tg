const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')
require('../app/database')

const app = new Koa()

app.use(bodyParser())
registerRouters(app)

module.exports = app