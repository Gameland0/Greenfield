const db = require('../models')
const MarketWhitelist = db.MarketWhitelist


exports.findAll = (req, res) => {
  if (req.query) {
    MarketWhitelist.findAll({
      where: req.query
    })
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
  } else {
    MarketWhitelist.findAll()
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
}