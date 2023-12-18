"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OAuthClients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OAuthClients.init(
    {
      userId: DataTypes.STRING,
      clientId: DataTypes.STRING,
      clientSecret: DataTypes.STRING,
      callbackUrl: DataTypes.STRING,
      grants: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "OAuthClients",
    }
  );
  return OAuthClients;
};
