const { create, reply } = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { id } = ctx.user;

    const { content, moment_id } = ctx.request.body;

    const result = await create(content, moment_id, id);

    ctx.body = {
      code: 0,
      result,
    };
  }

  async reply(ctx, next) {
    const { id } = ctx.user

    const { content, moment_id, comment_id } = ctx.request.body

    const result = await reply(content, moment_id, id, comment_id)

    ctx.body = {
      code: 0,
      result
    }
  }
}

module.exports = new CommentController();
