const db = require('../db')
const {
  beginTransaction,
  query,
  commit,
  rollback
} = require('./../modules/handleDb')

class UserRepository {
  constructor () {
    this.db = db
  }

  index = async () => {
    try {
      await beginTransaction(this.db)
      const users = await query(this.db, 'SELECT * FROM migrations')
      await commit(this.db)
      return users
    } catch(e) {
      await rollback(this.db, e)
      throw new Error(e)
    }
  }
}
module.exports = UserRepository