module.exports = app => {
    const likeFile = require("../controllers/likeFile.controller.js");
  
    var router = require("express").Router();

    router.get("/", likeFile.findAll);
    router.post("/", likeFile.create);
    router.delete("/:id", likeFile.delete);
  
    app.use('/v0/likeFile', router);
  };