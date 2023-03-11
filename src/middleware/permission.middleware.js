const { OPERATION_IS_NOT_ALLOWED } = require("../config/error");
const {
  queryTableUserIdIsEqualAuthId,
} = require("../service/permission.service");

const verifyPermission = async function (ctx, next) {
  const { id } = ctx.user;

  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");

  const result = await queryTableUserIdIsEqualAuthId(
    resourceName,
    resourceId,
    id
  );
  if (!result) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }

  await next();
};

module.exports = {
  verifyPermission,
};
