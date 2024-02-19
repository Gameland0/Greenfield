module.exports = (sequelize, Sequelize) => {
    // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
    const likeFile = sequelize.define("likeFile", {
      userAddress: {
        type: Sequelize.STRING
      },
      likeID: {
        type: Sequelize.STRING
      }
    });
  
    return likeFile;
  };