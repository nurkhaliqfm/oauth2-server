'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OAuthRefreshTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OAuthRefreshTokens.init({
    refreshToken: DataTypes.STRING,
    refreshTokenExpiresOn: DataTypes.DATE,
    clientId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OAuthRefreshTokens',
  });
  return OAuthRefreshTokens;
};