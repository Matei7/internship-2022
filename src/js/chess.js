import $ from 'jquery';
import {
    BRD_SQ_NUM,
    CastleKeys,
    SideKey,
    FILES,
    FilesBrd,
    FR2SQ,
    ParseFen,
    PieceKeys,
    PrintBoard,
    RAND_32,
    RANKS,
    RanksBrd,
    Sq120toSq64,
    Sq64toSq120,
    SQUARES,
    START_FEN,

    GameBoard,
    MAXGAMEMOVES,
    NOMOVE,
    PVENTRIES,
    PrMove,
    SQ120,
    PIECES,
    SideChar,
    PieceCol,
    PceChar,
    BOOL,
    COLOURS,
    PrSq,
    GenerateMoves,
    FROMSQ,
    PROMOTED,
    TOSQ,
    MakeMove,
    TakeMove,
    MFLAGCA,
    CAPTURED,
    MFLAGEP,
    SqAttacked,
    PCEINDEX,
    Kings,
    SearchController,
    SearchPosition,
    MAXDEPTH
} from "./objects.js";

$(function (){
    init()
    console.log("Main Init Called");
    NewGame(START_FEN);
    // ParseFen(START_FEN);
    // PrintBoard();
    // GenerateMoves();
    // PrintMoveList();
    // PrintPieceLists();
    // CheckBoard();
    // MakeMove(GameBoard.moveList[0]);
    // PrintBoard();
    // CheckBoard();
    // TakeMove();
    // PrintBoard();
    // CheckBoard();
});

function InitFilesRanksBrd(){

    for(let i = 0; i < BRD_SQ_NUM; ++i){
        FilesBrd[i] = SQUARES.OFFBOARD;
        RanksBrd[i] = SQUARES.OFFBOARD;
    }

    for(let rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank){
        for(let file = FILES.FILE_A; file <= FILES.FILE_H; ++file){
            let sq = FR2SQ(file, rank);
            FilesBrd[sq] = file;
            RanksBrd[sq] = rank;
        }
    }
}

function InitHashKeys(){
    for(let i = 0; i < 14 * 120; ++i){
        PieceKeys[i] = RAND_32();
    }
    SideKey[0] = RAND_32();
    for(let i = 0; i < 16; ++i){
        CastleKeys[i] = RAND_32();
    }
}

function InitSq120To64(){
    let sq = SQUARES.A1;
    let sq64 = 0;

    for(let i = 0; i < BRD_SQ_NUM; ++i){
        Sq64toSq120[i] = 65;
    }

    for(let i = 0; i < 64; ++i){
        Sq120toSq64[i] = 120;
    }

    for(let rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank){
        for(let file = FILES.FILE_A; file <= FILES.FILE_H; ++file){
            sq = FR2SQ(file, rank);
            Sq64toSq120[sq64] = sq;
            Sq120toSq64[sq] = sq64;
            sq64++;
        }
    }
}

export function PrintMoveList(){
    console.log("MoveList: ");

    for(let i = GameBoard.moveListStart[GameBoard.ply]; i < GameBoard.moveListStart[GameBoard.ply+1]; ++i){
        let move = GameBoard.moveList[i];
        console.log(PrMove(move));
    }
}

function InitBoardVars(){
    for(let i = 0; i < MAXGAMEMOVES; ++i){
        GameBoard.history.push({
            move : NOMOVE,
            castlePerm : 0,
            enPas : 0,
            fiftyMove : 0,
            posKey : 0
        });

        for(let i = 0; i < PVENTRIES; ++i){
            GameBoard.PvTable.push({
               move : NOMOVE,
               posKey : 0
            });
        }
    }
}

