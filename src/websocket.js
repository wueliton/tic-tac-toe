const socketio = require("socket.io");

let io;
let player;
let playerX;
let playerO;
let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let win;
let numMovimentos = 0;
const endGame = (posX, posY, board, player) => {
  let end = false;

  if (
    board[posX][0] === player &&
    board[posX][1] === player &&
    board[posX][2] === player
  ) {
    end = [
      [posX, 0],
      [posX, 1],
      [posX, 2],
    ];
  }

  if (
    board[0][posY] === player &&
    board[1][posY] === player &&
    board[2][posY] === player
  ) {
    end = [
      [0, posY],
      [1, posY],
      [2, posY],
    ];
  }

  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    end = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
  }

  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    end = [
      [0, 2],
      [1, 1],
      [2, 0],
    ];
  }

  return end;
};

const fullRoom = (socket) => {
  io.emit("fullRoom");
  socket.disconnect();
  return;
};

const enterRoom = (socket, id) => {
  if (!playerX) playerX = id;
  else if (!playerO) {
    playerO = id;
    player = playerX;
  } else if (id === playerX || id === playerO) return fullRoom(socket);

  if (playerX && playerO)
    io.emit("startGame", { playerX, playerO, board, firstPlayer: playerX });
};

exports.setupWebSocket = (server) => {
  io = socketio(server);
  io.on("connection", (socket) => {
    enterRoom(socket, socket.id);
    socket.send(socket.id);

    socket.on("move", (position) => {
      var position =
        typeof position === "object" ? position : JSON.parse(position);
      posX = position.x;
      posY = position.y;
      if (player !== position.gamerId || win) return;

      board[posX][posY] = player;
      numMovimentos++;
      win = endGame(posX, posY, board, player);
      player = player === playerX ? playerO : playerX;

      io.emit("nextMove", { playerX, playerO, board, nextPlayer: player });

      if (!win && numMovimentos === 9) {
        return io.emit("draw");
      }

      if (win) {
        return io.emit("endGame", { playerId: socket.id, play: win });
      }
    });

    socket.on("newGame", () => {
      board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      numMovimentos = 0;
      win = null;
      player = playerX;

      io.emit("startGame", {
        playerX,
        playerO,
        board,
        firstPlayer: playerX,
      });
    });

    socket.on("disconnect", () => {
      if (playerO === socket.id) playerO = null;
      if (playerX === socket.id) playerX = null;

      board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      numMovimentos = 0;
      win = null;
      player = playerX;
    });
  });
};
