const express = require('express')
const seederRouter = express.Router()
const SeederController = require('./../controllers/seederController')
const seederController = new SeederController()

seederRouter
  .route('/')
  .get(seederController.index)
  .post(seederController.create)
seederRouter
  .route('/:id')
  .get(seederController.edit)
  .patch(seederController.update)
  .delete(seederController.delete)

module.exports = seederRouter