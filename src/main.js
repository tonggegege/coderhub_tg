const app = require("./app");
const { SERVER_PORT } = require("./config/server");
require('./utils/handle-error')

app.listen(SERVER_PORT, () => {
  console.log("coderhub的服务器启动成功");
});
