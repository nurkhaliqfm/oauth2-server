'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OAuthAccessTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OAuthAccessTokens.init({
    accessToken: DataTypes.STRING,
    accessTokenExpiresOn: DataTypes.DATE,
    clientId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OAuthAccessTokens',
  });
  return OAuthAccessTokens;
};