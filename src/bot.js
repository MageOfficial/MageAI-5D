//Mage-5DAI

var Chess = require('5d-chess-js');
var chess = new Chess();
chess.reset("turn_zero");
var isTurnZero = chess.rawBoard.length > 0 ? (chess.rawBoard[0].length > 0 ? chess.rawBoard[0][0] === null : false) : false;

// Piece material values.
var matValues = [ 
    1000,  //pawn   0
    4000,  //bishop 1
    4000,  //knight 2
    3000,  //rook   3
    12000, //queen  4
    -6000  //king   5
];

// Piece movement values.
var moveValues = [ 
    0,   //pawn      0
    115,  //bishop  3/26
    188,  //knight  3/16
    71,  //rook    2/28
    286,  //queen   6/21
    125  //king     1/8
];

// Piece priority values.
var priorityValues = [ 
    9,  // pawn
    6,  // bishop
    7,  // knight
    8,  // rook
    5,  // queen
    10  // king
];

// Initial Variables
console.log("\nnegaMax\n");
chess.print();
var depth = 3;
var evalSteps = 0;

var global = 0;

console.time("Evaluation with Depth = " + depth);
var evaluation = negaMax(chess, depth, -Infinity, Infinity, []); // Function call
console.timeEnd("Evaluation with Depth = " + depth);

chess.print();
console.log("Move = " + chess.raw.pgnFuncs.fromMove(evaluation.evalMove[evaluation.evalMove.length - 1], chess.rawBoard, chess.rawAction) + ' : ' + evaluation.eval / 1000);
console.log("Postions Checked = " + evalSteps);

console.log(global);

for (var i = 0; i < evaluation.evalMove.length; i++) {
    console.log(i + 1 + ": " + chess.raw.pgnFuncs.fromMove(evaluation.evalMove[evaluation.evalMove.length - 1 - i], chess.rawBoard, chess.rawAction));
    chess.move(evaluation.evalMove[evaluation.evalMove.length - 1 - i]);
    chess.submit();
}

/*
 * Evaluate the static position. Currently includes: material, movement, vulnerable squares, king's pieces. 
 *
 * @parameters:
 *   chess:     current chess board
 */
function evaluate(chess) {

    // Increment the number of Evaluations.
    evalSteps++;
    
    // Static checkmate evaluation.
    if (chess.inCheckmate) {
        // console.log("Evaluation Checkmate");
        return -Infinity;
    }

    // Initialize variables.
    var eval = 0;
    var curBoard = chess.board;
    var curTimeline = curBoard.timelines[0];
    var curTurn = curTimeline.turns[curTimeline.turns.length - 1];
    var knightMoves = [ 
        [ 0, 0, 1, 2], [ 0, 0, 1, -2], [ 0, 0, -1, 2], [ 0, 0, -1, -2],
        [ 0, 0, 2, 1], [ 0, 0, 2, -1], [ 0, 0, -2, 1], [ 0, 0, -2, -1]
    ];
    var queenMoves = [      
        [ 0, 0, 0, 1], [ 0, 0, 0, -1], [ 0, 0, 1, 0], [ 0, 0, -1, 0],
        [ 0, 0, 1, 1], [ 0, 0, 1, -1], [ 0, 0, -1, 1], [ 0, 0, -1, -1]
    ];
    
    var timelineNum = curTimeline.timeline;
    var turnNum = curTimeline.turns.length - !isTurnZero;

    var curPlayer = curBoard.player=="black";
    var pieces = curTurn.pieces;

    // Loop through all pieces in the position.
    for (var i = 0; i < pieces.length; i++) {

        // Current piece to evaluate and corresponding information.
        var curPiece = pieces[i];
        var pieceNum = chess.raw.pieceFuncs.fromChar(curPiece.piece,curPiece.player=="black");
        var playerSign = pieceNum % 2 == curPlayer ? 1 : -1;
        var curLocation = [timelineNum, turnNum, curPiece.position.rank - 1, curPiece.position.file - 1];
        var numMoves = chess.raw.pieceFuncs.moves(chess.rawBoard, curLocation, 1, chess.rawPromotionPieces).length;
        
        // Check if the piece is a white or a black piece to get around the lack of integer division in Javascript...
        if (pieceNum % 2 === 0) {
            var pieceIndex = (pieceNum / 2) - 1;
        } else {
            var pieceIndex = (pieceNum - 1) / 2;
        }

        // Change the evaluation based on the piece's material and movement values.
        eval += playerSign * (matValues[pieceIndex] + numMoves * moveValues[pieceIndex]);

        // If the piece is a king, evaluate vulnerable squares and king's pieces (wip).
        if (pieceIndex === 5) {
            eval += playerSign * kingExposure(chess, curLocation, pieceNum % 2, queenMoves, knightMoves);
        }
    }
    // console.log("Evaluation = " + eval);
    return eval;
}

