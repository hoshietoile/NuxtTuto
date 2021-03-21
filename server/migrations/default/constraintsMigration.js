const db = require('../../db')
const handleDb = require('../../modules/handleDb')
const dropSql = 'DROP TABLE IF EXISTS constraints'

/**
 * ID auto-increment PK
 * カラムID
 * 制約種類
 */
const createSql = `
  CREATE TABLE constraints
  (
    id INT(10) AUTO_INCREMENT,
    table_col_id BIGINT,
    type TINYINT,
    PRIMARY KEY (id)
  )
`
const constraintsMigration = async () => {
  // log
  console.log('constraints migration start')
  try {
    await handleDb.query(db, dropSql)
    await handleDb.query(db, createSql)
  } catch (e) {
    // log
    console.log('db query error happened on constraints table', e)
    // await handleDb.rollback(db, e)
    throw new Error(e)
  }
  // log
  console.log('constraints migration end')
}

module.exports = constraintsMigration