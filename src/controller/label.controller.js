const { create, list } = require("../service/label.service")

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body

    const result = await create(name)

    ctx.body = {
      code: 0,
      message: "创建标签成功~",
      result
    }
  }

  async list(ctx, next) {
    const data = await list()

    ctx.body = {
      code: 0,
      data
    }
  }
}

module.exports = new LabelController()