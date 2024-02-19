module.exports = app => {
    const purchaseRecord = require("../controllers/purchaseRecord.controller.js");
  
    var router = require("express").Router();

    router.get("/", purchaseRecord.findAll);
    router.post("/", purchaseRecord.create);
    router.get("/:id", purchaseRecord.findOne);
  
    app.use('/v0/purchaseRecord', router);
  };