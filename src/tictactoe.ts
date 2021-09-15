import { Server } from "http";
import * as SocketIo from "socket.io";

class TicTacToe {
  #socket: SocketIo.Server;
  player: string | null = null;

  constructor(server: Server) {
    this.#socket = require("socket.io")(server);
    this.#socket.on("connection", this.onConnect);
  }

  onConnect = (socket: any) => {
    console.log("Connected");
  };
}

export default TicTacToe;
