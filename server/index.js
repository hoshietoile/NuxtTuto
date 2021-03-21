const express = require('express')
const app = express()
const cors = require('cors')
const ErrorHandler = require('./controllers/errorHandler.js')
const globalErrorHandler = require('./middlewares/globalErrorHandler.js')

// === for debug ===
let prefix = ''
if (process.argv[1].indexOf('debug') !== -1) {
  prefix = '/api'
}
// === for debug ===
// app.use(cors({origin: true, credentials: true}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require('./routes/userRoute')
const migrationRouter = require('./routes/migrationRoute')
const seederRouter = require('./routes/seederRoute')

app.use(`${prefix}/users`, userRouter)
app.use(`${prefix}/migrations`, migrationRouter)
app.use(`${prefix}/seeders`, seederRouter)

app.all(`${prefix}/*`, (req, _, next) => {
  next(new ErrorHandler(`can't resolve provided path ${req.originalUrl} on this server.`))
})

app.use(globalErrorHandler)

module.exports = app