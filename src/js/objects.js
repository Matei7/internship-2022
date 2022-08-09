import $ from 'jquery';

export const PIECES = {EMPTY: 0, wP: 1, wN: 2, wB: 3, wR: 4, wQ: 5, wK: 6,
            bP: 7, bN: 8, bB: 9, bR: 10, bQ: 11, bK: 12};

export const BRD_SQ_NUM = 120;

export const FILES = {FILE_A: 0, FILE_B: 1, FILE_C: 2, FILE_D: 3,
           FILE_E: 4, FILE_F: 5, FILE_G: 6, FILE_H: 7,
            FILE_NONE: 8};

export const RANKS = {RANK_1: 0, RANK_2: 1, RANK_3: 2, RANK_4: 3,
    RANK_5: 4, RANK_6: 5, RANK_7: 6, RANK_8: 7,
    RANK_NONE: 8};

export const COLOURS = {WHITE: 0, BLACK: 1, BOTH: 2};

export const BOOL = {FALSE: 0, TRUE: 1};

export const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const PceChar = ".PNBRQKpnbrqk";
export const SideChar = "wb-";
export const RankChar = "12345678";
export const FileChar = "abcdefgh";

export const SQUARES = {
    A1:21, B1:22, C1:23, D1:24, E1:25, F1:26, G1:27, H1:28,
    A8:91, B8:92, C8:93, D8:94, E8:95, F8:96, G8:97, H8:98,
    NO_SQ:99, OFFBOARD:100
};

export const MAXGAMEMOVES = 2048;
export const MAXPOSITIONSMOVES = 256;
export const MAXDEPTH = 64; //cautare pentru mutare
export const INFINITE = 30000;
export const MATE = 29000;
export const PVENTRIES = 10000;

export let FilesBrd = new Array(BRD_SQ_NUM);
export let RanksBrd = new Array(BRD_SQ_NUM);

export const KnDir = [-8, -19, -21, -12, 9, 19, 21, 12];
export const RkDir = [-1, -10, 1, 10];
export const BiDir = [-9, -11, 11, 9];
export const KiDir = [-1, -10, 1, 10, -9, -11, 11, 9];

export const DirNum = [0, 0, 8, 4, 4, 8, 8, 0, 8, 4, 4, 8, 8];
export const PceDir = [0, 0, KnDir, BiDir, RkDir, KiDir, KiDir, 0, KnDir, BiDir, KiDir, KiDir];
export const LoopNonSlidePce = [ PIECES.wN, PIECES.wK, 0, PIECES.bN, PIECES.bK];
export const LoopNonSlideIndex = [0, 3];
export const LoopSlidePce = [PIECES.wB, PIECES.wR, PIECES.wQ, 0, PIECES.bB, PIECES.bR, PIECES.bQ, 0];
export const LoopSlideIndex = [0, 4];

export function FR2SQ(f,r){
    return ((21 + (f)) + ((r) * 10))
}

export const CASTLEBIT = {WKCA: 1, WQCA: 2,
                         BKCA: 4, BQCA: 8};
//bitlogic - ne spune ce rocada poate face fiecare K

//facute dupa array-ul de PIECES
export const PieceVal= [ 0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000  ];
export const PieceCol = [ COLOURS.BOTH, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE,
    COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK ];

export const PiecePawn = [ BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
export const PieceKnight = [ BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE ];
export const PieceKing = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE ];
export const PieceRookQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];
export const PieceBishopQueen = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE ];
export const PieceSlides = [ BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE ];

export let PieceKeys = new Array(14 * 120);
export let SideKey = new Array(1);
export let CastleKeys = new Array(16); // 1111

export let Sq120toSq64 = new Array(BRD_SQ_NUM);
export let Sq64toSq120 = new Array(64);

export function RAND_32(){
    return (Math.floor((Math.random() * 255) + 1) << 23) | (Math.floor((Math.random() * 255) + 1) << 16)
        | (Math.floor((Math.random() * 255) + 1) << 8) | Math.floor((Math.random() * 255) + 1);
}

/*
    unique?
    Piece on Sq - pentru fiecare combinatie va fi alta
    Side
    Castle P
    EnPas

    => posKey ^= RandNum for all pces on sq
        posKey ^= RandNUm side.. si asa mai departe
       de fiecare cand o piesa dispare -> ii dam ^
 */

export const Mirror64 = [
    56	,	57	,	58	,	59	,	60	,	61	,	62	,	63	,
    48	,	49	,	50	,	51	,	52	,	53	,	54	,	55	,
    40	,	41	,	42	,	43	,	44	,	45	,	46	,	47	,
    32	,	33	,	34	,	35	,	36	,	37	,	38	,	39	,
    24	,	25	,	26	,	27	,	28	,	29	,	30	,	31	,
    16	,	17	,	18	,	19	,	20	,	21	,	22	,	23	,
    8	,	9	,	10	,	11	,	12	,	13	,	14	,	15	,
    0	,	1	,	2	,	3	,	4	,	5	,	6	,	7
];

export let GameBoard = {};

GameBoard.pieces = new Array(BRD_SQ_NUM);
GameBoard.side = COLOURS.WHITE;
GameBoard.fiftyMove = 0; //ca sa se poata da draw
GameBoard.hisPlay = 0; //ca sa pot folosi take back
GameBoard.ply = 0; //pentru generarea miscarilor
GameBoard.castlePerm = 0; //permisiune de rocada
GameBoard.material = new Array(2); //ne spune cate de o culoare avem
GameBoard.pceNum = new Array(13); //indexat de Pieces
GameBoard.pList = new  Array(14 * 10); //ca sa nu cautam pe toata tabla
GameBoard.enPas = 0; //pentru pion - 2 la inceput
GameBoard.posKey = 0; //pozitia pe tabla - va fi unic pentru fiecare piesa
                        //daca avem o cheie la fel dupa 3 mutari -> draw
GameBoard.history = [];
GameBoard.moveList = new Array(MAXDEPTH * MAXPOSITIONSMOVES);
GameBoard.moveScores = new Array(MAXDEPTH * MAXPOSITIONSMOVES);
GameBoard.moveListStart = new Array(MAXDEPTH);
GameBoard.PvTable = [];
GameBoard.PvArray = new Array(MAXDEPTH);
GameBoard.searchHistory = new Array(14 * BRD_SQ_NUM);
GameBoard.searchKillers = new Array(3 * MAXDEPTH);

export const Kings = [PIECES.wK, PIECES.bK];
export let CastlePerm = [
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 13, 15, 15, 15, 12, 15, 15, 14, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15,  7, 15, 15, 15,  3, 15, 15, 11, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15
];

export function MIRROR64(sq){
    return Mirror64[sq];
}

export function PCEINDEX(pce, pceNum){
    return (pce * 10 + pceNum);
}

export function SQ64(sq120){
    return Sq120toSq64[(sq120)];
}

export function SQ120(sq64){
    return Sq64toSq120[(sq64)];
}