function InitBoardSquares() {
    let light = 1;
    let lightString;

    for(let rankIter = RANKS.RANK_8; rankIter >= RANKS.RANK_1; rankIter--) {
        light ^= 1;
        let rankName = "rank" + (rankIter + 1);
        for(let fileIter = FILES.FILE_A; fileIter <= FILES.FILE_H; fileIter++) {
            let fileName = "file" + (fileIter + 1);
            if(light === 0){
                lightString="Light";
            }
            else{
                lightString = "Dark";
            }
            light^=1;
            let divString = "<div class=\"Square " + rankName + " " + fileName + " " + lightString + "\">Ceva</div>";
            $("#Board").append(divString);
        }
    }

}

function NewGame(fenStr) {
    ParseFen(fenStr);
    PrintBoard();
    SetInitialBoardPieces();
}

function ClearAllPieces() {
    $(".Piece").remove();
}

function SetInitialBoardPieces() {
    ClearAllPieces();

    for(let sq = 0; sq < 64; ++sq) {
        let sq120 = SQ120(sq);
        let pce = GameBoard.pieces[sq120];
        if(pce >= PIECES.wP && pce <= PIECES.bK){
            AddGUIPiece(sq120, pce);
        }
    }

}

function DeSelectSq(sq) {
    $('.Square').each( function() {
        if( (RanksBrd[sq] === 7 - Math.round($(this).position().top/60) ) &&
            FilesBrd[sq] === Math.round($(this).position().left/60) ) {
            $(this).removeClass('SqSelected');
        }
    } );
}

function SetSqSelected(sq) {
    $('.Square').each( function() {
        if( (RanksBrd[sq] === 7 - Math.round($(this).position().top/60) ) &&
            FilesBrd[sq] === Math.round($(this).position().left/60) ) {
            $(this).addClass('SqSelected');
        }
    } );
}

function ClickedSquare(pageX, pageY) {
    console.log('ClickedSquare() at ' + pageX + ',' + pageY);
    let position = $('#Board').position();

    let workedX = Math.floor(position.left);
    let workedY = Math.floor(position.top);

    pageX = Math.floor(pageX);
    pageY = Math.floor(pageY);

    let file = Math.floor((pageX-workedX) / 60);
    let rank = 7 - Math.floor((pageY-workedY) / 60);

    let sq = FR2SQ(file,rank);

    console.log('Clicked sq:' + PrSq(sq));

    SetSqSelected(sq);

    return sq;
}

$(document).on('click','.Piece', function (e) {
    console.log('Piece Click');

    if(UserMove.from === SQUARES.NO_SQ) {
        UserMove.from = ClickedSquare(e.pageX, e.pageY);
    } else {
        UserMove.to = ClickedSquare(e.pageX, e.pageY);
    }

    MakeUserMove();

});

$(document).on('click','.Square', function (e) {
    console.log('Square Click');
    if(UserMove.from !== SQUARES.NO_SQ) {
        UserMove.to = ClickedSquare(e.pageX, e.pageY);
        MakeUserMove();
    }

});

function MakeUserMove() {

    if(UserMove.from !== SQUARES.NO_SQ && UserMove.to !== SQUARES.NO_SQ) {

        console.log("User Move:" + PrSq(UserMove.from) + PrSq(UserMove.to));

        let parsed = ParseMove(UserMove.from,UserMove.to);

        if(parsed !== NOMOVE) {
            MakeMove(parsed);
            //PrintBoard();
            MoveGUIPiece(parsed);
            CheckAndSet();
            PreSearch();
        }

        DeSelectSq(UserMove.from);
        DeSelectSq(UserMove.to);

        UserMove.from = SQUARES.NO_SQ;
        UserMove.to = SQUARES.NO_SQ;
    }

}

let GameController = {};
GameController.EngineSide = COLOURS.BOTH;
GameController.PlayerSide = COLOURS.BOTH;
GameController.GameOver = BOOL.FALSE;

let UserMove = {};
UserMove.from = SQUARES.NO_SQ;
UserMove.to = SQUARES.NO_SQ;

