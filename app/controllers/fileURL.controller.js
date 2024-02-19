const db = require('../models')
const fileURL = db.fileURL
const purchaseRecord = db.purchaseRecord

exports.findAll = (req, res) => {
  fileURL.findAll()
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error:'+err.message
      })
    })
}
exports.findOne = (req, res) => {
  const id = req.params.id
  const useraddress = req.query.user
  const permissions = req.query.permissions
  if (permissions === 'open') {
    fileURL.findAll({
      where: {
        id: id
      }
    }).then((data) => {
      res.send({
        code: 1,
        data: data
      })
    }).catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error:'+err.message
      })
    })
  } else {
    purchaseRecord.findAll({
      where: {
        buyID: id,
        userAddress: useraddress
      }
    }).then((data) => {
      if (data.length) {
        fileURL.findAll({
          where: {
            id: id
          }
        }).then((data) => {
          res.send({
            code: 1,
            data: data
          })
        }).catch((err) => {
          res.status(500).send({
            code: 0,
            message: 'Error:'+err.message
          })
        })
      } else {
        res.send({
          code: 0,
          message: 'No download permission'
        })
      }
    }).catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error:'+err.message
      })
    })
  }
}