export function HASH_PCE(pce, sq) {
    GameBoard.posKey ^= PieceKeys[(pce * 120) + sq];
}

export function HASH_CA() {
    GameBoard.posKey ^= CastleKeys[GameBoard.castlePerm];
}

export function HASH_SIDE() {
    GameBoard.posKey ^= SideKey;
}
export function HASH_EP() {
    GameBoard.posKey ^= PieceKeys[GameBoard.enPas];
}

export function PrMove(move){
    let Mvstr;

    let ff = FilesBrd[FROMSQ(move)];
    let rf = RanksBrd[FROMSQ(move)];
    let ft = FilesBrd[TOSQ(move)];
    let rt = RanksBrd[TOSQ(move)];

    Mvstr = FileChar[ff] + RankChar[rf] + FileChar[ft] + RankChar[rt];

    let promoted = PROMOTED(move);

    let pchar = '';
    if (promoted !== PIECES.EMPTY){
        pchar = 'q';
        if(PieceKnight[promoted] === BOOL.TRUE){
            pchar = 'n';
        }
        else if (PieceRookQueen[promoted] === BOOL.TRUE && PieceBishopQueen[promoted] === BOOL.FALSE){
            pchar = 'r';
        }
        else if (PieceRookQueen[promoted] === BOOL.FALSE && PieceBishopQueen[promoted] === BOOL.TRUE){
            pchar = 'b';
        }
    }

    Mvstr += pchar;
    return Mvstr;
}

export function GeneratePosKey(){
    let finalKey = 0;
    for (let sq = 0; sq < BRD_SQ_NUM; ++sq){
        let piece = GameBoard.pieces[sq];
        if(piece !== PIECES.EMPTY && piece !== SQUARES.OFFBOARD){
            finalKey ^= PieceKeys[(piece * 120) + sq];
        }
    }

    if(GameBoard.side === COLOURS.WHITE){
        finalKey ^= SideKey;
    }

    if(GameBoard.enPas !== SQUARES.NO_SQ){
        finalKey ^= PieceKeys[GameBoard.enPas];
    }

    finalKey ^= CastleKeys[GameBoard.castlePerm];

    return finalKey;
}

export function ResetBoard(){
    for(let i = 0; i < BRD_SQ_NUM; ++i){
        GameBoard.pieces[i] = SQUARES.OFFBOARD;
    }

    for(let i = 0; i < 64; ++i){
        GameBoard.pieces[SQ120(i)] = PIECES.EMPTY;
    }

    GameBoard.side = COLOURS.BOTH;
    GameBoard.enPas = SQUARES.NO_SQ;
    GameBoard.fiftyMove = 0;
    GameBoard.ply = 0;
    GameBoard.hisPlay = 0;
    GameBoard.castlePerm = 0;
    GameBoard.posKey = 0;
    GameBoard.moveListStart[GameBoard.ply] = 0;
}

export function UpDateListMaterial(){

    for(let i = 0; i < 14 * 120; ++i){
        GameBoard.pList[i] = PIECES.EMPTY;
    }

    for(let i = 0; i < 2; ++i){
        GameBoard.material[i] = 0;
    }

    for(let i = 0; i < 13; ++i){
        GameBoard.pceNum[i] = 0;
    }

    for(let i = 0; i < 64; ++i){
        let sq = SQ120(i);
        let piece = GameBoard.pieces[sq];
        if(piece !== PIECES.EMPTY){
            // console.log('piece' + piece + ' on ' + sq);
            let colour = PieceCol[piece];

            GameBoard.material[colour] += PieceVal[piece];

            GameBoard.pList[PCEINDEX(piece, GameBoard.pceNum[piece])] = sq;
            GameBoard.pceNum[piece]++;
        }
    }
    //PrintPieceLists();
}

export function PrSq(sq){
    return (FileChar[FilesBrd[sq]] + RankChar[RanksBrd[sq]]);
}

export function PrintPieceLists(){
    for(let piece = PIECES.wP; piece <= PIECES.bK; ++piece){
        for(let pceNum = 0; pceNum < GameBoard.pceNum[piece]; ++pceNum){
            console.log('Piece ' + PceChar[piece] + ' on ' +
            PrSq(GameBoard.pList[PCEINDEX(piece, pceNum)]));
        }
    }
}

//presupunem ca fen-ul este scris corect
export function ParseFen(fen){
    ResetBoard();

    let rank = RANKS.RANK_8;
    let file = FILES.FILE_A;
    let piece = 0;
    let count = 0;
    let sq120 = 0;
    let fenCnt = 0;

    while ((rank >= RANKS.RANK_1) && fenCnt < fen.length){
        count = 1;
        switch (fen[fenCnt]){
            case 'p':
                piece = PIECES.bP;
                break;
            case 'r':
                piece = PIECES.bR;
                break;
            case 'n':
                piece = PIECES.bN;
                break;
            case 'b':
                piece = PIECES.bB;
                break;
            case 'k':
                piece = PIECES.bK;
                break;
            case 'q':
                piece = PIECES.bQ;
                break;
            case 'P':
                piece = PIECES.wP;
                break;
            case 'R':
                piece = PIECES.wR;
                break;
            case 'N':
                piece = PIECES.wN;
                break;
            case 'B':
                piece = PIECES.wB;
                break;
            case 'K':
                piece = PIECES.wK;
                break;
            case 'Q':
                piece = PIECES.wQ;
                break;

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                piece = PIECES.EMPTY;
                count = Number(fen[fenCnt]);
                break;

            case '/':
            case ' ':
                rank--;
                file = FILES.FILE_A;
                fenCnt++;
                continue;
            default:
                console.log("FEN error");
                return;
        }

        for(let i = 0; i < count; ++i){
            sq120 = FR2SQ(file, rank);
            GameBoard.pieces[sq120] = piece;
            file++;
        }
        fenCnt++;
    }

    GameBoard.side = (fen[fenCnt] === 'w') ? COLOURS.WHITE : COLOURS.BLACK;
    fenCnt += 2;
    for(let i = 0; i < 4; ++i){
        if(fen[fenCnt] === ' '){
            break;
        }
        switch (fen[fenCnt]){
            case 'K':
                GameBoard.castlePerm |= CASTLEBIT.WKCA;
                break;
            case 'Q':
                GameBoard.castlePerm |= CASTLEBIT.WQCA;
                break;
            case 'k':
                GameBoard.castlePerm |= CASTLEBIT.BKCA;
                break;
            case 'q':
                GameBoard.castlePerm |= CASTLEBIT.BQCA;
                break;
            default:
                break;
        }
        fenCnt++;
    }
    fenCnt++;

    if(fen[fenCnt] !== '-'){
        file = fen[fenCnt].charCodeAt() - 'a'.charCodeAt();
        rank = Number(fen[fenCnt + 1]);
        console.log("fen[fenCnt]:" + fen[fenCnt] + " File:" + file +
                    " Rank:" + rank);
        GameBoard.enPas = FR2SQ(file, rank);
    }

    GameBoard.posKey = GeneratePosKey();
    UpDateListMaterial();
    //PrintSqAttacked();
}

