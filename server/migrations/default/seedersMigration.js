const db = require('../../db')
const handleDb = require('../../modules/handleDb')
const dropSql = 'DROP TABLE IF EXISTS seeders'

/**
 * ID auto-increment PK
 * テーブル名
 * テーブル名(物理名)
 */
const createSql = `
  CREATE TABLE seeders
  (
    id INT(10) AUTO_INCREMENT,
    migration_id BIGINT,
    table_name VARCHAR(32),
    concrete_name VARCHAR(32),
    PRIMARY KEY (id)
  )
`
const seederMigration = async () => {
  // log
  console.log('seeders migration start')
  try {
    await handleDb.query(db, dropSql)
    await handleDb.query(db, createSql)
  } catch (e) {
    // log
    console.log('db query error happened on seeders table', e)
    // await handleDb.rollback(db, e)
    throw new Error(e)
  }
  // log
  console.log('seeders migration end')
}

module.exports = seederMigration