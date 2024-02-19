const path = require("path")
const db = require('../models')
const fs = require("fs")
const fileInfo = db.fileInfo

function checkFileExistsSync(filePath) {
  console.log('filePath:',filePath)
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true
  } catch (error) {
    return false
  }
}

exports.readfile = (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  const randomcoding = req.query.contract
  fileInfo.findAll({
    where: {
      coding: randomcoding
    }
  })
    .then((data) => {
      if (data.length) {
        let filepath =  path.join(__dirname,'../../../Matedata/'+data[0].nftAddress+'/'+req.query.filename)
        const state = checkFileExistsSync(filepath)
        if (state) {
          const Stream = fs.createReadStream(filepath)
          Stream.pipe(res)
        } else {
          res.status(500).send({
            code: 0,
            message: 'Error: The file was not found'
          })
        }
      } else {
        res.status(500).send({
          code: 0,
          message: 'Error: The file was not found'
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error:'+err.message
      })
    })
}