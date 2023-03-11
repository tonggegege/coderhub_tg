const connection = require('../app/database')

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`

    const [result] = await connection.execute(statement, [name])

    return result
  }

  async list() {
    const statement = `SELECT * FROM label;`

    const [result] = await connection.execute(statement)

    return result
  }

  async queryLabelByname(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`

    const [result] = await connection.execute(statement, [name])

    return result[0]
  }
}

module.exports = new LabelService()