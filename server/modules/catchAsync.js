/**
 * 引数のpromiseオブジェクトのエラーハンドリングを行う
 */
module.exports = promise => {
  return promise.catch(err => {
    throw new Error(err)
  })
}