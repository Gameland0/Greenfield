module.exports = (sequelize, Sequelize) => {
    // DataTypes - https://sequelize.org/master/manual/model-basics.html#data-types
    const fileInfo = sequelize.define("fileInfo", {
      userAddress: {
        type: Sequelize.STRING
      },
      fileName: {
        type: Sequelize.STRING
      },
      fileSize: {
        type: Sequelize.STRING
      },
      uploadTime: {
        type: Sequelize.DATE
      },
      download: {
        type: Sequelize.BIGINT
      },
      fileAmount: {
        type: Sequelize.BIGINT
      },
      like: {
        type: Sequelize.BIGINT
      },
      type: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      nftAddress: {
        type: Sequelize.STRING
      },
      permissions: {
        type: Sequelize.STRING
      },
      nftAmount: {
        type: Sequelize.BIGINT
      },
      price: {
        type: Sequelize.STRING
      },
      chain: {
        type: Sequelize.STRING
      },
      Browse: {
        type: Sequelize.BIGINT
      },
      state: {
        type: Sequelize.BIGINT
      },
      coding: {
        type: Sequelize.STRING
      }
    });
  
    return fileInfo;
  };