/*
 * Iteratively moves away from the king to determine the number of vulernable squares
 * and the position of a king's piece in the current direction. Sums all of the exposure
 * squares and pushes all of the king's pieces to kingPieces (currently unused).
 * 
 * @parameters:
 *   chess:         current chess board
 *   currLocation:  current king's location
 *   moveVec:       queen's movement vectors
 */
function kingExposure(chess, kPos, kingColor, queenMoves, knightMoves) {
    // Evaluate king safety and find king's pieces.
    var eval = 0;
    var exposedSq = 0;
    var kingPieces = [];

    // Loop through all eight directions (queen's movement).
    for (var v = 0; v < 8; v++) {
        var rPos = kPos[2] + queenMoves[v][2];
        var fPos = kPos[3] + queenMoves[v][3];
        while (rPos >= 0 && fPos >= 0 && rPos <= 7 && fPos <= 7) {
            if (chess.rawBoard[kPos[0]][kPos[1]][rPos][fPos] !== 0) {
                kingPieces.push([kPos[0], kPos[1], rPos, fPos]);
                break;
            }
            rPos += queenMoves[v][2];
            fPos += queenMoves[v][3];
            exposedSq++;
        }
    }

    var curBoard = chess.rawBoard[kPos[0]][kPos[1]];
    for (var i = 0; i < kingPieces.length; i++) {
        var kingPawnDefense = kingPieceCheck(curBoard, kingPieces[i], kingColor, queenMoves, knightMoves);
        if (kingPawnDefense <= 0) {
            eval += (kingPawnDefense - 1) * 500;
        }
    }

    // Decrease the evaluation if there are more than 4 exposed squares.
    if (exposedSq > 4) {
        eval -= (exposedSq - 5) * 1000;
    }
    return eval;
}

