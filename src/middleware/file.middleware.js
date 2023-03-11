const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

const uploadAvater = multer({
  dest: UPLOAD_PATH
})

const handleAvater = uploadAvater.single('avater')

module.exports = {
  handleAvater
}