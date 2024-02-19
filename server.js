require('dotenv').config()
const express = require("express");
const fileUpload = require('express-fileupload')
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();

var corsOptions = {
  origin: ["https://localhost:3000","http://localhost:3000"]
};
app.use(express.static(__dirname+'/build'));
app.use(cors(corsOptions));
app.use('/public', express.static('public'));

app.use(bodyParser.json({limit:'900mb'}))
app.use(bodyParser.urlencoded({limit:'900mb', extended:true}))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

app.all('*', function(req, res, next) {
  res.header("X-Frame-Options", "DENY");
  next();
});

db.sequelize.sync();
// drop database if you like
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

require("./app/routes/upload.routes")(app);
require("./app/routes/readfile.routes")(app);
require("./app/routes/fileInfo.routes")(app);
require("./app/routes/fileURL.routes")(app);
require("./app/routes/purchaseRecord.routes")(app);
require("./app/routes/likeFile.routes")(app);
require("./app/routes/fileScore.routes")(app);
require("./app/routes/MarketWhitelist.routes")(app);

// set port, listen for requests
const PORT = 8096;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});