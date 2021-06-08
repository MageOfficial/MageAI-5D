//Mage-5DAI

var Chess = require('5d-chess-js');
var chess = new Chess();
chess.reset("turn_zero")

var matValues = [ //Piece Material Value
    1,  //pawn   0
    4,  //bishop 1
    4,  //knight 2
    3,  //rook   3
    12, //queen  4
    -6,  //king   5
];

var moveValues = [ //Piece Movement Value
    0,   //pawn      0
    3 / 26,  //bishop  3/26
    3 / 16,  //knight  3/16
    2 / 28,  //rook    2/28
    6 / 21,  //queen   6/21
    1 / 8,  //king     1/8
];

var global = 0;
var isTurnZero = chess.rawBoard.length > 0 ? (chess.rawBoard[0].length > 0 ? chess.rawBoard[0][0] === null : false) : false;
chess.print();

//evaluate(chess);
//evaluation
function evaluate(chess) {
    global += 1; // Counts evaluated boards
    var board = chess.board;
    var player = board.player;
    var currTimeline = board.timelines[0];
    var currTurn = currTimeline.turns[currTimeline.turns.length - 1];
    var eval = 0;

    //Material
    for (var i = 0; i < currTurn.pieces.length; i++) { //loop through pieces
        var currPiece = currTurn.pieces[i];  //current piece in loop
        var playerSign = (currPiece.player === player) ? 1 : -1;
        switch (currPiece.piece) {
            case '':        //Pawn
                eval += playerSign * matValues[0];
                break;
            case 'B':        //Bishop
                eval += playerSign * matValues[1];
                break;
            case 'N':        //Knight
                eval += playerSign * matValues[2];
                break;
            case 'B':        //Rook
                eval += playerSign * matValues[3];
                break;
            case 'Q':        //Queen
                eval += playerSign * matValues[4];
                break;
            case 'K':        //King
                eval += playerSign * matValues[5];
                //King Safety
                //Find king's exposure squares
                var kPos = [currTimeline.turns.length -!isTurnZero,currPiece.position.rank - 1, currPiece.position.file - 1];
                var exposedSq = 0;
                //var kingPawn = [];
                var origVec = chess.raw.pieceFuncs.moveVecs(10);
                for (var v = 0; v < 8; v++) {

                    var exposure = kingExposure(chess, origVec[v], kPos, 1);

                    exposedSq += exposure.squares;
                }
                if (exposedSq > 4) {
                    eval -= playerSign * (exposedSq - 5) * 1
                }
                break;
        }
    }

    //Movement
    var isPlayerBlack = (player == 'black');
    var possibleMoves1 = chess.raw.boardFuncs.moves(chess.rawBoard, chess.rawAction, 1, 1, 1, chess.rawPromotionPieces);
    var tempChess = chess.copy();

    //pass
    tempChess.raw.mateFuncs.blankAction(tempChess.rawBoard, tempChess.rawAction);
    tempChess.rawAction++;

    var possibleMoves2 = tempChess.raw.boardFuncs.moves(tempChess.rawBoard, tempChess.rawAction, 1, 1, 1, tempChess.rawPromotionPieces);

    if (isPlayerBlack) {
        for (var m = 0; m < possibleMoves1.length; m++) {
            var pieceNum = chess.rawBoard[possibleMoves1[m][0][0]][possibleMoves1[m][0][1]][possibleMoves1[m][0][2]][possibleMoves1[m][0][3]];
            eval += moveValues[(Math.abs(pieceNum) / 2) - .5];
        }

        for (var m = 0; m < possibleMoves2.length; m++) {
            pieceNum = tempChess.rawBoard[possibleMoves2[m][0][0]][possibleMoves2[m][0][1]][possibleMoves2[m][0][2]][possibleMoves2[m][0][3]];
            eval -= moveValues[(Math.abs(pieceNum) / 2) - 1];
        }
    }
    else {
        for (var m = 0; m < possibleMoves1.length; m++) {
            var pieceNum = chess.rawBoard[possibleMoves1[m][0][0]][possibleMoves1[m][0][1]][possibleMoves1[m][0][2]][possibleMoves1[m][0][3]];
            eval += moveValues[(Math.abs(pieceNum) / 2) - 1];
        }
        for (var m = 0; m < possibleMoves2.length; m++) {
            pieceNum = tempChess.rawBoard[possibleMoves2[m][0][0]][possibleMoves2[m][0][1]][possibleMoves2[m][0][2]][possibleMoves2[m][0][3]];
            eval -= moveValues[(Math.abs(pieceNum) / 2) - .5];
        }
    }
    console.log('Evaluation = ' + eval);
    return eval;
}

function kingExposure(chess, moveVec, kPos, mult) {
    var rPos = kPos[1] + mult * moveVec[2];
    var fPos = kPos[2] + mult * moveVec[3];
    if (rPos < 0 || fPos < 0 || rPos > 7 || fPos > 7) {
        return {
            piecePos: undefined,
            squares: 0,
        };
    }
    if (chess.rawBoard[0][kPos[0]][rPos][fPos] !== 0) {
        return {
            piecePos: [0, kPos[0], rPos, fPos],
            squares: 0,
        };
    }
    var kingExp = kingExposure(chess, moveVec, kPos, mult + 1);
    return {
        piecePos: kingExp.piecePos,
        squares: kingExp.squares + 1,
    };
}

console.log("\nnegaMax\n");

//Initial Variables
var alpha = -Infinity;
var beta = Infinity;
var depth = 3;

console.time("Evaluation with Depth = " + depth);
var totalEval = negaMax(chess, depth, alpha, beta); //Function call
console.timeEnd("Evaluation with Depth = " + depth);
chess.print();
console.log("Move = "+ chess.raw.pgnFuncs.fromMove(totalEval.evalMove, chess.rawBoard, chess.rawAction) + ' : '+ Math.round(totalEval.evalMax * 1000) / 1000);


function negaMax(chess, depth, alpha, beta) {
    
    if (depth == 0) {// Depth limit

        //chess.print()

        return {
            evalMax: evaluate(chess),
            evalMove: [],
        };
    }

    var possibleMoves = chess.raw.boardFuncs.moves(chess.rawBoard, chess.rawAction, 1, 1, 1, chess.rawPromotionPieces);

    var moveAmount = possibleMoves.length; // Gets amount of moves

    var validMoves = 0;
    for (var m = 0, count = moveAmount; m < count; m++) {    // Loops through the index of each move
        var tempChess = chess.copy(); // copies the board state

        tempChess.raw.boardFuncs.move(tempChess.rawBoard, possibleMoves[m]);

        if (!tempChess.inCheck) {
            validMoves += 1;
            tempChess.rawAction++;

            var score = -negaMax(tempChess, depth - 1, -beta, -alpha).evalMax; // Calls the function again to get the score and searches to the final depth

            if (score > alpha) { // records max value
                alpha = score;
                var maxMove = possibleMoves[m];
            }
            if (score >= beta) {
                break;
            }
        }
    }
    if (validMoves == 0 && chess.inCheck) {
        alpha = 0;
    }

    return {
        evalMax: alpha,
        evalMove: maxMove,
    };
}