export function PrintBoard(){
    let sq, piece;

    console.log("\nGambe Board:\n");

    for(let rank = RANKS.RANK_8; rank >= RANKS.RANK_1; --rank){
        let line = (RankChar[rank] + "  ");
        for(let file = FILES.FILE_A; file <= FILES.FILE_H; ++file){
            sq = FR2SQ(file, rank);
            piece = GameBoard.pieces[sq];
            line += (" " + PceChar[piece] + " ");
        }
        console.log(line);
    }

    console.log("");
    let line = "   ";
    for(let file = FILES.FILE_A; file <= FILES.FILE_H; ++file){
        line += (' ' + FileChar[file] + ' ');
    }

    console.log(line);
    console.log("side:" + SideChar[GameBoard.side]);
    console.log("enPas:" + GameBoard.enPas);
    line = "";

    if(GameBoard.castlePerm & CASTLEBIT.WKCA)
        line += 'K';
    if(GameBoard.castlePerm & CASTLEBIT.WQCA)
        line += 'Q';
    if(GameBoard.castlePerm & CASTLEBIT.BKCA)
        line += 'k';
    if(GameBoard.castlePerm & CASTLEBIT.BQCA)
        line += 'q';

    console.log("castle:" + line);
    console.log("key:" + GameBoard.posKey.toString(16));
}

//verifica fiecare posibilitatea de a fi atacat sq de un anumit side
//returneaza true/false
export function SqAttacked(sq, side){
    //atac de pion
    if(side === COLOURS.WHITE){
        if(GameBoard.pieces[sq - 11] === PIECES.wP ||
        GameBoard.pieces[sq - 9] === PIECES.wP)
            return BOOL.TRUE;
    }
    else{
        if(GameBoard.pieces[sq + 11] === PIECES.bP ||
            GameBoard.pieces[sq + 9] === PIECES.bP)
            return BOOL.TRUE;
    }

    //atac de cal
    for(let i = 0; i < 8; ++i){
        let pce = GameBoard.pieces[sq + KnDir[i]];
        if (pce !== SQUARES.OFFBOARD && PieceCol[pce] === side
            && PieceKnight[pce] === BOOL.TRUE)
            return BOOL.TRUE;
    }

    //atac de tura + regina
    for(let i = 0; i < 4; ++i){
        let dir = RkDir[i];
        let t_sq = sq + dir;
        let pce = GameBoard.pieces[t_sq];
        while (pce !== SQUARES.OFFBOARD){
            if (pce !== PIECES.EMPTY){
                if(PieceRookQueen[pce] === BOOL.TRUE &&
                PieceCol[pce] === side)
                    return BOOL.TRUE;
                break;
            }
            t_sq += dir;
            pce = GameBoard.pieces[t_sq];
        }
    }

    //atac de nebun + regina
    for(let i = 0; i < 4; ++i){
        let dir = BiDir[i];
        let t_sq = sq + dir;
        let pce = GameBoard.pieces[t_sq];
        while (pce !== SQUARES.OFFBOARD){
            if (pce !== PIECES.EMPTY){
                if(PieceBishopQueen[pce] === BOOL.TRUE &&
                    PieceCol[pce] === side)
                    return BOOL.TRUE;
                break;
            }
            t_sq += dir;
            pce = GameBoard.pieces[t_sq];
        }
    }

    //atac de rege
    for(let i = 0; i < 8; ++i){
        let pce = GameBoard.pieces[sq + KiDir[i]];
        if (pce !== SQUARES.OFFBOARD && PieceCol[pce] === side
            && PieceKing[pce] === BOOL.TRUE)
            return BOOL.TRUE;
    }

    return BOOL.FALSE;
}

//functia care sa verifice ca detectia atacului functioneaza
export function PrintSqAttacked() {

    let piece;

    console.log("\nAttacked:\n");

    for(let rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
        let line =((rank+1) + "  ");
        for(let file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
            let sq = FR2SQ(file,rank);
            if(SqAttacked(sq, GameBoard.side) === BOOL.TRUE){
                piece = "X";
            }
            else{
                piece = "-";
            }
            line += (" " + piece + " ");
        }
        console.log(line);
    }
    console.log("");
}

/*
    FromSq
    ToSq

    EnPas Cap
    Captured Piece
    Promoted Piece
    Pawn Start
    Castling Move
    ->asta stochez cand doresc sa fac o miscare -> si fac tot cu biti
    To >> 7; Captured >> 14; EP 0x4000, PawnStart 0x8000, PromotedPiece >> 20, Castle 0x1000000
 */

export function FROMSQ(m){
    return (m & 0x7F);
}

export function TOSQ(m){
    return ((m >> 7) & 0x7F);
}

export function CAPTURED(m){
    return ((m >> 14) & 0x7F);
}

export function PROMOTED(m){
    return ((m >> 20) & 0x7F);
}

export const MFLAGEP = 0x40000;
export const MFLAGPS = 0x80000;
export const MFLAGCA = 0x1000000;

export const MFLAGCAP = 0x7C000;
export const MFLAGPROM = 0xF00000;

export const NOMOVE = 0;

export function MOVE(from, to, captured, promoted, flag){
    return (from | (to << 7) | (captured << 14) | (promoted << 21) | flag);
}

export function SQOFFBOARD(sq){
    if(FilesBrd[sq] === SQUARES.OFFBOARD)
        return BOOL.TRUE;
    return BOOL.FALSE;
}

export function AddCaptureMove(move){
    GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply + 1]] = move;
    GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] = MvvLvaScores[CAPTURED(move) * 14 + GameBoard.pieces[FROMSQ(move)]] + 1000000;
    GameBoard.moveListStart[GameBoard.ply + 1]++;

}

export function AddQuietMove(move){
    GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply + 1]] = move;
    GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] = 0;

    if(move === GameBoard.searchKillers[GameBoard.ply]){
        GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] = 900000;
    }
    else if(move === GameBoard.searchKillers[GameBoard.ply + MAXDEPTH]){
        GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] = 800000;
    }
    else{
        GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] =
            GameBoard.searchHistory[GameBoard.pieces[FROMSQ(move) * BRD_SQ_NUM + TOSQ(move)]];
    }
    GameBoard.moveListStart[GameBoard.ply + 1]++;

}

export function AddEnPassantMove(move){
    GameBoard.moveList[GameBoard.moveListStart[GameBoard.ply + 1]] = move;
    GameBoard.moveScores[GameBoard.moveListStart[GameBoard.ply + 1]] = 105 + 1000000;
    GameBoard.moveListStart[GameBoard.ply + 1]++;

}

export function AddWhitePawnCaptureMove(from, to, cap){
    if(RanksBrd[from] === RANKS.RANK_7){
        AddCaptureMove(MOVE(from, to, cap, PIECES.wQ, 0));
        AddCaptureMove(MOVE(from, to, cap, PIECES.wR, 0));
        AddCaptureMove(MOVE(from, to, cap, PIECES.wB, 0));
        AddCaptureMove(MOVE(from, to, cap, PIECES.wN, 0));
    }
    else{
        AddCaptureMove(MOVE(from, to, cap, PIECES.EMPTY, 0));
    }
}

