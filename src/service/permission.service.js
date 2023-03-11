const connection = require('../app/database')

class PermissionService {
  async queryTableUserIdIsEqualAuthId(resoureName, resourceId, userId) {
    const statement = `SELECT * FROM ${resoureName} WHERE id = ? AND user_id = ?;`

    const [result] = await connection.execute(statement, [resourceId, userId])
    return !!result.length
  }
}

module.exports = new PermissionService()