export default ({ $axios, redirect }) => {
  $axios.onRequest(config => {
    console.log('hello from request: ' + config.url)
  })
  $axios.onError(err => {
    const code = parseInt(err.response && err.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}