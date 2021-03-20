class UserController {
  constructor () {}

  index = async (req, res, next) => {
    res.status(200).json({ message: 'index' })
  }

  edit = async (req, res, next) => {
    res.status(200).json({ message: 'edit' })
  }

  create = async (req, res, next) => {
    res.status(200).json({ message: 'create' })
  }

  update = async (req, res, next) => {
    res.status(200).json({ message: 'update' })
  }

  delete = async (req, res, next) => {
    res.status(200).json({ message: 'delete' })
  }
}

module.exports = UserController