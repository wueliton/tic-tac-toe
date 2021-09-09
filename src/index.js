const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const http = require("http");
const { setupWebSocket } = require("./websocket");
const cors = require("cors");

const server = http.Server(app);

setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, () => console.log(`Listening on PORT ${port}`));
