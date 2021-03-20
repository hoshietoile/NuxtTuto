// const ErrorHander = require('./../controllers/errorHandler')

/**
 * sending properly processed error.
 */
const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

/**
 * catch all application error
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  sendError(err, res)
}

module.exports = errorHandler
