var Chess = require('chess.js');
if (typeof window === 'undefined') {
    Chess = Chess.Chess;
}

exports.Chess = function (fen) {
    var chess = new Chess(fen),
        numberOfMoves = 0,
        _move = chess.move,
        _game_over = chess.game_over;

    chess.pieces = function (color) {
        var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            squares = [];

        for (var i = 1; i <= 8; i++) {
            letters.forEach(function (letter) {
                squares.push(letter + i);
            });
        };

        return squares.map(function (square) {
            return chess.get(square);
        }).filter(function (val) {
            if (color && val) {
                return val.color === color;
            }
            return val;
        });
    };

    chess.numberOfPieces = function (color) {
        return chess.pieces(color).length;
    };

    chess.matCount = function () {
	var sum = 0.0;

	if (chess.in_checkmate()) {
	    return chess.turn() === 'w' ? -100 : 100;
	}
	
	var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	var white_king_pos;
	var black_king_pos;
	
        for (var i = 1; i <= 8; i++) {
            letters.forEach(function (letter) {
                var square = (letter + i);
		var piece = chess.get(square);
		if (piece != null) {
		    let val = 0;
		    switch (piece.type) {
		    case 'p':
			val = 1.0;
			if (piece.color === 'w') {
			    val += 0.1 * square[1];
			    //console.log(piece.color + square + ", " + val);
			}
			else {
			    val += 0.1 * (8 - square[1]);
			    //console.log(piece.color + square + ", " + val);
			}
			break;
		    case 'n':
			val = 3.0
			break;
		    case 'b':
			val = 3.0
			break;
		    case 'r':
			val = 5.0;
			break;
		    case 'q':
			val = 9.0;
			//console.log(piece.color + " queen at " + square);
			break;
		    case 'k':
			val = 100;
			if (piece.color === 'w') {
			    white_king_pos = square;
			}
			else if (piece.color === 'b') {
			    black_king_pos = square;
			    //console.log(square);
			    //console.log(square[0]);
			}
			break;
		    }
		    if (piece.color === 'w') {
			sum += val;
		    }
		    else if (piece.color === 'b') {
			sum -= val
		    }
		    else {
			console.log("Wrong color " + piece.color);
		    }
			
		}
            });
        };

	if (black_king_pos === 'h8' || black_king_pos === 'g8' || black_king_pos === 'f8'
	    || black_king_pos === 'a8' || black_king_pos === 'b8' || black_king_pos === 'c8') {
	    sum -= 1;
	}

	if (white_king_pos === 'h1' || white_king_pos === 'g1' || white_king_pos === 'f1'
	    || white_king_pos === 'a1' || white_king_pos === 'b1' || white_king_pos === 'c1') {
	    sum += 1;
	}
	
	var letters = ['c', 'd', 'e', 'f'];

	for (var i = 3; i <= 6; i++) {
            letters.forEach(function (letter) {
                var square = (letter + i);
		var piece = chess.get(square);
		if (piece != null) {
		    let val = 0;
		    switch (piece.type) {
		    case 'p':
			val = 0.1;
			break;
		    case 'n':
			val = 0.5;
			break;
		    case 'b':
			val = 0.2;
			break;
		    case 'r':
			val = 0.2;
			break;
		    case 'q':
			val = 0.3;
			break;
		    case 'k':
			val = -1.0;
			break;
		    }
		    if (piece.color === 'w') {
			sum += val;
		    }
		    else if (piece.color === 'b') {
			sum -= val
		    }
		    else {
			console.log("Wrong color " + piece.color);
		    }
			
		}
            });
        };

	var letters = ['d', 'e'];

	for (var i = 4; i <= 5; i++) {
            letters.forEach(function (letter) {
                var square = (letter + i);
		var piece = chess.get(square);
		if (piece != null) {
		    let val = 0;
		    switch (piece.type) {
		    case 'p':
			val = 0.1;
			break;
		    case 'n':
			val = 0.5;
			break;
		    case 'b':
			val = 0.2;
			break;
		    case 'r':
			val = 0.2;
			break;
		    case 'q':
			val = 0.3;
			break;
		    case 'k':
			val = -2.0;
			break;
		    }
		    if (piece.color === 'w') {
			sum += val;
		    }
		    else if (piece.color === 'b') {
			sum -= val
		    }
		    else {
			console.log("Wrong color " + piece.color);
		    }
			
		}
            });
        };
	
	//console.log("Score " + (sum));
	return sum;
    }

    chess.movesInformation = function () {
        return chess.moves({ verbose: true });
    };

    chess.move = function (arg) {
        numberOfMoves++;
        _move(arg);
    };

    chess.game_over = function () {
        return numberOfMoves >= 100
            || _game_over();
    };

    return chess;
};
