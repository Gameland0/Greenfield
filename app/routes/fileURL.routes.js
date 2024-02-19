module.exports = app => {
    const fileURL = require("../controllers/fileURL.controller.js");
  
    var router = require("express").Router();

    router.get("/", fileURL.findAll);
    router.get("/:id", fileURL.findOne);
  
    app.use('/v0/fileURL', router);
  };