function kingPieceCheck(curBoard, kingPiece, kingColor, queenMoves, knightMoves) {
    var kingPieceDefense = 0;
    

    // Knight
    for (var j = 0; j < knightMoves.length; j++) {
    var rPos = kingPiece[2] + knightMoves[j][2];
    var fPos = kingPiece[3] + knightMoves[j][3];
    

        if (rPos >= 0 && fPos >= 0 && rPos <= 7 && fPos <= 7) {
            
            var pieceNum = Math.abs(curBoard[rPos][fPos]);
            if (pieceNum === 5) {
                kingPieceDefense += (kingColor === 1 ? 1 : -1);
            } else if (pieceNum === 6) {
                kingPieceDefense += (kingColor === 0 ? 1 : -1);
            }
        }
    }

    // RF
    for (var j = 0; j < 4; j++) {
        var rPos = kingPiece[2] + queenMoves[j][2];
        var fPos = kingPiece[3] + queenMoves[j][3];

        while (rPos >= 0 && fPos >= 0 && rPos <= 7 && fPos <= 7) {
            var pieceNum = Math.abs(curBoard[rPos][fPos]);
            if (pieceNum !== 0) {
                if (pieceNum <= 6 || pieceNum === 11 || pieceNum === 12) {
                    break;
                }
                if (pieceNum >= 7 && pieceNum <= 10) {
                    kingPieceDefense += (pieceNum % 2 === kingColor ? 1 : -1);
                }
            }
            rPos += queenMoves[j][2];
            fPos += queenMoves[j][3];
        }
    }

    // Diagonal
    for (var j = 4; j < 8; j++) {
        var rPos = kingPiece[2] + queenMoves[j][2];
        var fPos = kingPiece[3] + queenMoves[j][3];

        if (rPos >= 0 && fPos >= 0 && rPos <= 7 && fPos <= 7) {
            var pieceNum = Math.abs(curBoard[rPos][fPos]);
            if (pieceNum !== 0) {
                if (pieceNum <= 4 || pieceNum === 9 || pieceNum === 10) {
                    kingPieceDefense += (pieceNum % 2 === kingColor ? 1 : -1);
                } else {
                    continue;
                }
            }
        }

        while (rPos >= 0 && fPos >= 0 && rPos <= 7 && fPos <= 7) {
            var pieceNum = Math.abs(curBoard[rPos][fPos]);
            if (pieceNum !== 0) {
                if ((pieceNum >= 5 && pieceNum <= 8) || pieceNum === 11 || pieceNum === 12) {
                    break;
                }
                if (pieceNum === 3 ||  pieceNum === 9 ) {
                    kingPieceDefense += (kingColor === 1 ? 1 : -1);
                } else if (pieceNum === 4 || pieceNum === 10) {
                    kingPieceDefense += (kingColor === 0 ? 1 : -1);
                }
            }
            rPos += queenMoves[j][2];
            fPos += queenMoves[j][3];
        }
    }
    return kingPieceDefense;
}

/* 
 * Recursively analyzes the position by playing all possible moves (using alpha-beta pruning).
 *
 * @parameters:
 *   chess:     current chess board
 *   depth:     current depth
 *   alpha:     current lower bound
 *   beta:      current bound bound
 *   killer:    current killer move
 */
function negaMax(chess, depth, alpha, beta, killer) {

    // Depth limit.
    if (depth == 0) {
        // chess.print();
        return {eval: evaluate(chess), evalMove: [], killerMove: undefined};
    }

    // Find the current player's pieces.
    var curPieces = pieceGen(chess);
    
    // Generate the current player's valid moves and order them.
    var killerMoves = killer.slice();
    var validMoves = moveGen(chess, curPieces);
    orderKillerMove(validMoves, killerMoves);

    var alphaMove = [];
    for (var i = 0; i < validMoves.length; i++) {

        // Copy the board state and play move "i".
        var tempChess = chess.copy();
        tempChess.raw.boardFuncs.move(tempChess.rawBoard, validMoves[i].move);
        tempChess.rawBoardHistory.push(tempChess.raw.boardFuncs.copy(tempChess.rawBoard));
        tempChess.rawAction++;

        // Recursively calls the function to obtain the evaluation of the current position.
        var output = negaMax(tempChess, depth - 1, -beta, -alpha, killerMoves);
        score = -output.eval;

        if (output.killerMove !== undefined) {
            addKiller(killerMoves, output.killerMove);
        }

        /*if(score === -Infinity) {
            alphaMove = output.evalMove.slice();
            alphaMove[depth - 1] = validMoves[i].move;
        }*/
        
        // A better move has been found.
        if (score > alpha) {
            alphaMove = output.evalMove.slice();
            alphaMove[depth - 1] = validMoves[i].move;
            alpha = score;
        }

        // The position is too good, the opponent will avoid it.
        if (score >= beta) {
            var betaMove = validMoves[i].move;
            global++;
            break;
        }
    }

    return {
        eval: alpha,
        evalMove: alphaMove, 
        killerMove: betaMove
    };
}

