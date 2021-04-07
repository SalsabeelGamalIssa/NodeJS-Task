const express = require("express");
const bodyParser = require("body-parser");

const productRouter = require("./app/route/route");

const app = express();
port = process.env.port || 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const db = require("./app/config/db");





app.use("/product", productRouter);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(port, () => {
  console.log("connected at port " + port);
});