export function AddBlackPawnCaptureMove(from, to, cap){
    if(RanksBrd[from] === RANKS.RANK_2){
        AddCaptureMove(MOVE(from, to, cap, PIECES.bQ, 0));
        AddCaptureMove(MOVE(from, to, cap, PIECES.bR, 0));
        AddCaptureMove(MOVE(from, to, cap, PIECES.bB, 0));
        AddCaptureMove(MOVE(from, to, cap, PIECES.bN, 0));
    }
    else{
        AddCaptureMove(MOVE(from, to, cap, PIECES.EMPTY, 0));
    }
}

export function AddWhitePawnQuietMove(from, to){
    if(RanksBrd[from] === RANKS.RANK_7){
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.wQ, 0));
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.wR, 0));
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.wB, 0));
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.wN, 0));
    }
    else{
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.EMPTY, 0));
    }
}

export function AddBlackPawnQuietMove(from, to){
    if(RanksBrd[from] === RANKS.RANK_2){
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.bQ, 0));
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.bR, 0));
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.bB, 0));
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.bN, 0));
    }
    else{
        AddCaptureMove(MOVE(from, to, PIECES.EMPTY, PIECES.EMPTY, 0));
    }
}

export function GenerateMoves(){
    /*
        Gameboard.moveListStart -> ne indica locatia primei miscari dintr-un ply
        Gameboard.moveList[] -> si aici folosim acea locatie
     */

    GameBoard.moveListStart[GameBoard.ply + 1] = GameBoard.moveListStart[GameBoard.ply];

    if (GameBoard.side === COLOURS.WHITE){
        let pceType = PIECES.wP;

        for(let pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum){
            let sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];
            if (GameBoard.pieces[sq + 10] === PIECES.EMPTY){
                AddWhitePawnQuietMove(sq, sq + 10);
                if (RanksBrd[sq] === RANKS.RANK_2 && GameBoard.pieces[sq + 20] === PIECES.EMPTY){
                    AddQuietMove(MOVE(sq, sq + 20, PIECES.EMPTY, PIECES.EMPTY, MFLAGPS));
                }
            }
            if(SQOFFBOARD(sq + 9) === BOOL.FALSE && PieceCol[GameBoard.pieces[sq + 9]] === COLOURS.BLACK){
                AddWhitePawnCaptureMove(sq, sq + 9, GameBoard.pieces[sq + 9]);
            }

            if(SQOFFBOARD(sq + 11) === BOOL.FALSE && PieceCol[GameBoard.pieces[sq + 11]] === COLOURS.BLACK){
                AddWhitePawnCaptureMove(sq, sq + 11, GameBoard.pieces[sq + 11]);
            }

            if(GameBoard.enPas !== SQUARES.NO_SQ){
                if(sq + 9 === GameBoard.enPas){
                    AddEnPassantMove(MOVE(sq, sq + 9, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }

                if(sq + 11 === GameBoard.enPas){
                    AddEnPassantMove(MOVE(sq, sq + 11, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }
            }
        }

        if(GameBoard.castlePerm & CASTLEBIT.WKCA){
            if(GameBoard.pieces[SQUARES.F1] === PIECES.EMPTY && GameBoard.pieces[SQUARES.G1] === PIECES.EMPTY){
                if(SqAttacked(SQUARES.F1, COLOURS.BLACK) === BOOL.FALSE && SqAttacked(SQUARES.E1, COLOURS.BLACK) === BOOL.FALSE){
                    AddQuietMove(MOVE(SQUARES.E1, SQUARES.G1, PIECES.EMPTY, PIECES.EMPTY, MFLAGCA));
                }
            }
        }

        if(GameBoard.castlePerm & CASTLEBIT.WQCA){
            if(GameBoard.pieces[SQUARES.D1] === PIECES.EMPTY && GameBoard.pieces[SQUARES.C1] === PIECES.EMPTY
                && GameBoard.pieces[SQUARES.B1] === PIECES.EMPTY){
                if(SqAttacked(SQUARES.D1, COLOURS.BLACK) === BOOL.FALSE && SqAttacked(SQUARES.E1, COLOURS.BLACK) === BOOL.FALSE){
                    AddQuietMove(MOVE(SQUARES.E1, SQUARES.C1, PIECES.EMPTY, PIECES.EMPTY, MFLAGCA));
                }
            }
        }
    }
    else{
        let pceType = PIECES.bP;
        for(let pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum){
            let sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];

            if (GameBoard.pieces[sq - 10] === PIECES.EMPTY){
                AddBlackPawnQuietMove(sq, sq - 10);
                if (RanksBrd[sq] === RANKS.RANK_7 && GameBoard.pieces[sq - 20] === PIECES.EMPTY){
                    AddQuietMove(MOVE(sq, sq - 20, PIECES.EMPTY, PIECES.EMPTY, MFLAGPS));
                }
            }
            if(SQOFFBOARD(sq - 9) === BOOL.FALSE && PieceCol[GameBoard.pieces[sq - 9]] === COLOURS.WHITE){
                AddBlackPawnCaptureMove(sq, sq - 9, GameBoard.pieces[sq - 9]);
            }

            if(SQOFFBOARD(sq - 11) === BOOL.FALSE && PieceCol[GameBoard.pieces[sq - 11]] === COLOURS.WHITE){
                AddBlackPawnCaptureMove(sq, sq - 11, GameBoard.pieces[sq - 11]);
            }

            if(GameBoard.enPas !== SQUARES.NO_SQ){
                if(sq - 9 === GameBoard.enPas){
                    AddEnPassantMove(MOVE(sq, sq - 9, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }

                if(sq - 11 === GameBoard.enPas){
                    AddEnPassantMove(MOVE(sq, sq - 11, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }
            }
        }

        if(GameBoard.castlePerm & CASTLEBIT.BKCA){
            if(GameBoard.pieces[SQUARES.F8] === PIECES.EMPTY && GameBoard.pieces[SQUARES.G8] === PIECES.EMPTY){
                if(SqAttacked(SQUARES.F8, COLOURS.WHITE) === BOOL.FALSE && SqAttacked(SQUARES.E8, COLOURS.WHITE) === BOOL.FALSE){
                    AddQuietMove(MOVE(SQUARES.E8, SQUARES.G8, PIECES.EMPTY, PIECES.EMPTY, MFLAGCA));
                }
            }
        }

        if(GameBoard.castlePerm & CASTLEBIT.BQCA){
            if(GameBoard.pieces[SQUARES.D8] === PIECES.EMPTY && GameBoard.pieces[SQUARES.C8] === PIECES.EMPTY
                && GameBoard.pieces[SQUARES.B8] === PIECES.EMPTY){
                if(SqAttacked(SQUARES.D8, COLOURS.WHITE) === BOOL.FALSE && SqAttacked(SQUARES.E8, COLOURS.WHITE) === BOOL.FALSE){
                    AddQuietMove(MOVE(SQUARES.E8, SQUARES.C8, PIECES.EMPTY, PIECES.EMPTY, MFLAGCA));
                }
            }
        }
    }

    let pceIndex = LoopNonSlideIndex[GameBoard.side];
    let pce = LoopNonSlidePce[pceIndex];

    while (pce !== 0){
        for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum){
            let sq = GameBoard.pList[PCEINDEX(pce, pceNum)];

            for(let i = 0; i < DirNum[pce]; ++i){
                let dir = PceDir[pce][i];
                let t_sq = sq + dir;

                if(SQOFFBOARD(t_sq) === BOOL.TRUE){
                    continue;
                }

                if(GameBoard.pieces[t_sq] !== PIECES.EMPTY){
                    if(PieceCol[GameBoard.pieces[t_sq]] !== GameBoard.side){
                        AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
                    }
                }
                else{
                     AddQuietMove(MOVE(sq, t_sq, PIECES.EMPTY, PIECES.EMPTY, 0));
                }
            }
        }
        pceIndex++;
        pce = LoopNonSlidePce[pceIndex];
    }

    pceIndex = LoopSlideIndex[GameBoard.side];
    pce = LoopSlidePce[pceIndex];

    while (pce !== 0){
        for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum){
            let sq = GameBoard.pList[PCEINDEX(pce, pceNum)];

            for(let i = 0; i < DirNum[pce]; ++i){
                let dir = PceDir[pce][i];
                let t_sq = sq + dir;

                while(SQOFFBOARD(t_sq) === BOOL.FALSE){
                    if(GameBoard.pieces[t_sq] !== PIECES.EMPTY){
                        if(PieceCol[GameBoard.pieces[t_sq]] !== GameBoard.side){
                            AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
                        }
                        break;
                    }
                    AddQuietMove(MOVE(sq, t_sq, PIECES.EMPTY, PIECES.EMPTY, 0));
                    t_sq += dir;
                }
            }
        }
        pceIndex++;
        pce = LoopSlidePce[pceIndex];
    }
}

export function ClearPiece(sq){

    let pce = GameBoard.pieces[sq];
    let col = PieceCol[pce];
    let t_pceNum = -1;

    HASH_PCE(pce, sq);
    GameBoard.pieces[sq] = PIECES.EMPTY;
    GameBoard.material[col] -= PieceVal[pce];

    for(let i = 0; i < GameBoard.pceNum[pce]; ++i){
        if(GameBoard.pList[PCEINDEX(pce, i)] === sq){
            t_pceNum = i;
            break;
        }
    }

    GameBoard.pceNum[pce]--;
    GameBoard.pList[PCEINDEX(pce, t_pceNum)] = GameBoard.pList[PCEINDEX(pce, GameBoard.pceNum[pce])];
}

export function AddPiece(sq, pce){
    let col = PieceCol[pce];

    HASH_PCE(pce, sq);
    GameBoard.pieces[sq] = pce;
    GameBoard.material[col] += PieceVal[pce];
    GameBoard.pList[PCEINDEX(pce, GameBoard.pceNum[pce])] = sq;
    GameBoard.pceNum[pce]++;
}

export function MovePiece(from, to){
    let pce = GameBoard.pieces[from];

    HASH_PCE(pce, from);
    GameBoard.pieces[from] = PIECES.EMPTY;
    HASH_PCE(pce, to);
    GameBoard.pieces[to] = pce;

    for(let i = 0; i < GameBoard.pceNum[pce]; ++i){
        if(GameBoard.pList[PCEINDEX(pce, i)] === from){
            GameBoard.pList[PCEINDEX(pce, i)] = to;
            break;
        }
    }
}

export function MakeMove(move){
    let from = FROMSQ(move);
    let to = TOSQ(move);
    let side = GameBoard.side;

    GameBoard.history[GameBoard.hisPlay].posKey = GameBoard.posKey;

    if((move & MFLAGEP) !== 0){
        if(side === COLOURS.WHITE){
            ClearPiece(to - 10);
        }
        else{
            ClearPiece(to + 10);
        }
    }
    else if ((move & MFLAGCA) !== 0){
        switch (to){
            case SQUARES.C1:
                MovePiece(SQUARES.A1, SQUARES.D1);
                break;
            case SQUARES.C8:
                MovePiece(SQUARES.A8, SQUARES.D8);
                break;
            case SQUARES.G1:
                MovePiece(SQUARES.H1, SQUARES.F1);
                break;
            case SQUARES.G8:
                MovePiece(SQUARES.H8, SQUARES.F8);
                break;
            default:
                break;
        }
    }

    if(GameBoard.enPas !== SQUARES.NO_SQ){
        HASH_EP();
    }

    HASH_CA();

    GameBoard.history[GameBoard.hisPlay].move = move;
    GameBoard.history[GameBoard.hisPlay].fiftyMove = GameBoard.fiftyMove;
    GameBoard.history[GameBoard.hisPlay].enPas = GameBoard.enPas;
    GameBoard.history[GameBoard.hisPlay].castlePerm = GameBoard.castlePerm;

    GameBoard.castlePerm &= CastlePerm[from];
    GameBoard.castlePerm &= CastlePerm[to];
    GameBoard.enPas = SQUARES.NO_SQ;

    HASH_CA();

    let captured = CAPTURED(move);
    GameBoard.fiftyMove++;

    if(captured !== PIECES.EMPTY){
        ClearPiece(to);
        GameBoard.fiftyMove = 0;
    }

    GameBoard.hisPlay++;
    GameBoard.ply++;

    if(PiecePawn[GameBoard.pieces[from]] === BOOL.TRUE){
        GameBoard.fiftyMove = 0;
        if ((move & MFLAGPS) !== 0){
            if(side === COLOURS.WHITE){
                GameBoard.enPas = from + 10;
            }
            else{
                GameBoard.enPas = from - 10;
            }
            HASH_EP();
        }
    }

    MovePiece(from, to);

    let prPce = PROMOTED(move);
    if(prPce !== PIECES.EMPTY){
        ClearPiece(to);
        AddPiece(to, prPce);
    }

    GameBoard.side ^= 1;
    HASH_SIDE();

    if(SqAttacked(GameBoard.pList[PCEINDEX(Kings[side], 0)], GameBoard.side)){
        TakeMove();
        return BOOL.FALSE;
    }

    return BOOL.TRUE;
}

export function TakeMove(){
    GameBoard.hisPlay--;
    GameBoard.ply--;

    let move = GameBoard.history[GameBoard.hisPlay].move;
    let from = FROMSQ(move);
    let to = TOSQ(move);

    if(GameBoard.enPas !== SQUARES.NO_SQ){
        HASH_EP();
    }

    HASH_CA();

    GameBoard.castlePerm = GameBoard.history[GameBoard.hisPlay].castlePerm;
    GameBoard.fiftyMove = GameBoard.history[GameBoard.hisPlay].fiftyMove;
    GameBoard.enPas = GameBoard.history[GameBoard.hisPlay].enPas;

    if(GameBoard.enPas !== SQUARES.NO_SQ){
        HASH_EP();
    }

    HASH_CA();

    GameBoard.side ^=  1;
    HASH_SIDE();

    if ((move & MFLAGPS) !== 0){
        if(GameBoard.side === COLOURS.WHITE){
            AddPiece(to - 10, PIECES.bP);
        }
        else {
            AddPiece(to + 10, PIECES.wP);
        }
    }
    else if((MFLAGCA & move) !== 0){
        switch (to){
            case SQUARES.C1:
                MovePiece(SQUARES.D1, SQUARES.A1);
                break;
            case SQUARES.C8:
                MovePiece(SQUARES.D8, SQUARES.A8);
                break;
            case SQUARES.G1:
                MovePiece(SQUARES.F1, SQUARES.H1);
                break;
            case SQUARES.G8:
                MovePiece(SQUARES.F8, SQUARES.H8);
                break;
            default:
                break;
        }
    }

    MovePiece(to, from);

    let captured = CAPTURED(move);
    if(captured !== PIECES.EMPTY){
        AddPiece(to, captured);
    }

    if(PROMOTED(move) !== PIECES.EMPTY){
        ClearPiece(from);
        AddPiece(from, (PieceCol[PROMOTED(move)] === COLOURS.WHITE ? PIECES.wP : PIECES.bP));
    }
}

export function CheckBoard(){
    let t_pceNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let t_material = [0, 0];

    for(let t_piece = PIECES.wP; t_piece <= PIECES.bK; ++t_piece){
        for(let t_pce_num = 0; t_pce_num < GameBoard.pceNum[t_piece]; ++t_pce_num){
            let sq120 = GameBoard.pList[PCEINDEX(t_piece, t_pce_num)];
            if(GameBoard.pieces[sq120] !== t_piece){
                console.log('Error Pieces Lists');
                return BOOL.FALSE;
            }
        }
    }

    for(let sq64 = 0; sq64 < 64; ++sq64){
        let sq120 = SQ120(sq64);
        let t_piece = GameBoard.pieces[sq120];
        t_pceNum[t_piece]++;
        t_material[PieceCol[t_piece]] += PieceVal[t_piece];
    }

    for(let t_piece = PIECES.wP; t_piece <= PIECES.bK; ++t_piece){
        if(t_pceNum[t_piece] !== GameBoard.pceNum[t_piece]){
            console.log('Error on t_pceNum');
            return BOOL.FALSE;
        }
    }

    if(t_material[COLOURS.WHITE] !== GameBoard.material[COLOURS.WHITE] ||
        t_material[COLOURS.BLACK] !== GameBoard.material[COLOURS.BLACK]){
        console.log('Error t_material');
        return BOOL.FALSE;
    }

    if(GameBoard.side !== COLOURS.WHITE && GameBoard.side !== COLOURS.BLACK){
        console.log('Error Gameboard.side');
        return BOOL.FALSE;
    }

    if(GeneratePosKey() !== GameBoard.posKey){
        console.log('Error Gameboard.posKey');
        return BOOL.FALSE;
    }

    return BOOL.TRUE;
}

export let SearchController = {};

SearchController.nodes = 0;
SearchController.fh = 0;
SearchController.fhf = 0;
SearchController.depth = 0;
SearchController.time = 0;
SearchController.start = 0;
SearchController.stop = BOOL.FALSE;
SearchController.best = NOMOVE;
SearchController.thinking = BOOL.FALSE;

export function CheckUp(){
    if(($.now() - SearchController.start) > SearchController.time){
        SearchController.stop = BOOL.TRUE;
    }
}

export function IsRepetition(){
    for(let i = GameBoard.hisPlay - GameBoard.fiftyMove; i < GameBoard.hisPlay - 1; ++i){
        if(GameBoard.posKey === GameBoard.history[i].posKey){
            return BOOL.TRUE;
        }
    }

    return BOOL.FALSE;
}

export const PawnTable = [
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	,
    10	,	10	,	0	,	-10	,	-10	,	0	,	10	,	10	,
    5	,	0	,	0	,	5	,	5	,	0	,	0	,	5	,
    0	,	0	,	10	,	20	,	20	,	10	,	0	,	0	,
    5	,	5	,	5	,	10	,	10	,	5	,	5	,	5	,
    10	,	10	,	10	,	20	,	20	,	10	,	10	,	10	,
    20	,	20	,	20	,	30	,	30	,	20	,	20	,	20	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0
];

export const KnightTable = [
    0	,	-10	,	0	,	0	,	0	,	0	,	-10	,	0	,
    0	,	0	,	0	,	5	,	5	,	0	,	0	,	0	,
    0	,	0	,	10	,	10	,	10	,	10	,	0	,	0	,
    0	,	0	,	10	,	20	,	20	,	10	,	5	,	0	,
    5	,	10	,	15	,	20	,	20	,	15	,	10	,	5	,
    5	,	10	,	10	,	20	,	20	,	10	,	10	,	5	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0
];

export const BishopTable = [
    0	,	0	,	-10	,	0	,	0	,	-10	,	0	,	0	,
    0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
    0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
    0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0
];

export const RookTable = [
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    25	,	25	,	25	,	25	,	25	,	25	,	25	,	25	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0
];

export const BishopPair = 40;

export function EvalPosition(){
    let score = GameBoard.material[COLOURS.WHITE] - GameBoard.material[COLOURS.BLACK];

    let pce = PIECES.wP;

    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum){
        let sq = GameBoard.pList[PCEINDEX(pce, pceNum)];
        score += PawnTable[SQ64(sq)];
    }

    pce = PIECES.bP;
    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum){
        let sq = GameBoard.pList[PCEINDEX(pce, pceNum)];
        score -= PawnTable[MIRROR64(SQ64(sq))];
    }

    pce = PIECES.wN;
    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
        let sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
        score += KnightTable[SQ64(sq)];
    }

    pce = PIECES.bN;
    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
        let sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
        score -= KnightTable[MIRROR64(SQ64(sq))];
    }

    pce = PIECES.wB;
    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
        let sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
        score += BishopTable[SQ64(sq)];
    }

    pce = PIECES.bB;
    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
        let sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
        score -= BishopTable[MIRROR64(SQ64(sq))];
    }

    pce = PIECES.wR;
    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
        let sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
        score += RookTable[SQ64(sq)];
    }

    pce = PIECES.bR;
    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
        let sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
        score -= RookTable[MIRROR64(SQ64(sq))];
    }

    pce = PIECES.wQ;
    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
        let sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
        score += RookTable[SQ64(sq)];
    }

    pce = PIECES.bQ;
    for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum) {
        let sq = GameBoard.pList[PCEINDEX(pce,pceNum)];
        score -= RookTable[MIRROR64(SQ64(sq))];
    }

    if(GameBoard.pceNum[PIECES.wB] >= 2) {
        score += BishopPair;
    }

    if(GameBoard.pceNum[PIECES.bB] >= 2) {
        score -= BishopPair;
    }

    if(GameBoard.side === COLOURS.WHITE){
        return score;
    }
    else{
        return -score;
    }
}

