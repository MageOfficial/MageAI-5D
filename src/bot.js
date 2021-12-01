//Mage-5DAI

var Chess = require('5d-chess-js');
var chess = new Chess();
chess.reset("turn_zero");

var puzzle = 0
//Los v Tesseract Mate in 6
if (puzzle == 1) {

    var str1 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[3qk*b1r*/2p*p*1p*1p*/bp*n1p*1p*n/p*N6/P*3N2P*/1P*B1P*Q2/2P*2P*P*R*/R*3K*B2:0:1:w]';

    chess.import(str1)
    /*
    chess.move('Nf6')
    chess.submit()
    chess.move('Ke7')
    chess.submit()
    chess.move('Nd5')
    chess.submit()
    chess.move('Ke8')
    chess.submit()
    chess.move('Nbxc7')
    chess.submit()
    chess.move('Qxc7')
    chess.submit()
    */
}
// Mage v Nageek - Mate in 2
else if (puzzle == 2) {
    var str2 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[r*n2k*b1r*/p*b1p*qp*p*p*/4p*n2/1p*2N3/8/4P*N2/P*P*1P*1P*P*P*/3QK*B2:0:1:w]';

    chess.import(str2)
    chess.move('Bxb5')
    chess.submit()
    chess.move('Bxf3')
    chess.submit()
    chess.move('Qxf3')
    chess.submit()
    chess.move('Qc5')
    chess.submit()

}
//RyanFour - Mate in 5
else if (puzzle == 3) {
    var str3 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[r*nb1k*bnr*/p*p*1p*2p*p*/4p*3/4qp*B1/Q2N4/2P*5/P*P*2P*P*P*P*/R*N2K*B1R*:0:1:w]';
    chess.import(str3)
}
//Mage - Mate in 3 
else if (puzzle == 4) {
    var str4 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[r*nb1k*b1r*/p*2p*p*p*p*p*/7n/8/2p*P*2B1/2P*1P*N2/P*P*3P*P*P*/R*NBQK*2R*:0:1:w]';
    chess.import(str4)

    chess.move('Bh5')
    chess.submit()
    chess.move('d5')
    chess.submit()
}
//Mage v Samet Knight
else if (puzzle == 5) {
    var str1 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[r*n2k*2r*/p*b1p*1p*bp*/1pq1pnp1/2p5/2P5/BPNBPN1P/P*1QP*1P*P*1/R*3K*2R*:0:1:w]';
    chess.import(str1);

    chess.move('Bb2')
    chess.submit()
    chess.move('Na6')
    chess.submit()
}
//RyanFour Mate in 5?
else if (puzzle == 6) {
    var str1 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[r*nbqk*bnr*/p*p*2p*p*p*p*/2p5/8/5P2/3PPN2/P*P*BP*2P*P*/R*NBQK*2R*:0:1:w]';
    chess.import(str1);
    chess.move('Bb3')
    chess.submit()
    chess.move('Nf6')
    chess.submit()
    chess.move('Bc4')
    chess.submit()
    chess.move('Nd5')
    chess.submit()
    chess.move('Ng1')
    chess.submit()
}
//Mage/Los Mate in 5
else if (puzzle == 7) {
    var str1 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[r*nb2k1r*/1q2p*p*bp*/p4n2/1p6/1P1P1B2/PB2P1N1/3N1P*P*P*/R*2QK*2R*:0:1:w]';
    chess.import(str1);
    chess.move('Bc2')
    chess.submit()
    chess.move('Qc6')
    chess.submit()
    chess.move('Bb3')
    chess.submit()
    chess.move('Qb7')
    chess.submit()
}
//Mage Mate in 6
else if (puzzle == 8) {
    var str1 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[brkq2r1/p*1p*p*b2p*/1pn4p/8/3N4/1P2PNP1/P*1P*P*1P*Q1/R*3K*B1R*:0:1:w]';
    chess.import(str1);
}
//Ryan Four Mate in 5
else if (puzzle == 9) {
    var str1 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[r*1bnk*b1r*/p*p*3p*1p*/2p1pnp1/1N6/2B5/3qPN2/P*P*1P*1P*P*P*/R*1B1K*2R*:0:1:w]';
    chess.import(str1);
}
{
    //f7 sac
    var str1 =
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[Promotions "Q"]\n' +
        '[r*nbq1bnr*/p*p*p*p*p*k*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]';

    var str2 =
        '[Size "6x6"]\n' +
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[Promotions "Q"]\n' +
        '[r*bqk*br*/p*p*p*p*p*p*/6/6/P*P*P*P*P*P*/R*BQK*BR*:0:1:w]';

    //Very Small Open
    var str3 =
        '[Size "4x4"]\n' +
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[Promotions "Q"]\n' +
        '[nbr*k*/3p*/P*3/K*R*BN:0:1:w]';
    //Very Small
    var str4 =
        '[Size "4x4"]\n' +
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[Promotions "Q"]\n' +
        '[nbr*k*/p*p*p*p*/P*P*P*P*/K*R*BN:0:1:w]';

    //Small - Open
    var str5 =
        '[Size "5x5"]\n' +
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[Promotions "Q"]\n' +
        '[p*r*nbk*/3p*p*/5/P*P*3/K*BNR*P*:0:1:w]';

    //Simple no rooks
    var str6 =
        '[Size "6x6"]\n' +
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[Promotions "Q"]\n' +
        '[nbqk*bn/p*p*p*p*p*p*/6/6/P*P*P*P*P*P*/NBQK*BN:0:1:w]';

    //Just Rooks
    var str7 =
        '[Size "5x5"]\n' +
        '[Board "Custom"]\n' +
        '[Mode "5D"]\n' +
        '[Promotions "Q"]\n' +
        '[1r*k*1r*/5/5/5/R*1K*R*1:0:1:w]';


    //chess.import(str7);
}

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
    143,  //queen   3/21
    125  //king     1/8
];
// Piece priority values.
var priorityValues = [
    1000,  // pawn
    4000,  // bishop
    4000,  // knight
    3000,  // rook
    12000,  // queen
    24000  // king
];

