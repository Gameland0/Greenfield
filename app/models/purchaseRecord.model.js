module.exports = (sequelize, Sequelize) => {
    // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
    const purchaseRecord = sequelize.define("purchaseRecord", {
      userAddress: {
        type: Sequelize.STRING
      },
      buyID: {
        type: Sequelize.STRING
      }
    });
  
    return purchaseRecord;
  };