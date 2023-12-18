const {
  OAuthClients,
  OAuthAccessTokens,
  OAuthRefreshTokens,
  OAuthUsers,
  OAuthAuthorizationCodes,
} = require("../models");

const getClient = async (clientId, clientSecret) => {
  console.log("getClient");
  try {
    const client = await OAuthClients.findOne({
      where: {
        clientId: clientId,
        ...(clientSecret && { clientSecret: clientSecret }),
      },
    });

    if (!client) throw new Error("Client not found");

    console.log({
      id: client.clientId,
      grants: [client.grants],
      redirectUris: [client.callbackUrl],
    });

    return {
      id: client.clientId,
      grants: [client.grants],
      redirectUris: [client.callbackUrl],
    };
  } catch (error) {
    console.error("Error retrieving client:", error);
    throw error;
  }
};

const saveAuthorizationCode = async (code, client, user) => {
  console.log("saveAuthorizationCode");
  const authorizationCode = {
    authorizationCode: code.authorizationCode,
    expiresAt: code.expiresAt,
    redirectUri: code.redirectUri,
    scope: code.scope[0],
    clientId: client.id,
    userId: user.id,
  };

  try {
    await OAuthAuthorizationCodes.create(authorizationCode);
    return authorizationCode;
  } catch (error) {
    console.error("Error saving authhorization code:", error);
    throw error;
  }
};

const getAuthorizationCode = async (authorizationCode) => {
  console.log("getAuthorizationCode");
  try {
    const code = await OAuthAuthorizationCodes.findOne({
      where: { authorizationCode: authorizationCode },
    });

    if (!code) throw new Error("Authorization code not found");

    return {
      code: code.authorizationCode,
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope,
      client: { id: code.clientId },
      user: { id: code.userId },
    };
  } catch (error) {
    console.error("Error retrieving authhorization code:", error);
    throw error;
  }
};

const revokeAuthorizationCode = async ({ code }) => {
  console.log("revokeAuthorizationCode");
  try {
    const deletedCount = await OAuthAuthorizationCodes.destroy({
      where: { authorizationCode: code },
    });

    return deletedCount === 1;
  } catch (error) {
    console.error("Error saving authhorization code:", error);
    throw error;
  }
};

const saveToken = async (token, client, user) => {
  console.log("Save Token");
  console.log(client);
  try {
    await OAuthAccessTokens.create({
      accessToken: token.accessToken,
      accessTokenExpiresOn: token.accessTokenExpiresOn,
      scope: token.scope,
      clientId: client.id,
      userId: user.id,
    });

    if (token.refreshToken) {
      await OAuthRefreshTokens.create({
        refreshToken: token.refreshToken,
        refreshTokenExpiresOn: token.refreshTokenExpiresOn,
        scope: token.scope,
        clientId: client.id,
        userId: user.id,
      });
    }

    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: [token.scope],
      client: { id: client.id },
      user: { id: user.id },
    };
  } catch (error) {
    console.error("Error saving access token:", error);
    throw error;
  }
};

const getAccessToken = async (accessToken) => {
  console.log("getAccessToken");

  try {
    const token = await OAuthAccessTokens.findOne({
      where: { accessToken: accessToken },
    });

    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      scope: token.scope,
      client: { id: token.clientId },
      user: { id: token.userId },
    };
  } catch (error) {
    console.error("Error retrieving access token:", error);
    throw error;
  }
};

const getRefreshToken = async (refreshToken) => {
  console.log("getRefreshToken");
  try {
    const token = await OAuthRefreshTokens.findOne({
      where: { refreshToken: refreshToken },
    });

    return {
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      client: { id: token.clientId },
      user: { id: token.userId },
    };
  } catch (error) {
    console.error("Error retrieving refresh token:", error);
    throw error;
  }
};

const getUser = async (username, password) => {
  console.log("getUser");
  try {
    const user = await OAuthUsers.findOne({
      where: { username: username, password: password },
    });

    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
};

module.exports = {
  getClient,
  saveAuthorizationCode,
  getAuthorizationCode,
  revokeAuthorizationCode,
  saveToken,
  getAccessToken,
  getRefreshToken,
  getUser,
};
