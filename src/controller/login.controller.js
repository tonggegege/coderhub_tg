const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/keys");

class LoginController {
  sign(ctx, next) {
    try {
      const { id, name } = ctx.user;

      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        expiresIn: 24 * 60 * 60,
        algorithm: "RS256",
      });

      ctx.body = {
        code: 0,
        data: { id, name, token },
      };
    } catch (error) {
      console.log(error);
    }
  }

  test(ctx) {
    ctx.body = ctx.user
  }
}

module.exports = new LoginController();


