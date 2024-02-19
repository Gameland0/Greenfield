const db = require('../models')
const UUID =require('uuid')
const fileInfo = db.fileInfo
const fileURL = db.fileURL

exports.create = (req, res) => {
    const id = UUID.v1()
    const userAddress = req.body.user
    const permissions = req.body.permissions
    if (!userAddress) {
        res.status(400).send({
          message: 'address can not be empty!'
        })
        return
    }
    const parm = {
        id: id,
        userAddress: userAddress,
        fileName: req.body.name,
        type: req.body.type,
        category: req.body.category,
        description: req.body.description,
        tags: req.body.tags,
        uploadTime: new Date().toJSON(),
        fileSize: req.body.fileSize,
        permissions: req.body.permissions,
        fileAmount: req.body.fileAmount,
        nftAddress: req.body.nftAddress,
        download: 0,
        like: 0,
        nftAmount: req.body.nftAmount,
        price: req.body.price,
        chain: req.body.chain,
        Browse: 0,
        state: 1,
        coding: req.body.coding
    }
    fileInfo.create(parm)
      .then((data) => {
        if (permissions === 'open') {
          const parmdata = {
            id: id,
            file: req.body.originalFilename
          }
          fileURL.create(parmdata)
        }
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
    fileInfo.findAll({
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
    fileInfo.findAll()
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
  fileInfo.findAll({
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

exports.update = (req, res) => {
  const id = req.params.id
  fileInfo.update(req.body, {
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

exports.delete = (req, res) => {
  const id = req.params.id
  fileInfo.destroy({
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        fileURL.destroy({
          where: { id: id }
        })
        res.send({
          code: 1,
          message: ' deleted successfully!'
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