const { create } = require("../service/file.service")
const { SERVER_PORT, SERVER_HOST } = require("../config/server")
const { updateAvaterToUse } = require("../service/user.service")

class FileController {
  async create(ctx, next) {
    try {
      const { filename, mimetype, size } = ctx.file
      console.log(ctx.file)
      const { id } = ctx.user
      const result = await create(filename, mimetype, size, id)
      console.log(filename, mimetype, size)
      const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
      await updateAvaterToUse(avatarUrl, id)

      ctx.body = {
        code: 0,
        result,
        message: "头像创建成功~"
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new FileController()