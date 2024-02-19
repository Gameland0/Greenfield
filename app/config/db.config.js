module.exports = {
  HOST: process.env.HOST,
  USER: 'PyDataStudio',
  PASSWORD: process.env.PSW,
  DB: process.env.DATABASE,
  PORT: process.env.PORT,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};