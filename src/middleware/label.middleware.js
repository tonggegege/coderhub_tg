const { create, queryLabelByname } = require("../service/label.service")


class LabelMiddleware {
  async verifyLabelIsExists(ctx, next) {
    const { labels } = ctx.request.body
    const newLabels = []
    for (const name of labels) {
      const result = await queryLabelByname(name)

      const labelObject = { name }
      if (result) {
        labelObject.id = result.id
      } else {
        const result = await create(name)
        labelObject.id = result.insertId
      }

      newLabels.push(labelObject)
    }

    ctx.labels = newLabels
    await next()
  }
}

module.exports = new LabelMiddleware()
