module.exports = app => {
    const upload = require("../controllers/readfile.controller.js");
  
    var router = require("express").Router();

    router.get("/", upload.readfile);
  
    app.use('/v0/readfile', router);
  };