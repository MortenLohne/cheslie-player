var Chess = require('../modules/chess-extended.js').Chess,
    minmax = require('../modules/minmax.js');

exports.move = function (board) {
    var depth = 2,
	score = function (chess) { // chess is a chess.js instance
	    
	    var playingAsColor = chess.turn(); // Is your player playing as white or black?
	    
	    return playingAsColor === 'w' ? chess.matCount() : -chess.matCount(); // Return a number between Number.NEGATIVE_INFINITY and Number.POSITIVE_INFINITY
	};

    return minmax.move(board, depth, score);
};
