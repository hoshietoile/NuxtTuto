const express = require('express')
const userRouter = express.Router()
const UserController = require('./../controllers/userController')
const userController = new UserController()

userRouter
  .route('/')
  .get(userController.index)
  .post(userController.create)
userRouter
  .route('/:id')
  .get(userController.edit)
  .patch(userController.update)
  .delete(userController.delete)

module.exports = userRouter