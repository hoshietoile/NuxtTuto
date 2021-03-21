const db = require('../../db')
const handleDb = require('../../modules/handleDb')
const dropSql = 'DROP TABLE IF EXISTS migrations'

/**
 * ID auto-increment PK
 * テーブル名
 * テーブル名(物理名)
 */
const createSql = `
  CREATE TABLE migrations
  (
    id INT(10) AUTO_INCREMENT,
    table_name VARCHAR(32),
    concrete_name VARCHAR(32),
    PRIMARY KEY (id)
  )
`
const migrationMigration = async () => {
  // log
  console.log('migrations migration start')
  try {
    await handleDb.query(db, dropSql)
    await handleDb.query(db, createSql)
  } catch (e) {
    // log
    console.log('db query error happened on migrations table', e)
    // await handleDb.rollback(db, e)
    throw new Error(e)
  }
  // log
  console.log('migrations migration end')
}

module.exports = migrationMigration