function pieceGen(chess) {

    // Initialize variables.
    var curTimeline = chess.board.timelines[0];
    var timelineNum = curTimeline.timeline;
    var turnNum = curTimeline.turns.length - !isTurnZero;
    var player = chess.board.player;
    var curTurn = curTimeline.turns[curTimeline.turns.length - 1];
    var pieces = curTurn.pieces;

    var curPieces = [];

    // Check if the player is white or black to get around the lack of integer division in Javascript...
    if(player) {
        // Loop through all pieces in the position.
        for (var i = 0; i < pieces.length; i++) {
            var curPiece = pieces[i];
            // If the current piece matches the current player, add it's piece index and location to the array.
            if (curPiece.player === player) {
                var curLocation = [timelineNum, turnNum, curPiece.position.rank - 1, curPiece.position.file - 1];
                curPieces.push([(curPiece.piece - 1) / 2, curLocation]);
            }
        }
    } else {
        // Loop through all pieces in the position.
        for (var i = 0; i < pieces.length; i++) {
            // If the current piece matches the current player, add it's piece index and location to the array.
            var curPiece = pieces[i];
            if (curPiece.player === player) {
                var curLocation = [timelineNum, turnNum, curPiece.position.rank - 1, curPiece.position.file - 1];
                curPieces.push([(curPiece.piece / 2) - 1, curLocation]);
            }
        }
    }
    return curPieces;
}

// Generates all valid moves for the given pieces.
function moveGen(chess, pieces) {

    var validMoves = [];
    for (var i = 0; i < pieces.length; i++) {
        var possibleMoves = chess.raw.pieceFuncs.moves(chess.rawBoard, pieces[i][1], 1, chess.rawPromotionPieces);
        for (var j = 0; j < possibleMoves.length; j++) {
            chess.raw.boardFuncs.move(chess.rawBoard, possibleMoves[j]);
            if (!chess.inCheck) {
                var pieceIndex = pieces[i][0];
                heapAdd(validMoves, {piece: pieceIndex, move: possibleMoves[j], priority: priorityValues[pieceIndex]});
            }
            chess.rawBoard[0].pop();
        }
    }

    return validMoves;
}

// Adds an entry to the heap.
function heapAdd(heap, data) {
    heap.push(data);
    bubbleUp(heap, heap.length - 1);
}

// Moves an entry up the heap.
function bubbleUp(heap, index) {
    while (index > 0) {
        var parentIndex = Math.floor((index - 1) / 2);
        if (heap[parentIndex].priority <= heap[index].priority) {
            return;
        } else {
            var temp = heap[parentIndex];
            heap[parentIndex] = heap[index];
            heap[index] = temp;
            index = parentIndex;
        }
    }
}

// Moves the killer move to the top of the list.
function orderKillerMove(heap, killerMoves) {
    for (var i = 0; i < killerMoves.length; i++) {
        var index = heap.findIndex(killerHeuristic, killerMoves[i]);
        if (index !== -1) {
            heap[index].priority = 0;
            bubbleUp(heap, index);
        }
    }
}

// Checks if "this" matches "currentMove".
function killerHeuristic(currentMove) {
    var move = currentMove.move;
    return move[0][2] === this[0][2] && move[0][3] === this[0][3] && move[1][2] === this[1][2] && move[1][3] === this[1][3];
}

// Adds a new killer move to the array.
function addKiller(killerMoves, newKiller) {
    var index = killerMoves.findIndex(equalsMove, newKiller);
    if (index !== -1) {
        killerMoves.splice(index, 1);
    }
    killerMoves.splice(0, 0, newKiller);
    if (killerMoves.length > 2) {
        killerMoves.pop();
    }
}

// Checks if two moves are equal (for a given turn and timeline).
function equalsMove(move) {
    return move[0][2] === this[0][2] && move[0][3] === this[0][3] && move[1][2] === this[1][2] && move[1][3] === this[1][3];
}
