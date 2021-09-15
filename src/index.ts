import express from "express";
import TicTacToe from "./tictactoe";
import routes from "./routes";
import cors from "cors";
import http from "http";

require("dotenv").config();
const port = 3001;
const app = express();
const server = new http.Server(app);

const Game = new TicTacToe(server);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, () => console.log(`Listening on PORT ${port}`));
