module.exports = (sequelize, Sequelize) => {
    // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
    const fileScore = sequelize.define("fileScore", {
      scoreAddress: {
        type: Sequelize.STRING
      },
      fileID: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.BIGINT
      }
    });
  
    return fileScore;
  };