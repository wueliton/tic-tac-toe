# tic-tac-toe
Multiplayer Tic-tac-toe Game using node express and socket.io.

## Socket.io events
List of events emitted and listening for tic-tac-toe game.

### startGame (emitted)
When both players connect with socket.io, the startGame is emitted, this event contains:
```javascript
{ playerX: socket.id, playerO: socket.id, board: array, firstPlayer: playerX }
```
* playerX: The first player connected on socket is defined for playerX
* playerY: The second player connected is assigned for playerY
* board: Contains the board represented in 3x3 array
* firstPlayer: The player to start the game

### move(position) (listener)
All moves players are listening by move, is necessary to send parameter position clicked by actual player, the position contains one object:
```javascript
{ x: number, y: number }
```
* x: Represents the collumn
* y: Represents the row

When one user send your move position, is verified if the game is draw or endGame, if one of the both verifications is true, is emitted one event:

#### draw (emitted)
If the game is draw, the event draw is emitted and no moves is allowed.

#### endGame (emitted)
If one of the boths players win, the event endGame is emitted with one object:
```javascript
{ playerId: socket.id, play: array }
```
* playerId: Socket.id of the win user
* play: The move positionss that guaranteed the victory represented on array board positions

#### newGame (listener)
If the game is ended, the newGame event start's a new game.
