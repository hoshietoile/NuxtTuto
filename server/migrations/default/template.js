const db = require('../../db')
const handleDb = require('../../modules/handleDb')
const dropSql = ''

const createSql = ``
const migration = async () => {
  // log
  console.log('migration start')
  try {
    await handleDb.query(db, dropSql)
    await handleDb.query(db, createSql)
  } catch (e) {
    // log
    console.log('db query error happened', e)
    throw new Error(e)
  }
  // log
  console.log('migration end')
}

module.exports = migration