const db = require('../../db')
const handleDb = require('../../modules/handleDb')
const dropSql = 'DROP TABLE IF EXISTS seeder_cols'

/**
 * ID auto-increment PK
 * シーダーID
 * フェイカータイプ
 */
const createSql = `
  CREATE TABLE seeder_cols
  (
    id INT(10) AUTO_INCREMENT,
    seeder_id BIGINT,
    faker_type BIGINT,
    PRIMARY KEY (id)
  )
`
const seederColsMigration = async () => {
  // log
  console.log('seeder_cols migration start')
  try {
    await handleDb.query(db, dropSql)
    await handleDb.query(db, createSql)
  } catch (e) {
    // log
    console.log('db query error happened on seeder_cols table', e)
    throw new Error(e)
  }
  // log
  console.log('seeder_cols migration end')
}

module.exports = seederColsMigration