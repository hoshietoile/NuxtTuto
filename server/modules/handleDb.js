const beginTransaction = con => {
  return new Promise((resolve, reject) => {
    con.beginTransaction(err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const query = (con, statement, params) => {
  return new Promise((resolve, reject) => {
    con.query(statement, params, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(results, fields)
      }
    })
  })
}

const commit = con => {
  return new Promise((resolve, reject) => {
    con.commit(err => {
      if (err) {
        reject(err)
      } else {
        resolve(err)
      }
    })
  })
}

const rollback = (con, err) => {
  return new Promise((resolve, reject) => {
    con.rollback(() => {
      reject(err)
    })
  })
}

module.exports = {
  beginTransaction,
  query,
  commit,
  rollback
}