/*
    MVV LVA
    P x Q
    N x Q..
    K X Q

    x R
    x B
    x N
    x P
*/

export const MvvLvaValue = [ 0, 100, 200, 300, 400, 500, 600, 100, 200, 300, 400, 500, 600 ];
export const MvvLvaScores = new Array(14 * 14);

export function InitMvvLva(){
    for(let Attacker = PIECES.wP; Attacker <= PIECES.bK; ++Attacker) {
        for(let Victim = PIECES.wP; Victim <= PIECES.bK; ++Victim) {
            MvvLvaScores[Victim * 14 + Attacker] = MvvLvaValue[Victim] + 6 - (MvvLvaValue[Attacker]/100);
        }
    }
}

export function MoveExists(move){
    GenerateMoves();

    let moveFound = NOMOVE;
    for(let i = GameBoard.moveListStart[GameBoard.ply]; i < GameBoard.moveListStart[GameBoard.ply + 1]; ++i) {

        moveFound = GameBoard.moveList[i];
        if(MakeMove(moveFound) === BOOL.FALSE) {
            continue;
        }
        TakeMove();
        if(move === moveFound) {
            return BOOL.TRUE;
        }
    }
    return BOOL.FALSE;
}

export function GetPvLine(depth){
    let move = ProbPvTable();
    let count = 0;

    while(move !== NOMOVE && count < depth){
        if(MoveExists(move) === BOOL.TRUE){
            MakeMove(move);
            GameBoard.PvArray[count] = move;
            count++;
        }
        else{
            break;
        }
        move = ProbPvTable();
    }

    while(GameBoard.ply > 0){
        TakeMove();
    }

    return count;
}