function ParseMove(from, to) {

    GenerateMoves();

    let Move = NOMOVE;
    let PromPce = PIECES.EMPTY;
    let found = BOOL.FALSE;

    for(let i = GameBoard.moveListStart[GameBoard.ply];
        i < GameBoard.moveListStart[GameBoard.ply + 1]; ++i) {
        Move = GameBoard.moveList[i];
        if(FROMSQ(Move) === from && TOSQ(Move) === to) {
            PromPce = PROMOTED(Move);
            if(PromPce !== PIECES.EMPTY) {
                if( (PromPce === PIECES.wQ && GameBoard.side === COLOURS.WHITE) ||
                    (PromPce === PIECES.bQ && GameBoard.side === COLOURS.BLACK) ) {
                    found = BOOL.TRUE;
                    break;
                }
                continue;
            }
            found = BOOL.TRUE;
            break;
        }
    }

    if(found !== BOOL.FALSE) {
        if(MakeMove(Move) === BOOL.FALSE) {
            return NOMOVE;
        }
        TakeMove();
        return Move;
    }

    return NOMOVE;
}

function PieceIsOnSq(sq, top, left) {

    if( (RanksBrd[sq] === 7 - Math.round(top/60) ) &&
        FilesBrd[sq] === Math.round(left/60) ) {
        return BOOL.TRUE;
    }

    return BOOL.FALSE;

}

function RemoveGUIPiece(sq) {

    $('.Piece').each( function() {
        if(PieceIsOnSq(sq, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).remove();
        }
    } );

}

function AddGUIPiece(sq, pce) {
    let file = FilesBrd[sq];
    let rank = RanksBrd[sq];
    let rankName = "rank" + (rank+1);
    let	fileName = "file" + (file+1);
    let pieceFileName = "C:\\Users\\WinAdmin\\Desktop\\Work\\JavaScript\\internship-2022\\src\\js\\images\\" + SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase() + ".png";
    let	imageString = "<div class=\"Piece " + rankName + " " + fileName + "\">"+ rankName + fileName + "</div>";
    $("#Board").append(imageString);
}

function MoveGUIPiece(move) {

    let from = FROMSQ(move);
    let to = TOSQ(move);

    if(move & MFLAGEP) {
        let epRemove;
        if(GameBoard.side === COLOURS.BLACK) {
            epRemove = to - 10;
        } else {
            epRemove = to + 10;
        }
        RemoveGUIPiece(epRemove);
    } else if(CAPTURED(move)) {
        RemoveGUIPiece(to);
    }

    let file = FilesBrd[to];
    let rank = RanksBrd[to];
    let rankName = "rank" + (rank+1);
    let	fileName = "file" + (file+1);

    $('.Piece').each( function() {
        if(PieceIsOnSq(from, $(this).position().top, $(this).position().left) === BOOL.TRUE) {
            $(this).removeClass();
            $(this).addClass("Piece " + rankName + " " + fileName);
        }
    } );

    if(move & MFLAGCA) {
        switch(to) {
            case SQUARES.G1: RemoveGUIPiece(SQUARES.H1); AddGUIPiece(SQUARES.F1, PIECES.wR); break;
            case SQUARES.C1: RemoveGUIPiece(SQUARES.A1); AddGUIPiece(SQUARES.D1, PIECES.wR); break;
            case SQUARES.G8: RemoveGUIPiece(SQUARES.H8); AddGUIPiece(SQUARES.F8, PIECES.bR); break;
            case SQUARES.C8: RemoveGUIPiece(SQUARES.A8); AddGUIPiece(SQUARES.D8, PIECES.bR); break;
        }
    } else if (PROMOTED(move)) {
        RemoveGUIPiece(to);
        AddGUIPiece(to, PROMOTED(move));
    }
}

