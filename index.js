const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/oauth", require("./routes/oauth"));

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server up and running on port 3000....");
  });
});
