const KoaRouter = require("@koa/router");
const {
  create,
  list,
  detail,
  modify,
  remove,
  addLabels,
} = require("../controller/moment.controller");
const { verifyLabelIsExists } = require("../middleware/label.middleware");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/", verifyAuth, create);

// 查询部分动态信息
momentRouter.get("/", list);

// 查询一个人的动态
momentRouter.get("/:momentId", detail);

// 修改自己的动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, modify);

// 删除自己的动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

// 根据自己的动态创建自己的标签
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelIsExists, addLabels)

module.exports = momentRouter;
