const db = require('../models')
const UUID =require('uuid')
const fileScore = db.fileScore


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
      scoreAddress: userAddress,
      fileID: req.body.fileID,
      score: req.body.score
    }
    fileScore.create(parm)
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
    fileScore.findAll({
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

exports.update = (req, res) => {
  const id = req.params.id
  fileScore.update(req.body, {
    where: { id: id }
  }).then((num) => {
    if (num == 1) {
      res.send({
        code: 1,
        message: 'updated successfully.'
      })
    } else {
      res.send({
        code: 0,
        message: `Cannot update with id=${id}.`
      })
    }
  })
}