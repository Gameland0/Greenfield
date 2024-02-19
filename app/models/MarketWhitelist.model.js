module.exports = (sequelize, Sequelize) => {
    // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
    const MarketWhitelist = sequelize.define("MarketWhitelist", {
      userAddress: {
        type: Sequelize.STRING
      }
    });
  
    return MarketWhitelist;
  };