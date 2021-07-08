const path = require('path')
const fs = require('fs')

module.exports = (app) => {
  let files = fs.readdirSync(path.join(__dirname, './api'))
  files.forEach((p) => {
    let pathMap = require(path.join(__dirname, './api', p))
    for (let [pathStr, val] of Object.entries(pathMap)) {
      let method = val.method
      let data = val.data
      app[method](`/northstar${pathStr}`, function (req, res) {
        res.json({
          status: 200,
          message: null,
          data: data
        })
      })
    }
  })
}
