const connection = require("../app/database");

class MomentService {
  async create(content, userId) {
    const statement =
      "INSERT INTO `moment` (`content`, `user_id`) VALUES (?, ?);";

    const [result] = await connection.execute(statement, [content, userId]);

    return result;
  }

  // 使用子查询
  async queryList(offset = 0, limit = 10) {
    const statement = `
        SELECT
          m.id id,
          m.content content,
          m.createAt createTime,
          m.updateAt updataTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_Url ) AS user,
          (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) AS comment_count,
          (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) AS label_count
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id 
        LIMIT ? OFFSET ?;
      `;

    const [result] = await connection.execute(statement, [
      String(limit),
      String(offset),
    ]);

    return result;
  }

  // GROUP BY 通常和聚合函数一起使用
  async queryById(momentId) {
    try {
      const statement = `
      SELECT
          m.id id,
          m.content content,
          m.createAt createTime,
          m.updateAt updataTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatar_url', u.avatar_Url ) AS user, 
          (
            SELECT JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'user', JSON_OBJECT('id', us.id, 'name', us.name))) FROM comment c 
            LEFT JOIN user us ON us.id = c.user_id
            WHERE c.moment_id = m.id
          ) AS comments,
          JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)) AS labels
        FROM
        moment m
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN label l ON ml.label_id = l.id
        WHERE m.id = ?
        GROUP BY m.id;
        `;

      const [result] = await connection.execute(statement, [momentId]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  async modify(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;

    const [result] = await connection.execute(statement, [content, momentId]);

    return result;
  }

  async removeByMomentId(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`;

    const [result] = await connection.execute(statement, [momentId]);

    return result;
  }

  async hasLabels(momentId, labelId) {
    const statement = `SELECT * FROM moment_label ml WHERE moment_id = ? AND label_id = ?;`

    const [result] = await connection.execute(statement, [momentId, labelId])

    return !!result.length
  }

  async addLabels(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`

    const [result] = await connection.execute(statement, [momentId, labelId])

    return result
  }
}

module.exports = new MomentService();
