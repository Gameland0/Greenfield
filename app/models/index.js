const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.fileInfo = require("./fileInfo.model.js")(sequelize, Sequelize);
db.fileURL = require("./fileURL.model.js")(sequelize, Sequelize);
db.likeFile = require("./likeFile.model.js")(sequelize, Sequelize);
db.fileScore = require("./fileScore.model.js")(sequelize, Sequelize);
db.MarketWhitelist = require("./MarketWhitelist.model.js")(sequelize, Sequelize);
db.purchaseRecord = require("./purchaseRecord.model.js")(sequelize, Sequelize);

module.exports = db;