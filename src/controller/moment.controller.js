const { create, queryList, queryById, modify, removeByMomentId, hasLabels, addLabels } = require("../service/moment.service")

class MomentController {
  async create(ctx, next) {
    const { content } = ctx.request.body
    const { id } = ctx.user

    const result = await create(content, id)

    ctx.body = {
      code: 0,
      result
    }
  }

  async list(ctx, next) {
    const { offset, limit } = ctx.query
    const data = await queryList(offset, limit)

    ctx.body = {
      code: 0,
      data
    }
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params
    const data = await queryById(momentId)

    ctx.body = {
      code: 0,
      data
    }
  }

  async modify(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    
    const result = await modify(content, momentId)

    ctx.body = {
      code: 0,
      result
    }
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await removeByMomentId(momentId)

    ctx.body = {
      code: 0,
      result
    }
  }

  async addLabels(ctx, next) {
    const { momentId } = ctx.params
    const labels = ctx.labels

    for (const label of labels) {
      const isLabel = await hasLabels(momentId, label.id)

      if (isLabel) continue

      await addLabels(momentId, label.id)
    }


    ctx.body = {
      code: 0,
      message: "动态添加标签成功"
    }
  }
}

module.exports = new MomentController()