export function ProbPvTable(){
    let i = GameBoard.posKey % PVENTRIES;

    if(GameBoard.PvTable[i].posKey === GameBoard.posKey){
        return GameBoard.PvTable[i].move;
    }

    return NOMOVE;
}

export function StorePveMove(move){
    let i = GameBoard.posKey % PVENTRIES;
    GameBoard.PvTable[i].posKey = GameBoard.posKey;
    GameBoard.PvTable[i].move = move;
}

export function GenerateCaptures(){

    GameBoard.moveListStart[GameBoard.ply + 1] = GameBoard.moveListStart[GameBoard.ply];

    if (GameBoard.side === COLOURS.WHITE){
        let pceType = PIECES.wP;

        for(let pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum){
            let sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];

            if(SQOFFBOARD(sq + 9) === BOOL.FALSE && PieceCol[GameBoard.pieces[sq + 9]] === COLOURS.BLACK){
                AddWhitePawnCaptureMove(sq, sq + 9, GameBoard.pieces[sq + 9]);
            }

            if(SQOFFBOARD(sq + 11) === BOOL.FALSE && PieceCol[GameBoard.pieces[sq + 11]] === COLOURS.BLACK){
                AddWhitePawnCaptureMove(sq, sq + 11, GameBoard.pieces[sq + 11]);
            }

            if(GameBoard.enPas !== SQUARES.NO_SQ){
                if(sq + 9 === GameBoard.enPas){
                    AddEnPassantMove(MOVE(sq, sq + 9, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }

                if(sq + 11 === GameBoard.enPas){
                    AddEnPassantMove(MOVE(sq, sq + 11, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }
            }
        }
    }
    else{
        let pceType = PIECES.bP;
        for(let pceNum = 0; pceNum < GameBoard.pceNum[pceType]; ++pceNum){
            let sq = GameBoard.pList[PCEINDEX(pceType, pceNum)];

            if(SQOFFBOARD(sq - 9) === BOOL.FALSE && PieceCol[GameBoard.pieces[sq - 9]] === COLOURS.WHITE){
                AddBlackPawnCaptureMove(sq, sq - 9, GameBoard.pieces[sq - 9]);
            }

            if(SQOFFBOARD(sq - 11) === BOOL.FALSE && PieceCol[GameBoard.pieces[sq - 11]] === COLOURS.WHITE){
                AddBlackPawnCaptureMove(sq, sq - 11, GameBoard.pieces[sq - 11]);
            }

            if(GameBoard.enPas !== SQUARES.NO_SQ){
                if(sq - 9 === GameBoard.enPas){
                    AddEnPassantMove(MOVE(sq, sq - 9, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }

                if(sq - 11 === GameBoard.enPas){
                    AddEnPassantMove(MOVE(sq, sq - 11, PIECES.EMPTY, PIECES.EMPTY, MFLAGEP));
                }
            }
        }
    }

    let pceIndex = LoopNonSlideIndex[GameBoard.side];
    let pce = LoopNonSlidePce[pceIndex];

    while (pce !== 0){
        for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum){
            let sq = GameBoard.pList[PCEINDEX(pce, pceNum)];

            for(let i = 0; i < DirNum[pce]; ++i){
                let dir = PceDir[pce][i];
                let t_sq = sq + dir;

                if(SQOFFBOARD(t_sq) === BOOL.TRUE){
                    continue;
                }

                if(GameBoard.pieces[t_sq] !== PIECES.EMPTY){
                    if(PieceCol[GameBoard.pieces[t_sq]] !== GameBoard.side){
                        AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
                    }
                }
            }
        }
        pceIndex++;
        pce = LoopNonSlidePce[pceIndex];
    }

    pceIndex = LoopSlideIndex[GameBoard.side];
    pce = LoopSlidePce[pceIndex];

    while (pce !== 0){
        for(let pceNum = 0; pceNum < GameBoard.pceNum[pce]; ++pceNum){
            let sq = GameBoard.pList[PCEINDEX(pce, pceNum)];

            for(let i = 0; i < DirNum[pce]; ++i){
                let dir = PceDir[pce][i];
                let t_sq = sq + dir;

                while(SQOFFBOARD(t_sq) === BOOL.FALSE){
                    if(GameBoard.pieces[t_sq] !== PIECES.EMPTY){
                        if(PieceCol[GameBoard.pieces[t_sq]] !== GameBoard.side){
                            AddCaptureMove(MOVE(sq, t_sq, GameBoard.pieces[t_sq], PIECES.EMPTY, 0));
                        }
                        break;
                    }
                    t_sq += dir;
                }
            }
        }
        pceIndex++;
        pce = LoopSlidePce[pceIndex];
    }
}



export function Quiescence(alpha, beta){
    if((SearchController.nodes & 2047) === 0){
        CheckUp();
    }

    SearchController.nodes++;

    if((IsRepetition() || GameBoard.fiftyMove >= 100) && GameBoard.ply !== 0){
        return  0;
    }

    if(GameBoard.ply > MAXDEPTH - 1){
        return EvalPosition();
    }

    let Score = EvalPosition(0);

    if (Score >= beta){
        return beta;
    }

    if(Score > alpha){
        alpha = Score;
    }

    GenerateCaptures();

    let MoveNum = 0;
    let Legal = 0;
    let OldAlpha = alpha;
    let BestMove = NOMOVE;
    let Move = NOMOVE;

    for(MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum){

        PickNextMove(MoveNum);

        Move = GameBoard.moveList[MoveNum];
        if(MakeMove(Move) === BOOL.FALSE){
            continue;
        }
        Legal++;
        Score = -Quiescence(-beta, -alpha,);

        TakeMove();

        if(SearchController.stop === BOOL.TRUE){
            return 0;
        }

        if(Score > alpha){
            if(Score >= beta){
                if(Legal === 1){
                    SearchController.fhf++;
                }
                SearchController.fh++;
                return beta;
            }

            alpha = Score;
            BestMove = Move;
        }
    }

    if(alpha !== OldAlpha){
        StorePveMove(BestMove);
    }

    return alpha;
}

export function AlphaBeta(alpha, beta, depth){

    if(depth <= 0){
        return Quiescence(alpha, beta);
    }

    if((SearchController.nodes & 2047) === 0){
        CheckUp();
    }

    SearchController.nodes++;

    if((IsRepetition() || GameBoard.fiftyMove >= 100) && GameBoard.ply !== 0){
        return  0;
    }

    if(GameBoard.ply > MAXDEPTH - 1){
        return EvalPosition();
    }

    let InCheck = SqAttacked(GameBoard.pList[PCEINDEX(Kings[GameBoard.side], 0)], GameBoard.side^1);
    if (InCheck === BOOL.TRUE){
        depth++;
    }

    let Score = -INFINITE;

    GenerateMoves();

    let MoveNum = 0;
    let Legal = 0;
    let OldAlpha = alpha;
    let BestMove = NOMOVE;
    let Move = NOMOVE;

    let PvMove = ProbPvTable();
    if(PvMove !== NOMOVE){
        for(MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum){
            if(GameBoard.moveList[MoveNum] === PvMove){
                GameBoard.moveScores[MoveNum] = 2000000;
                break;
            }
        }
    }

    for(MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum){

        PickNextMove(MoveNum);

        Move = GameBoard.moveList[MoveNum];
        if(MakeMove(Move) === BOOL.FALSE){
            continue;
        }
        Legal++;
        Score = -AlphaBeta(-beta, -alpha, depth - 1);

        TakeMove();

        if(SearchController.stop === BOOL.TRUE){
            return 0;
        }

        if(Score > alpha){
            if(Score >= beta){
                if(Legal === 1){
                    SearchController.fhf++;
                }
                SearchController.fh++;
                if((Move & MFLAGCAP === 0)){
                    GameBoard.searchKillers[MAXDEPTH + GameBoard.ply] = GameBoard.searchKillers[GameBoard.ply];
                    GameBoard.searchKillers[GameBoard.ply] = Move;
                }
                return beta;
            }

            if((Move & MFLAGCAP) === 0){
                GameBoard.searchHistory[GameBoard.pieces[FROMSQ(Move)] * BRD_SQ_NUM + TOSQ(Move)] += depth * depth;
            }

            alpha = Score;
            BestMove = Move;
        }
    }

    if(Legal === 0){
        if(InCheck === BOOL.TRUE){
            return -MATE + GameBoard.ply;
        }
        else{
            return 0;
        }
    }

    if(alpha !== OldAlpha){
        StorePveMove(BestMove);
    }

    return alpha;
}

export function PickNextMove(MoveNum){
    let bestScore = -1;
    let bestNum = MoveNum;

    for(let i = MoveNum; i < GameBoard.moveListStart[GameBoard.ply = 1]; ++i){
        if(GameBoard.moveScores[i] > bestScore){
            bestScore = GameBoard.moveScores[i];
            bestNum = i;
        }
    }

    if(bestNum !== MoveNum){
        let temp = 0;
        temp = GameBoard.moveScores[MoveNum];
        GameBoard.moveScores[MoveNum] = GameBoard.moveScores[bestNum];
        GameBoard.moveScores[bestNum] = temp;

        GameBoard.moveList[MoveNum] = GameBoard.moveList[bestNum];
        GameBoard.moveList[bestNum] = temp;
    }
}

export function ClearPvTable(){
    for(let i = 0; i < PVENTRIES; ++i){
        GameBoard.PvTable[i].move = NOMOVE;
        GameBoard.PvTable[i].posKey = 0;
    }
}

export function ClearForSearch(){

    for(let i = 0; i < 14 * BRD_SQ_NUM; ++i){

        GameBoard.searchHistory[i] = 0;
    }

    for(let i = 0; i < 3 * MAXDEPTH; ++i){

        GameBoard.searchKillers[i] = 0;
    }

    ClearPvTable();
    GameBoard.ply = 0;
    SearchController.nodes = 0;
    SearchController.fh = 0;
    SearchController.fhf = 0;
    SearchController.start = $.now();
    SearchController.stop = BOOL.FALSE;
}

export function SearchPosition(){

    let bestMove = NOMOVE;
    let bestScore = -INFINITE;
    let currentDepth = 0;
    let line;
    let PvNum;

    ClearForSearch();

    for(currentDepth = 1; currentDepth <= SearchController.depth; ++currentDepth){

        bestScore = AlphaBeta(-INFINITE, INFINITE, currentDepth);

        if(SearchController.stop === BOOL.TRUE){
            break;
        }

        bestMove = ProbPvTable();
        line = 'D: ' + currentDepth + ' Best: ' + PrMove(bestMove) + ' Score: ' + bestScore + ' nodes: ' + SearchController.nodes;
        PvNum = GetPvLine(currentDepth);
        line += ' Pv:';
        for(let c = 0; c < PvNum; ++c){
            line += ' ' + PrMove(GameBoard.PvArray[c]);
        }
        if(currentDepth !== 1){
            line += ('Ordering: ' + ((SearchController.fhf / SearchController.fh) * 100).toFixed(2) + '%');
        }
        console.log(line);
    }

    SearchController.best = bestMove;
    SearchController.thinking = BOOL.FALSE;
}

export function UpdateDOMStats(dom_score, dom_depth) {

    let scoreText = "Score: " + (dom_score / 100).toFixed(2);
    if(Math.abs(dom_score) > MATE - MAXDEPTH) {
        scoreText = "Score: Mate In " + (MATE - Math.abs(dom_score)) + " moves";
    }

    $("#OrderingOut").text("Ordering: " + ((SearchController.fhf/SearchController.fh)*100).toFixed(2) + "%");
    $("#DepthOut").text("Depth: " + dom_depth);
    $("#ScoreOut").text(scoreText);
    $("#NodesOut").text("Nodes: " + SearchController.nodes);
    $("#TimeOut").text("Time: " + (($.now()-SearchController.start)/1000).toFixed(1) + "s");
    $("#BestOut").text("BestMove: " + PrMove(SearchController.best));
}