// Initial Variables

console.log("\nnegaMax\n");

var isTurnZero = chess.rawBoard.length > 0 ? (chess.rawBoard[0].length > 0 ? chess.rawBoard[0][0] === null : false) : false;
console.log(chess.print())
var initDepth = 5;
var mateOnly = false;
var mateVal = 10000000
var evalSteps = 0;
var global = 0;

console.time("Evaluation with Depth = " + initDepth);
var evaluation = negaMax(chess, initDepth, -Infinity, Infinity, []); // Function call
console.timeEnd("Evaluation with Depth = " + initDepth);
console.log(chess.print())
console.log(evaluation.eval / 1000)
console.log("Move = " + chess.raw.pgnFuncs.fromMove(evaluation.evalMove[evaluation.evalMove.length - 1], chess.rawBoard, chess.rawAction) + ' : ' + evaluation.eval / 1000);
console.log("Postions Checked = " + evalSteps);

console.log(chess.raw.parseFuncs.fromMove(chess.rawBoard, evaluation.evalMove[evaluation.evalMove.length - 1], isTurnZero))


console.log("Cutoffs = " + global);
console.log(evaluation.evalMove)
if (chess.board.player == "white") {
    for (var i = 0; i < (evaluation.evalMove.length / 2); i++) {

        var firstMove = i + 1 + ". " + chess.raw.pgnFuncs.fromMove(evaluation.evalMove[evaluation.evalMove.length - 1 - 2 * i], chess.rawBoard, chess.rawAction)
        chess.move(evaluation.evalMove[evaluation.evalMove.length - 1 - 2 * i]);
        chess.submit();
        if (evaluation.evalMove[evaluation.evalMove.length - 2 - 2 * i] != undefined) {
            console.log(firstMove + " / " + chess.raw.pgnFuncs.fromMove(evaluation.evalMove[evaluation.evalMove.length - 2 - 2 * i], chess.rawBoard, chess.rawAction));
            chess.move(evaluation.evalMove[evaluation.evalMove.length - 2 - 2 * i]);
            chess.submit();
        }
        else {
            console.log(firstMove)
        }
    }
}
else {
    var firstMove = "1. ..."
    if (evaluation.evalMove[evaluation.evalMove.length - 1] != undefined) {
        console.log(firstMove + " / " + chess.raw.pgnFuncs.fromMove(evaluation.evalMove[evaluation.evalMove.length - 1], chess.rawBoard, chess.rawAction));
        chess.move(evaluation.evalMove[evaluation.evalMove.length - 1]);
        chess.submit();
    }
    else {
        console.log(firstMove)
    }
    for (var i = 0; i < (evaluation.evalMove.length / 2); i++) {
        var firstMove = i + 2 + ". " + chess.raw.pgnFuncs.fromMove(evaluation.evalMove[evaluation.evalMove.length - 2 - 2 * i], chess.rawBoard, chess.rawAction)
        chess.move(evaluation.evalMove[evaluation.evalMove.length - 2 - 2 * i]);
        chess.submit();
        if (evaluation.evalMove[evaluation.evalMove.length - 3 - 2 * i] != undefined) {
            console.log(firstMove + " / " + chess.raw.pgnFuncs.fromMove(evaluation.evalMove[evaluation.evalMove.length - 3 - 2 * i], chess.rawBoard, chess.rawAction));
            chess.move(evaluation.evalMove[evaluation.evalMove.length - 3 - 2 * i]);
            chess.submit();
        }
        else {
            console.log(firstMove)
        }
    }
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
        return -mateVal + initDepth;
    }
    if (mateOnly === true) {
        return 0;
    }

    // Initialize variables.
    var eval = 0;
    var noQueen = [true, true]
    var noBishop = [true, true]
    var kingToCheck = []
    var curBoard = chess.board;
    var curTimeline = curBoard.timelines[0];
    var curTurn = curTimeline.turns[curTimeline.turns.length - 1];
    var knightMoves = [
        [0, 0, 1, 2], [0, 0, 1, -2], [0, 0, -1, 2], [0, 0, -1, -2],
        [0, 0, 2, 1], [0, 0, 2, -1], [0, 0, -2, 1], [0, 0, -2, -1]
    ];
    var queenMoves = [
        [0, 0, 0, 1], [0, 0, 0, -1], [0, 0, 1, 0], [0, 0, -1, 0],
        [0, 0, -1, 1], [0, 0, 1, 1], [0, 0, -1, -1], [0, 0, 1, -1]
    ];

    var timelineNum = curTimeline.timeline;
    var turnNum = curTimeline.turns.length - !isTurnZero;

    var curPlayer = curBoard.player == "black";
    var pieces = curTurn.pieces;

    // Loop through all pieces in the position.
    for (var i = 0; i < pieces.length; i++) {

        // Current piece to evaluate and corresponding information.
        var curPiece = pieces[i];
        var pieceNum = chess.raw.pieceFuncs.fromChar(curPiece.piece, curPiece.player == "black");
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

        // If the piece is a king, evaluate vulnerable squares and king's pieces.
        if (pieceIndex === 5) {
            kingToCheck.push({ location: curLocation, color: pieceNum % 2 })
            //eval += playerSign * kingExposure(chess, curLocation, pieceNum % 2, queenMoves, knightMoves);
        }
        else if (pieceIndex == 1) {
            noBishop[pieceNum % 2] = false
        }
        else if (pieceIndex == 4) {
            noQueen[pieceNum % 2] = false
        }

    }
    for (var i = 0; i < kingToCheck.length; i++) {
        playerSign = kingToCheck[i].color == curPlayer ? 1 : -1;
        eval += playerSign * kingExposure(chess, kingToCheck[i].location, kingToCheck[i].color, queenMoves, knightMoves, noQueen[1 - kingToCheck[i].color], noBishop[1 - kingToCheck[i].color]);
    }
    //console.log("Evaluation = " + eval);
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
function kingExposure(chess, kPos, kingColor, queenMoves, knightMoves, noQueen, noBishop) {
    // Evaluate king safety and find king's pieces.
    var eval = 0;
    var kingExFac = 500;
    var kingDFac = 500;
    var exposedSq = 0;
    var kingPieces = [];

    // Loop through all eight directions (queen's movement).
    for (var v = 0; v < 8; v++) {
        var rPos = kPos[2] + queenMoves[v][2];
        var fPos = kPos[3] + queenMoves[v][3];
        while (rPos >= 0 && fPos >= 0 && rPos <= chess.rawBoard[kPos[0]][kPos[1]].length - 1 && fPos <= chess.rawBoard[kPos[0]][kPos[1]][0].length - 1) {
            if (chess.rawBoard[kPos[0]][kPos[1]][rPos][fPos] !== 0) {
                kingPieces.push([kPos[0], kPos[1], rPos, fPos]);
                break;
            }
            rPos += queenMoves[v][2];
            fPos += queenMoves[v][3];
            if (!noQueen || (!noBishop) & (v < 4)) {
                exposedSq++;
            }
        }
    }

    var curBoard = chess.rawBoard[kPos[0]][kPos[1]];
    for (var i = 0; i < kingPieces.length; i++) {
        var kingPawnDefense = kingPieceCheck(curBoard, kingPieces[i], kingColor, queenMoves, knightMoves);
        if (kingPawnDefense <= 0) {
            eval += (kingPawnDefense - 1) * kingDFac;
        }
    }

    // Decrease the evaluation if there are more than 4 exposed squares.
    if (exposedSq > 4) {
        eval -= (exposedSq - 5) * kingExFac;
    }
    return eval;
}
function kingPieceCheck(curBoard, kingPiece, kingColor, queenMoves, knightMoves) {
    var kingPieceDefense = 0;

    var ranks = curBoard.length - 1
    var files = curBoard[0].length - 1
    // Knight
    for (var j = 0; j < knightMoves.length; j++) {
        var rPos = kingPiece[2] + knightMoves[j][2];
        var fPos = kingPiece[3] + knightMoves[j][3];


        if (rPos >= 0 && fPos >= 0 && rPos <= ranks && fPos <= files) {
            var pieceNum = Math.abs(curBoard[rPos][fPos]);
            if (pieceNum === 5 || pieceNum === 6) {
                kingPieceDefense += (pieceNum % 2 === kingColor ? 1 : -1);
            }
        }
    }

    // RF
    for (var j = 0; j < 4; j++) {
        var rPos = kingPiece[2] + queenMoves[j][2];
        var fPos = kingPiece[3] + queenMoves[j][3];

        while (rPos >= 0 && fPos >= 0 && rPos <= ranks && fPos <= files) {
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

        if (rPos >= 0 && fPos >= 0 && rPos <= ranks && fPos <= files) {
            var pieceNum = Math.abs(curBoard[rPos][fPos]);
            if (pieceNum !== 0) {

                if (pieceNum <= 2 && pieceNum % 2 === j % 2) {
                    kingPieceDefense += (pieceNum % 2 === kingColor ? 1 : -1);
                }
                else if (pieceNum === 3 || pieceNum === 4 || pieceNum === 9 || pieceNum === 10) {
                    kingPieceDefense += (pieceNum % 2 === kingColor ? 1 : -1);
                }
                else {
                    continue;
                }
            }


            rPos += queenMoves[j][2];
            fPos += queenMoves[j][3];
            while (rPos >= 0 && fPos >= 0 && rPos <= ranks && fPos <= files) {
                var pieceNum = Math.abs(curBoard[rPos][fPos]);
                if (pieceNum !== 0) {
                    if (pieceNum === 3 || pieceNum === 4 || pieceNum === 9 || pieceNum === 10) {
                        kingPieceDefense += (pieceNum % 2 === kingColor ? 1 : -1);
                    }
                    else {
                        break;
                    }
                }
                rPos += queenMoves[j][2];
                fPos += queenMoves[j][3];
            }
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
    //console.log("Depth= " + depth + ", Alpha= " + alpha + ", Beta= " + beta)
    var curMate = mateVal - initDepth + depth

    if (alpha < -curMate) {
        alpha = -curMate;
    }
    if (beta > curMate - 1) {
        beta = curMate - 1;
    }
    if (alpha >= beta) {
        return {
            eval: alpha,
            evalMove: [],
            killerMove: undefined
        };
    }

    // Depth limit.
    if (depth <= 0) {
        // chess.print();
        return { eval: evaluate(chess), evalMove: [], killerMove: undefined };
    }

    // Generate the current player's valid moves and order them.
    var killerMoves = killer.slice();
    var validMoves = moveGen(chess, killerMoves);

    validMoves.sort((a, b) => b.value - a.value)

    var alphaMove = [];
    var score = -mateVal - depth + initDepth;

    for (var i = 0; i < validMoves.length; i++) {
        //console.log(chess.raw.pgnFuncs.fromMove(validMoves[i].move, chess.rawBoard, chess.rawAction) +" : " +validMoves[i].value)
        // Copy the board state and play move "i".
        var tempChess = chess.copy();
        tempChess.raw.boardFuncs.move(tempChess.rawBoard, validMoves[i].move);
        tempChess.rawBoardHistory.push(tempChess.raw.boardFuncs.copy(tempChess.rawBoard));
        tempChess.rawAction++;

        // Recursively calls the function to obtain the evaluation of the current position.
        //console.log(chess.raw.pgnFuncs.fromMove(validMoves[i].move, chess.rawBoard, chess.rawAction))
        var output = negaMax(tempChess, depth - 1, -beta, -alpha, killerMoves);
        //  console.log(chess.raw.pgnFuncs.fromMove(validMoves[i].move, chess.rawBoard, chess.rawAction) + " : " + -output.eval)
        score = Math.max(score, -output.eval);
        //score = -output.eval
        if (output.killerMove !== undefined) {
            addKiller(killerMoves, output.killerMove);
        }

        // A better move has been found.
        if (score > alpha) {
            alpha = score;
            alphaMove = output.evalMove.slice();
            alphaMove[depth - 1] = validMoves[i].move;
        }
        /*
        if (score==alpha){ //Used for record keeping of PV
            alpha = score;
            alphaMove = output.evalMove.slice();
            alphaMove[depth - 1] = validMoves[i].move;
        }
        */

        if (score >= mateVal - initDepth - 1) {
            var betaMove = validMoves[i].move;
            global++;
            break;
        }

        else if (score >= beta) { // The position is too good, the opponent will avoid it.
            var betaMove = validMoves[i].move;
            global++;
            break;
        }
    }

    return {
        eval: score,
        evalMove: alphaMove,
        killerMove: betaMove
    };
}

// Generates all valid moves for the given pieces.
function moveGen(chess, killerMoves) {
    // Initialize variables.
    var curTimeline = chess.board.timelines[0];
    var timelineNum = curTimeline.timeline;
    var turnNum = curTimeline.turns.length - !isTurnZero;
    var player = chess.board.player;
    var curTurn = curTimeline.turns[curTimeline.turns.length - 1];
    var pieces = curTurn.pieces;
    var validMoves = [];


    if (player == "black") {
        for (var i = 0; i < pieces.length; i++) {
            var curPiece = pieces[i];
            if (curPiece.player == "black") {
                var curLocation = [timelineNum, turnNum, curPiece.position.rank - 1, curPiece.position.file - 1];
                var possibleMoves = chess.raw.pieceFuncs.moves(chess.rawBoard, curLocation, 1, chess.rawPromotionPieces);
                for (var j = 0; j < possibleMoves.length; j++) {
                    chess.raw.boardFuncs.move(chess.rawBoard, possibleMoves[j]);
                    if (!chess.inCheck) {

                        chess.rawAction++;
                        chess.raw.mateFuncs.blankAction(chess.rawBoard, chess.rawAction);
                        var checkCaused = chess.inCheck
                        chess.rawBoard[0].pop();
                        chess.rawAction--;

                        validMoves.push({ move: possibleMoves[j], value: sortValue(chess, checkCaused, possibleMoves[j], Math.abs(chess.rawBoard[curLocation[0]][curLocation[1]][curLocation[2]][curLocation[3]]), killerMoves) })
                    }
                    chess.rawBoard[0].pop();
                }
            }
        }
    }
    else {
        for (var i = 0; i < pieces.length; i++) {
            var curPiece = pieces[i];
            if (curPiece.player == "white") {
                var curLocation = [timelineNum, turnNum, curPiece.position.rank - 1, curPiece.position.file - 1];
                var possibleMoves = chess.raw.pieceFuncs.moves(chess.rawBoard, curLocation, 1, chess.rawPromotionPieces);
                for (var j = 0; j < possibleMoves.length; j++) {
                    chess.raw.boardFuncs.move(chess.rawBoard, possibleMoves[j]);
                    if (!chess.inCheck) {
                        chess.rawAction++;
                        chess.raw.mateFuncs.blankAction(chess.rawBoard, chess.rawAction);
                        var checkCaused = chess.inCheck
                        chess.rawBoard[0].pop();
                        chess.rawAction--;

                        validMoves.push({ move: possibleMoves[j], value: sortValue(chess, checkCaused, possibleMoves[j], Math.abs(chess.rawBoard[curLocation[0]][curLocation[1]][curLocation[2]][curLocation[3]]), killerMoves) })
                    }
                    chess.rawBoard[0].pop();
                }
            }
        }
    }
    return validMoves;
}

function sortValue(chess, checkCaused, move, pieceIndex, killerMoves) {
    //console.log(chess.raw.pgnFuncs.fromMove(move, chess.rawBoard, chess.rawAction));


    //See if move is a killerMove
    for (var i = 0; i < killerMoves.length; i++) {
        if (move[0][2] === killerMoves[i][0][2] && move[0][3] === killerMoves[i][0][3] && move[1][2] === killerMoves[i][1][2] && move[1][3] === killerMoves[i][1][3]) { return Infinity };
    }

    checkVal = checkCaused * 6000

    //Find piece captured
    var pieceCap = Math.abs(chess.rawBoard[move[1][0]][move[1][1]][move[1][2]][move[1][3]])

    //Find piece color
    if (pieceIndex % 2) {
        var forwardBonus = (move[0][2] - move[1][2])
        var pieceType = (pieceIndex - 1) / 2
    }
    else {
        var forwardBonus = (move[1][2] - move[0][2])
        var pieceType = (pieceIndex / 2) - 1
    }

    //Pawn promotion and advancement ordering
    var promotionBonus = 0
    if (pieceType == 0) {
        if (pieceIndex % 2) {
            if (move[1][2] < 3) {
                if (move[1][2] == 0) {
                    promotionBonus = 12000
                }
                else {
                    promotionBonus = 3000 * (1 - (move[1][2]) / (chess.board.height - 1)) + 50
                }
            }
        }
        else if (move[1][2] > (chess.board.height - 4)) {
            if (move[1][2] == chess.board.height - 1) {
                promotionBonus = 12000
            }
            else {
                promotionBonus = 3000 * (move[1][2]) / (chess.board.height - 1) + 50
            }
        }
    }
    //Static Exchange Evaluation
    var exchangeVal = 0
    if (pieceType !== 5) {
        exchangeVal = -see(chess, [move[1][0], move[1][1] + 1, move[1][2], move[1][3]], 1 - (pieceIndex % 2)) / 2
    }

    //Forward Bonus

    //var centralBonus = 50*(move[1][2]-move[0][2])

    //Check if there is no piece being capture
    if (pieceCap == 0) {

        //var moveSpace = priorityValues[pieceType]
        var moveSpace = [100, 300, 250, 50, 200, 0][pieceType]
        //return (240 - moveSpace / 100) / 2 + promotionBonus + exchangeVal +checkVal+forwardBonus;

        return moveSpace + promotionBonus + exchangeVal + checkVal + 50 * forwardBonus;


    }
    else {
        if (pieceCap % 2) {
            var pieceCapType = (pieceCap - 1) / 2
        }
        else {
            var pieceCapType = (pieceCap / 2) - 1
        }

        //Get values of piece being captured and piece that is moving
        var moveSpace = priorityValues[pieceType]
        var moveCap = priorityValues[pieceCapType]

        return moveCap + (240 - moveSpace / 100) / 2 + promotionBonus + exchangeVal + checkVal + 50 * forwardBonus;
    }
}

function see(chess, square, color) {
    var value = 0;
    var piece = []
    piece = getSmallestAttacker(chess, square, color);
    // skip if the square isn't attacked anymore by this side 
    if (piece.length != 0) {
        pieceToCap = matValues[Math.ceil((Math.abs(chess.rawBoard[square[0]][square[1]][square[2]][square[3]]) / 2)) - 1]
        chess.raw.boardFuncs.move(chess.rawBoard, [piece, square]);
        chess.rawAction++;
        // Do not consider captures if they lose material, therefor max zero 
        value = Math.max(0, pieceToCap - see(chess, [square[0], square[1] + 1, square[2], square[3]], 1 - color));
        chess.rawBoard[0].pop();
        chess.rawAction--;
    }
    return value;
}

function getSmallestAttacker(chess, square, color) {
    var minValue = Infinity
    var knightMoves = [
        [0, 0, 1, 2], [0, 0, 1, -2], [0, 0, -1, 2], [0, 0, -1, -2],
        [0, 0, 2, 1], [0, 0, 2, -1], [0, 0, -2, 1], [0, 0, -2, -1]
    ];
    var queenMoves = [
        [0, 0, 0, 1], [0, 0, 0, -1], [0, 0, 1, 0], [0, 0, -1, 0],
        [0, 0, -1, 1], [0, 0, 1, 1], [0, 0, -1, -1], [0, 0, 1, -1]
    ];

    var curBoard = chess.rawBoard[square[0]][square[1]];
    var ranks = curBoard.length - 1
    var files = curBoard[0].length - 1
    var piecePos = []
    // Diagonal
    for (var j = 4; j < 8; j++) {
        var rPos = square[2] + queenMoves[j][2];
        var fPos = square[3] + queenMoves[j][3];

        if (rPos >= 0 && fPos >= 0 && rPos <= ranks && fPos <= files) {
            var pieceNum = Math.abs(curBoard[rPos][fPos]);
            if (pieceNum !== 0) {
                if (pieceNum % 2 == color) {
                    if (pieceNum <= 2 && pieceNum % 2 === j % 2) {
                        if (matValues[0] < minValue) {
                            minValue = matValues[0]
                            piecePos = [square[0], square[1], rPos, fPos];
                        }
                    }
                    else if (pieceNum === 3 || pieceNum === 4 || pieceNum === 9 || pieceNum === 10) {
                        if (matValues[Math.ceil((pieceNum / 2)) - 1] < minValue) {
                            minValue = matValues[Math.ceil((pieceNum / 2)) - 1]
                            piecePos = [square[0], square[1], rPos, fPos];
                        }
                    }
                }
                break;
            }
            rPos += queenMoves[j][2];
            fPos += queenMoves[j][3];
            while (rPos >= 0 && fPos >= 0 && rPos <= ranks && fPos <= files) {
                var pieceNum = Math.abs(curBoard[rPos][fPos]);
                if (pieceNum !== 0) {
                    if ((pieceNum % 2 == color) & (pieceNum === 3 || pieceNum === 4 || pieceNum === 9 || pieceNum === 10)) {
                        if (matValues[Math.ceil((pieceNum / 2)) - 1] < minValue) {
                            minValue = matValues[Math.ceil((pieceNum / 2)) - 1]
                            piecePos = [square[0], square[1], rPos, fPos];
                        }
                    }
                    break;
                }
                rPos += queenMoves[j][2];
                fPos += queenMoves[j][3];
            }
        }
    }

    //Knight
    for (var j = 0; j < knightMoves.length; j++) {
        var rPos = square[2] + knightMoves[j][2];
        var fPos = square[3] + knightMoves[j][3];

        if (rPos >= 0 && fPos >= 0 && rPos <= ranks && fPos <= files) {
            var pieceNum = Math.abs(curBoard[rPos][fPos]);

            if ((pieceNum % 2 == color) & (pieceNum === 5 || pieceNum === 6) & (matValues[2] < minValue)) {
                minValue = matValues[2]
                piecePos = [square[0], square[1], rPos, fPos];
            }
        }
    }

    // RF
    for (var j = 0; j < 4; j++) {
        var rPos = square[2] + queenMoves[j][2];
        var fPos = square[3] + queenMoves[j][3];

        while (rPos >= 0 && fPos >= 0 && rPos <= ranks && fPos <= files) {
            var pieceNum = Math.abs(curBoard[rPos][fPos]);
            if (pieceNum !== 0) {
                if ((pieceNum % 2 == color) & (pieceNum >= 7 && pieceNum <= 10)) {
                    if (matValues[Math.ceil((pieceNum / 2)) - 1] < minValue) {
                        minValue = matValues[Math.ceil((pieceNum / 2)) - 1]
                        piecePos = [square[0], square[1], rPos, fPos];
                    }
                }
                break;
            }
            rPos += queenMoves[j][2];
            fPos += queenMoves[j][3];
        }
    }
    return piecePos
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
