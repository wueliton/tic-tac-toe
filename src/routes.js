const express = require("express");
const routes = express.Router();

routes.get("/web", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

module.exports = routes;
