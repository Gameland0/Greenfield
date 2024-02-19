module.exports = app => {
    const fileInfo = require("../controllers/fileInfo.controller.js");
  
    var router = require("express").Router();

    router.get("/", fileInfo.findAll);
    router.post("/", fileInfo.create);
    router.get("/:id", fileInfo.findOne);
    router.put("/:id", fileInfo.update);
    router.delete("/:id", fileInfo.delete);
  
    app.use('/v0/fileInfo', router);
  };