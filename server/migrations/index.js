const fs = require('fs')
const path = require('path')
const util = require('util')
const basename = path.basename(__filename)
const db = require('./../db')
const handleDb = require('./../modules/handleDb')

// const mapFiles = async type => {
//   // type: defaultの場合はアプリケーションデフォルトマイグレーション実行
//   const root = type === 0 ? 'default' : '' 
//   const migrations = []
//   fs
//     .readdirSync(path.join(__dirname, root))
//     .filter(file => {
//       return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
//     })
//     .forEach(file => {
//       const migration = require(path.join(__dirname, file))
//       migrations.push(migration())
//     })
//   return migrations
// }

// TODO: マイグレーションの順番をどう解決するか
// 各ファイルにキー情報を持たせておいてソートするか
// Promiseは逐次順番に実行するように修正
const mapFilesAsync = async type => {
  // type: defaultの場合はアプリケーションデフォルトマイグレーション実行
  const workDir = type === 0 ? 'default' : '' 
  const root = path.join(__dirname, workDir)
  const migrations = []
  const files = await util.promisify(fs.readdir)(root)
    .catch(err => {
      throw new Error(err)
    })
  files.filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      const migration = require(path.join(root, file))
      migrations.push(migration())
    })
  return migrations
}

const exec = async type => {
  try {
    const migrations = await mapFilesAsync(type)
    await handleDb.beginTransaction(db)
    await Promise.all(migrations)
      .catch(err => {
        throw new Error(err)
      })
    await handleDb.commit(db)
  } catch (e) {
    console.log('db connection error', e)
    await handleDb.rollback(db, e)
  } finally {
    db.end()
  }
}

// exec(0)
module.exports = exec