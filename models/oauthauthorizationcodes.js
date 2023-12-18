"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OAuthAuthorizationCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OAuthAuthorizationCodes.init(
    {
      authorizationCode: DataTypes.STRING,
      expiresAt: DataTypes.DATE,
      redirectUri: DataTypes.STRING,
      scope: DataTypes.STRING,
      clientId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OAuthAuthorizationCodes",
    }
  );
  return OAuthAuthorizationCodes;
};
