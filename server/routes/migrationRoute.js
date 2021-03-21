const express = require('express')
const migrationRouter = express.Router()
const MigrationController = require('../controllers/migrationController')
const migrationController = new MigrationController()

migrationRouter
  .route('/')
  .get(migrationController.index)
  .post(migrationController.create)
migrationRouter
  .route('/:id')
  .get(migrationController.edit)
  .patch(migrationController.update)
  .delete(migrationController.delete)

module.exports = migrationRouter