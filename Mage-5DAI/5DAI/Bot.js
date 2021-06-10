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

var str1 =
    '[Board "Custom"]\n' +
    '[Mode "5D"]\n' +
    '[3r*1r*k*1/4p*p*bp*/1p*p*1q1p*Q/p*1P*p*4/1P*6/P*2BP*1NP*/3P*1P*P*1/R*4R*K*1:0:1:w]';
chess.import(str1);

/*
chess.move('e3');
chess.submit();
chess.move('e5');
chess.submit();
chess.move('Qh5');
chess.submit();
chess.move('d6');
chess.submit();
chess.move('Kd1');
chess.submit();
chess.move('a6');
chess.submit();
chess.move('Nc3');
chess.submit();
chess.move('Bg4');
chess.submit();
*/


global = 0;
var isTurnZero = chess.rawBoard.length > 0 ? (chess.rawBoard[0].length > 0 ? chess.rawBoard[0][0] === null : false) : false;
chess.print();

evaluate(chess);

//evaluation
function evaluate(chess) {

    global += 1; // Counts evaluated boards
    var board = chess.board;
    var player = board.player;
    var currTimeline = board.timelines[0];
    var currTurn = currTimeline.turns[currTimeline.turns.length - 1];
    var eval = 0;
    var timelineNum = currTimeline.timeline;
    var turnNum = currTimeline.turns.length - !isTurnZero;
    //Material
    for (var i = 0; i < currTurn.pieces.length; i++) {
        // Current piece to evaluate.
        var currPiece = currTurn.pieces[i];
        var playerSign = (currPiece.player === player) ? 1 : -1;
        var currLocation = [timelineNum, turnNum, currPiece.position.rank - 1, currPiece.position.file - 1];
        var numMoves = chess.raw.pieceFuncs.moves(chess.rawBoard, currLocation, 1, chess.rawPromotionPieces).length;

        switch (currPiece.piece) {
            case '': // Pawn.
                eval += playerSign * (matValues[0] + numMoves * moveValues[0]);
                break;
            case 'B': // Bishop.
                // Location and number of possible moves.
                eval += playerSign * (matValues[1] + numMoves * moveValues[1]);
                break;
            case 'N': // Knight.
                // Location and number of possible moves.
                eval += playerSign * (matValues[2] + numMoves * moveValues[2]);
                break;
            case 'R': // Rook.
                // Location and number of possible moves.
                eval += playerSign * (matValues[3] + numMoves * moveValues[3]);
                break;
            case 'Q': // Queen.
                // Location and number of possible moves.
                eval += playerSign * (matValues[4] + numMoves * moveValues[4]);
                break;
            case 'K': // King.
                // Location and number of possible moves.
                eval += playerSign * (matValues[5] + numMoves * moveValues[5]);

                // Evaluate king safety and find king's pieces.
                var origVec = chess.raw.pieceFuncs.moveVecs(10);
                var exposedSq = 0;
                var kingPawn = []; // currently unused

                // Loop through the eight directions.
                for (var v = 0; v < 8; v++) {
                    var exposure = kingExposure(chess, origVec[v], currLocation, 1);
                    /*
                    if (exposure.piecePos !== undefined) {
                         kingPawn.push(exposure.piecePos);
                    }
                    */
                    exposedSq += exposure.squares;
                }

                // Decrease the evaluation if there are more than 4 exposed squares.
                if (exposedSq > 4) {
                    eval -= playerSign * (exposedSq - 5);
                }
                break;
        }
    }
    console.log('Evaluation = ' + eval);
    return eval;
}

function kingExposure(chess, moveVec, kPos, mult) {
    var rPos = kPos[2] + mult * moveVec[2];
    var fPos = kPos[3] + mult * moveVec[3];
    if (rPos < 0 || fPos < 0 || rPos > 7 || fPos > 7) {
        return {
            piecePos: undefined,
            squares: 0,
        };
    }
    if (chess.rawBoard[kPos[0]][kPos[1]][rPos][fPos] !== 0) {
        return {
            piecePos: [kPos[0], kPos[1], rPos, fPos],
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
var depth = 4;
var killer;

console.time("Evaluation with Depth = " + depth);
var totalEval = negaMax(chess, depth, alpha, beta, killer); //Function call
console.timeEnd("Evaluation with Depth = " + depth);
chess.print();
console.log(totalEval.evalMove)
console.log("Move = " + chess.raw.pgnFuncs.fromMove(totalEval.evalMove, chess.rawBoard, chess.rawAction) + ' : ' + Math.round(totalEval.eval * 1000) / 1000);

function negaMax(chess, depth, alpha, beta, killer) {

    if (depth == 0) {// Depth limit

        //chess.print()

        return {
            eval: evaluate(chess),
            evalMove: [],
            killerMove: [],
        };
    }

    var possibleMoves = chess.raw.boardFuncs.moves(chess.rawBoard, chess.rawAction, 1, 1, 1, chess.rawPromotionPieces);

    for (var m = 0; m < possibleMoves.length; m++) {
        var tempChess = chess.copy();
        tempChess.raw.boardFuncs.move(tempChess.rawBoard, possibleMoves[m]);
        if (tempChess.inCheck) {
            possibleMoves.splice(m, 1);
            m--;
        }
    }

    var validMoveAmount = possibleMoves.length;
    if (validMoveAmount == 0 && chess.inCheck) {
        return {
            eval: -Infinity,
            evalMove: [],
            killerMove: [],
        };
    }



    if (killer !== undefined) {
        var index = possibleMoves.findIndex(killerHeuristic, killer)
        if (index !== -1) {
            possibleMoves.splice(index, 1);
            possibleMoves.unshift(killer);
        }
    }

    
    for (var v = 0; v < validMoveAmount; v++) {
        var nodeChess = chess.copy();
        nodeChess.raw.boardFuncs.move(nodeChess.rawBoard, possibleMoves[v]);
        nodeChess.rawAction++;
        var out = negaMax(nodeChess, depth - 1, -beta, -alpha, killer)
        score = -out.eval
        killer=out.killerMove

        if (score > alpha) {
            alpha = score;
            var alphaMove = possibleMoves[v];
        }
        if (score >= beta) {
            var betaMove = possibleMoves[v];
            break;
        }
    }


    return {
        eval: alpha,
        evalMove: alphaMove,
        killerMove: betaMove,
    };
}

function killerHeuristic(killerMove) {
    return killerMove[0][2] == this[0][2] && killerMove[0][3] == this[0][3] && killerMove[1][2] == this[1][2] && killerMove[1][3] == this[1][3];
}


console.log("Postions Checked = " + global);