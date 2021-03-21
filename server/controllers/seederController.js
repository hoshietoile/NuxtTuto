const handleAsync = require('./../modules/handleAsync')
const SeederRepository = require('./../repositories/seederRepository')

class SeederController {
  constructor () {
    this.repository = new SeederRepository()
  }

  index = handleAsync(async (req, res, next) => {
    const seeders = await this.repository.index()
    res.status(200).json({ message: seeders })
  })

  edit = handleAsync(async (req, res, next) => {
    res.status(200).json({ message: 'edit' })
  })

  create = handleAsync(async (req, res, next) => {
    res.status(200).json({ message: 'create' })
  })

  update = handleAsync(async (req, res, next) => {
    res.status(200).json({ message: 'update' })
  })

  delete = handleAsync(async (req, res, next) => {
    res.status(200).json({ message: 'delete' })
  })
}

module.exports = SeederController