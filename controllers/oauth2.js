const OAuth2Server = require("@node-oauth/oauth2-server");
const { Request, Response } = require("@node-oauth/oauth2-server");
const oauth = require("../utils/oauth");
const { OAuthClients, OAuthUsers } = require("../models");

const server = new OAuth2Server({
  model: oauth,
});

const user = (req, res) => {
  console.log(req.body);
  console.log(req.body.client_id);
  res.status(200).json("success");
};

const authorize = async (req, res) => {
  const request = new Request(req);
  const response = new Response(res);

  return server
    .authorize(request, response, {
      authenticateHandler: {
        handle: async () => {
          const { client_id } = req.query || {};
          if (!client_id) throw new Error("Client ID not found");

          const client = await OAuthClients.findOne({
            where: { clientId: client_id },
          });
          if (!client) throw new Error("Client not found");

          const { userId } = req.auth || {};

          if (!client.userId && !userId) return {};
          const user = await OAuthUsers.findOne({
            where: { id: client.userId },
          });
          if (!user) throw new Error("User not found");

          return { id: user.id };
        },
      },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("err", err);
      res
        .status(err.code || 500)
        .json(err instanceof Error ? { error: err.message } : err);
    });
};

const token = async (req, res) => {
  const request = new Request(req);
  const response = new Response(res);

  return server
    .token(request, response, { alwaysIssueNewRefreshToken: false })
    .then((result) => res.json(result))
    .catch((err) => {
      console.log("err", err);
      res
        .status(err.code || 500)
        .json(err instanceof Error ? { error: err.message } : err);
    });
};

const authenticate = async (req, res, next) => {
  const request = new Request(req);
  const response = new Response(res);

  return server
    .authenticate(request, response)
    .then((data) => {
      req.auth = { userId: data?.user?.id, sessionType: "oauth2" };
      next();
    })
    .catch((err) => {
      console.log("err", err);
      res
        .status(err.code || 500)
        .json(err instanceof Error ? { error: err.message } : err);
    });
};

const test = async (req, res) => {
  const { userId } = req.auth || {};
  if (!userId) throw new Error("User not found");

  const user = await OAuthUsers.findOne({ id: userId });
  if (!user) throw new Error("User not found");

  res.json({ id: user.id, username: user.username });
};

module.exports = {
  server,
  authorize,
  token,
  authenticate,
  test,
  user,
};
