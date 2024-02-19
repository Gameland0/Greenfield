module.exports = app => {
    const fileScore = require("../controllers/fileScore.controller.js");
  
    var router = require("express").Router();

    router.get("/", fileScore.findAll);
    router.post("/", fileScore.create);
    router.put("/:id", fileScore.update);

    app.use('/v0/fileScore', router);
  };