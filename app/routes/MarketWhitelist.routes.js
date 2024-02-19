module.exports = app => {
    const fileInfo = require("../controllers/MarketWhitelist.controller.js");
  
    var router = require("express").Router();

    router.get("/", fileInfo.findAll);
  
    app.use('/v0/MarketWhitelist', router);
  };