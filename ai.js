var Chess = require('./modules/chess-extended.js').Chess;
var decender = require('./sample-players/decender.js');
var minmaxer = require('./sample-players/minmaxer.js');

// Feel free to give your AI a more personal name
exports.name = 'Morten - ' + Math.floor(Math.random() * 1000);

/*
 * This is where you make your move.
 * You are given a chessboard in FEN format and need to return a move as a SAN string (or a promise resolving to a SAN string)
 * Don't worry to much about FEN and SAN, chess.js can handle all the details :-)
 */
exports.move = function (board) {
    return decender.move(board);
};

/*
 * running npm start in the console will run your AI again a player making random moves.
 * npm test will run some simple tests valitdating that the player makes a legal move.
 * npm run tournament will connect the player to the tournament server.
 */
