module.exports = app => {
    const upload = require("../controllers/upload.controller.js");
  
    var router = require("express").Router();

    router.get("/", upload.download);
    router.get("/Greenfield", upload.Greenfield);

    router.post("/", upload.upload);
    router.post("/Sharding", upload.Sharding);
    router.post("/merge", upload.merge);

    router.post("/matedata", upload.matedata);
  
    app.use('/v0/upload', router);
  };