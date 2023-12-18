const express = require("express");
const router = express.Router();
const OAuth2Controllers = require("../controllers/oauth2");

router.post("/user", OAuth2Controllers.user);
router.get("/authorize", OAuth2Controllers.authorize);
router.post("/token", OAuth2Controllers.token);
router.get(
  "/authenticate",
  OAuth2Controllers.authenticate,
  OAuth2Controllers.test
);

module.exports = router;
