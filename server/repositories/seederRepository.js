const db = require('../db')
const {
  beginTransaction,
  query,
  commit,
  rollback
} = require('./../modules/handleDb')

class SeederRepository {
  constructor () {
    this.db = db
  }

  index = async () => {
    try {
      await beginTransaction(this.db)
      const seeders = await query(this.db, 'SELECT * FROM seeders')
      await commit(this.db)
      return seeders
    } catch(e) {
      await rollback(this.db, e)
      throw new Error(e)
    }
  }
}
module.exports = SeederRepository