const db = require('../models')
const UUID =require('uuid')
const purchaseRecord = db.purchaseRecord

exports.create = (req, res) => {
    const id = UUID.v1()
    const userAddress = req.body.user
    if (!userAddress) {
      res.status(400).send({
        message: 'address can not be empty!'
      })
      return
    }
    const parm = {
      id: id,
      userAddress: userAddress,
      buyID: req.body.buyID
    }
    purchaseRecord.create(parm)
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

exports.findAll = (req, res) => {
  if (req.query) {
    purchaseRecord.findAll({
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
    purchaseRecord.findAll()
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

exports.findOne = (req, res) => {
  const id = req.params.id
  purchaseRecord.findAll({
    where: {
      id: id
    }
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
}