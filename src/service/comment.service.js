const connection = require('../app/database')

class CommentService {
  async create(content, momentId, userId) {
    try {
      const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES(?, ?, ?);`

      const [result] = await connection.execute(statement, [content, momentId, userId])

      return result
    } catch (error) {
      console.log(error)
    }
  }

  async reply(content, moment_id, user_id, comment_id) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES(?, ?, ?, ?);`

    const [result] = await connection.execute(statement, [content, moment_id, user_id, comment_id])

    return result
  }
}

module.exports = new CommentService()