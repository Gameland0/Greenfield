const db = require('../models')
const UUID =require('uuid')
const likeFile = db.likeFile

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
      likeID: req.body.likeID
    }
    likeFile.create(parm)
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
    likeFile.findAll({
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
    likeFile.findAll()
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

exports.delete = (req, res) => {
  const id = req.params.id
  likeFile.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'deleted successfully!'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot delete with id=${id}.`
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