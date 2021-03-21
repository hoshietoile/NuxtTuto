const db = require('../../db')
const handleDb = require('../../modules/handleDb')
const dropSql = 'DROP TABLE IF EXISTS table_cols'

/**
 * ID auto-increment PK
 * マイグレーション(テーブル)ID
 * 型種類
 * カラム名
 * カラム名(物理名)
 */
const createSql = `
  CREATE TABLE table_cols
  (
    id INT(10) AUTO_INCREMENT,
    migration_id BIGINT,
    type TINYINT,
    col_name VARCHAR(32),
    concrete_name  VARCHAR(32),
    PRIMARY KEY (id)
  )
`
const tableColsMigration = async () => {
  // log
  console.log('table_cols migration start')
  try {
    await handleDb.query(db, dropSql)
    await handleDb.query(db, createSql)
  } catch (e) {
    // log
    console.log('db query error happened on table_cols table', e)
    // await handleDb.rollback(db, e)
    throw new Error(e)
  }
  // log
  console.log('table_cols migration end')
}

module.exports = tableColsMigration