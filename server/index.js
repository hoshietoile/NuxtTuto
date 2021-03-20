const express = require('express')
const app = express()
const cors = require('cors')
const ErrorHandler = require('./controllers/errorHandler.js')
const globalErrorHandler = require('./middlewares/globalErrorHandler.js')

// === for debug ===
let appendix = ''
if (process.argv[1].indexOf('debug') !== -1) {
  appendix = '/api'
}
// === for debug ===
// app.use(cors({origin: true, credentials: true}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require('./routes/userRoute')
app.use(`${appendix}/users`, userRouter)

app.all(`${appendix}/*`, (req, _, next) => {
  next(new ErrorHandler(`can't resolve provided path ${req.originalUrl} on this server.`))
})

app.use(globalErrorHandler)

module.exports = app