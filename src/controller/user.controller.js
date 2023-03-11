const fs = require('fs')
const { queryAvatar } = require("../service/file.service");
const userService = require("../service/user.service");
const { UPLOAD_PATH } = require("../config/path")

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;
    await userService.create(user);

    ctx.body = "注册用户成功";
  }

  // 从本地服务器文件中读取文件才能在客户端展示
  async showAvatar(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await queryAvatar(userId)

    const { filename, mimetype } = avatarInfo

    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }

}

module.exports = new UserController();
