const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user

    const statement = 'INSERT INTO `user` (`name`, `password`) VALUES (?, ?);'

    const [result] = await connection.execute(statement, [name, password])
    return result
  }

  async query(name) {
    const statement = 'SELECT * from `user` WHERE `name` = ?;' 

    const [result] = await connection.execute(statement, [name])
    return result
  }

  async updateAvaterToUse(avatarUrl, userId) {
    console.log(userId)
    try {
      const statement = `UPDATE user SET avatar_Url = ? WHERE id = ?;`

      const [result] = await connection.execute(statement, [avatarUrl, userId])

      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UserService()