function DrawMaterial() {

    if (GameBoard.pceNum[PIECES.wP]!==0 || GameBoard.pceNum[PIECES.bP]!==0) return BOOL.FALSE;
    if (GameBoard.pceNum[PIECES.wQ]!==0 || GameBoard.pceNum[PIECES.bQ]!==0 ||
        GameBoard.pceNum[PIECES.wR]!==0 || GameBoard.pceNum[PIECES.bR]!==0) return BOOL.FALSE;
    if (GameBoard.pceNum[PIECES.wB] > 1 || GameBoard.pceNum[PIECES.bB] > 1) {return BOOL.FALSE;}
    if (GameBoard.pceNum[PIECES.wN] > 1 || GameBoard.pceNum[PIECES.bN] > 1) {return BOOL.FALSE;}

    if (GameBoard.pceNum[PIECES.wN]!==0 && GameBoard.pceNum[PIECES.wB]!==0) {return BOOL.FALSE;}
    if (GameBoard.pceNum[PIECES.bN]!==0 && GameBoard.pceNum[PIECES.bB]!==0) {return BOOL.FALSE;}

    return BOOL.TRUE;
}

function ThreeFoldRep() {
    let r = 0;

    for(let i = 0; i < GameBoard.hisPlay; ++i) {
        if (GameBoard.history[i].posKey === GameBoard.posKey) {
            r++;
        }
    }
    return r;
}

function CheckResult() {
    if(GameBoard.fiftyMove >= 100) {
        $("#GameStatus").text("GAME DRAWN {fifty move rule}");
        return BOOL.TRUE;
    }

    if (ThreeFoldRep() >= 2) {
        $("#GameStatus").text("GAME DRAWN {3-fold repetition}");
        return BOOL.TRUE;
    }

    if (DrawMaterial() === BOOL.TRUE) {
        $("#GameStatus").text("GAME DRAWN {insufficient material to mate}");
        return BOOL.TRUE;
    }

    GenerateMoves();

    let MoveNum = 0;
    let found = 0;

    for(MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum)  {

        if ( MakeMove(GameBoard.moveList[MoveNum]) === BOOL.FALSE)  {
            continue;
        }
        found++;
        TakeMove();
        break;
    }

    if(found !== 0)
        return BOOL.FALSE;

    let InCheck = SqAttacked(GameBoard.pList[PCEINDEX(Kings[GameBoard.side],0)], GameBoard.side^1);

    if(InCheck === BOOL.TRUE) {
        if(GameBoard.side === COLOURS.WHITE) {
            $("#GameStatus").text("GAME OVER {black mates}");
            return BOOL.TRUE;
        } else {
            $("#GameStatus").text("GAME OVER {white mates}");
            return BOOL.TRUE;
        }
    } else {
        $("#GameStatus").text("GAME DRAWN {stalemate}");
        return BOOL.TRUE;
    }
}

function CheckAndSet() {
    if(CheckResult() === BOOL.TRUE) {
        GameController.GameOver = BOOL.TRUE;
    } else {
        GameController.GameOver = BOOL.FALSE;
        $("#GameStatus").text('');
    }
}

function PreSearch() {
    if(GameController.GameOver === BOOL.FALSE) {
        SearchController.thinking = BOOL.TRUE;
        setTimeout( function() { StartSearch(); }, 200 );
    }
}

$('#SearchButton').click( function () {
    GameController.PlayerSide = GameController.side ^ 1;
    PreSearch();
});

function StartSearch() {

    SearchController.depth = MAXDEPTH;
    let tt = $('#ThinkTimeChoice').val();

    SearchController.time = parseInt(tt) * 1000;
    SearchPosition();

    MakeMove(SearchController.best);
    MoveGUIPiece(SearchController.best);
    CheckAndSet();
}

function init(){
    console.log("init() called");
    InitFilesRanksBrd();
    InitHashKeys();
    InitSq120To64();
    InitBoardVars();
}

$('#SetFen').click(function (){
   let fenStr = $('#fenIn').val();
   ParseFen(fenStr);
   PrintBoard();
   PrintMoveList();
   SearchPosition();
   InitBoardSquares();
});

$('#TakeButton').click( function () {
    if(GameBoard.hisPlay > 0) {
        TakeMove();
        GameBoard.ply = 0;
        SetInitialBoardPieces();
    }
});

$('#NewGameButton').click( function () {
    NewGame(START_FEN);
});





