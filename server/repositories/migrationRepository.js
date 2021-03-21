const fs = require('fs').promises
const readline = require('readline')
const path = require('path')
const promisify = require('util').promisify
const { validate } = require('mysql-query-validator')
const { format } = require('sql-formatter')
const catchAsync = require('./../modules/catchAsync')
const CONSTS = require('./../config/consts')
const db = require('../db')
const {
  beginTransaction,
  query,
  commit,
  rollback
} = require('./../modules/handleDb')

class MigrationRepository {
  constructor () {
    this.db = db
    this.resource = 'migrations'
    this.migrationDir = path.join(__dirname, './../migrations')
  }

  index = async () => {
    try {
      await beginTransaction(this.db)
      const migrations = await query(this.db, 'SELECT * FROM migrations')
      await commit(this.db)
      return migrations
    } catch(e) {
      await rollback(this.db, e)
      throw new Error(e)
    }
  }

  // 同じテーブルが存在するかチェックしたほうが良い？
  create = async data => {
    const self = this
    const {
      table,
      cols
    } = data
    let migrationId = null

    try {  
      // 全非同期処理についてトランザクション張れているか要検証
      await beginTransaction(self.db)
      // マイグレーション情報のDB登録
      migrationId = await catchAsync(self._genMigrationQuery(table))
      // テーブルカラム情報のDB登録 制約情報のDB登録
      await catchAsync(self._genColQuery(migrationId, cols))
      await commit(self.db)
    } catch(e) {
      await rollback(self.db, e)
      throw new Error(e)
    }

    const tableName = table.params.table_name
    const dropTable = `const dropSql = 'DROP TABLE IF EXISTS ${tableName}'`
    const createTable = `CREATE TABLE ${tableName}`
    const details = cols.map(col => {
      const params = col.params
      const colName = params.col_name
      const dataType = CONSTS.DATA_TYPE[params.type]
      const constraints = params.constraints
      const constraintsStr = constraints.reduce((reducer, current) => {
        const type = current.params.type
        const str = CONSTS.CONSTRAINT_TYPE[type]
        return `${reducer} ${str}`
      }, "")
      return `${colName} ${dataType} ${constraintsStr}`.trim()
    })
    const colStr = `(${details.join(',')})`
    const resultSql = `${createTable}${colStr}`.trim()

    // バリデーション実行
    try {
      validate(resultSql)
    } catch (e) {
      throw new Error(e.message)
    }

    // マイグレーションファイル作成
    try {
      const formattedSql = format(resultSql)
      const template = await catchAsync(
        fs.readFile(path.join(this.migrationDir, 'default/template.js'), 'utf-8')
      )
      const processed = template
        .replace(`const dropSql = ''`, dropTable)
        .replace(`const createSql = ''`, 'const createSql = `\n' + formattedSql + '\n`')
      await catchAsync(
        fs.writeFile(path.join(this.migrationDir, `${tableName}Migration.js`),
        processed
      ))
    } catch(e) {
      throw new Error(e)
    }

    return migrationId
  }
  // ==============
  // private_funcs
  // ==============
  /**
   * マイグレーションデータ新規挿入
   * @param {object} data 
   * @returns migrationId
   */
  _genMigrationQuery = async data => {
    const self = this
    const table = self.resource
    const statement = `INSERT INTO ${table} SET ? `
    const queryParams = self._mapAcceptedParams(data.params, ['table_name', 'concrete_name'])
    const results = await catchAsync(query(self.db, statement, queryParams))
    return results.insertId
  }

  /**
   * カラムデータ新規挿入
   * @param {number} migrationId 
   * @param {array} data 
   * @return void
   */
  _genColQuery = async (migrationId, data) => {
    const self = this
    const table = 'table_cols'
    const queries = []
    const statement = `INSERT INTO ${table} SET ? `
    data.forEach(d => {
      const sanitized = self._mapAcceptedParams(d.params, ['type', 'col_name', 'concrete_name'])
      const queryParams = { ...sanitized, migration_id: migrationId }
      queries.push(
        query(self.db, statement, queryParams)
          .then(async res => {
            const colId = res.insertId
            // 制約のクエリ
            await self._genConstraintQuery(colId, d.params.constraints)
          })
      )
    })
    // カラム配列のクエリ実行
    await catchAsync(Promise.all(queries))
  }

  /**
   * 制約データ新規挿入
   * @param {number} colId 
   * @param {array} constraints 
   * @return void
   */
  _genConstraintQuery = async (colId, constraints) => {
    const self = this
    const table = 'constraints'
    const queries = []
    const statement = `INSERT INTO ${table} SET ? `
    constraints.forEach(c => {
      const sanitized = self._mapAcceptedParams(c.params, ['type'])
      const queryParams = { ...sanitized, table_col_id: colId }
      queries.push(query(self.db, statement, queryParams))
    })
    // 制約配列のクエリ実行
    await catchAsync(Promise.all(queries))
  }

  /**
   * set only accepted params to newly created object
   * @param {object} target 
   * @param {array} accept 
   * @returns {object}
   */
  _mapAcceptedParams = (target, accepts) => {
    const mapped = {}
    accepts.forEach(accept => {
      mapped[accept] = target[accept]
    })
    return mapped
  }
}

module.exports = MigrationRepository