const app = require('./index')
const port = 8000

app.listen(port, err => {
  if (err) console.log('aborting...')
  console.log(process.argv)
  console.log('listening... on', port)
})