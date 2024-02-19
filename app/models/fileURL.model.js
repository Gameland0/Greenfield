module.exports = (sequelize, Sequelize) => {
    // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
    const fileURL = sequelize.define("fileURL", {
      file: {
        type: Sequelize.STRING
      }
    });
  
    return fileURL;
  };