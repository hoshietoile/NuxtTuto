const handleAsync = require('./../modules/handleAsync')
const MigrationRepository = require('./../repositories/migrationRepository')
const execBulkMigrate = require('./../migrations/index')

class MigrationController {
  constructor () {
    this.repository = new MigrationRepository()
  }

  index = handleAsync(async (req, res, next) => {
    const migrations = await this.repository.index()
    res.status(200).json({ data: migrations })
  })

  edit = handleAsync(async (req, res, next) => {
    res.status(200).json({ message: 'edit' })
  })

  /**
   * マイグレーション情報のDB登録
   * マイグレーションファイルの作成
   */
  create = handleAsync(async (req, res, next) => {
    // 要サニタイズ
    const result = await this.repository.create(req.body)
    res.status(201).json({ data: result })
    // res.status(201).json({ message: 'successfully created.'})
  })

  /**
   * マイグレーション全実行
   */
  bulkMigrate = handleAsync(async (req, res, next) => {
    await execBulkMigrate(req.body.type)
    res.status(201).json({ message: 'successfully created.'})
  })

  update = handleAsync(async (req, res, next) => {
    res.status(200).json({ message: 'update' })
  })

  delete = handleAsync(async (req, res, next) => {
    res.status(200).json({ message: 'delete' })
  })
}

module.exports = MigrationController