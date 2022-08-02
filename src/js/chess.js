import "../css/styles.scss";

const INITIAL_STATE = {
    a8: "br", b8: "bn", c8: "bb", d8: "bq", e8: "bk", f8: "bb", g8: "bn", h8: "br",
    a7: "bp", b7: "bp", c7: "bp", d7: "bp", e7: "bp", f7: "bp", g7: "bp", h7: "bp",
    a6: "ep", b6: "ep", c6: "ep", d6: "ep", e6: "ep", f6: "ep", g6: "ep", h6: "ep",
    a5: "ep", b5: "ep", c5: "ep", d5: "ep", e5: "ep", f5: "ep", g5: "ep", h5: "ep",
    a4: "ep", b4: "ep", c4: "ep", d4: "ep", e4: "ep", f4: "ep", g4: "ep", h4: "ep",
    a3: "ep", b3: "ep", c3: "ep", d3: "ep", e3: "ep", f3: "ep", g3: "ep", h3: "ep",
    a2: "wp", b2: "wp", c2: "wp", d2: "wp", e2: "wp", f2: "wp", g2: "wp", h2: "wp",
    a1: "wr", b1: "wn", c1: "wb", d1: "wq", e1: "wk", f1: "wb", g1: "wn", h1: "wr"
}
const pieceMoves = {
    "p": (element)=>{
        let alowMove = [];
        let x = element.id[0];
        let y = +element.id[1];
        let color = MAP_STATE[element.id][0];
        // for white pawn
        if (color == 'w'){
            if (MAP_STATE[x + (y+1)] == 'ep'){
                alowMove.push(x + (y+1));
                if ((y == 2) && (MAP_STATE[x+4] == 'ep')){
                    alowMove.push(x + '4');
                }
            }
            // attack white pawn
            if (incLet(x, +1) != 'i'){
                if (MAP_STATE[incLet(x, +1) + (y+1)][0] == 'b'){alowMove.push(incLet(x, +1) + (y+1));}
            }
            if (incLet(x, -1) != '`') {
                if (MAP_STATE[incLet(x, -1) + (y + 1)][0] == 'b'){alowMove.push(incLet(x, -1) + (y + 1));}
            }
        }
        // for black pawn
        else {
            if (MAP_STATE[x + (y-1)] == 'ep'){
                alowMove.push(x + (y-1));
                if ((y == 7) && (MAP_STATE[x+5] == 'ep')){
                    alowMove.push(x + '5');
                }
            }
            // attack black pawn
            if (incLet(x, +1) != 'i') {
                if (MAP_STATE[incLet(x, +1) + (y - 1)][0] == 'w') {
                    alowMove.push(incLet(x, +1) + (y - 1));
                }
            }
            if (incLet(x, -1) != '`') {
                if (MAP_STATE[incLet(x, -1) + (y - 1)][0] == 'w') {
                    alowMove.push(incLet(x, -1) + (y - 1));
                }
            }
        }
        console.log(alowMove);
    },
    "r": (element)=> {
        let alowMove = [];
        let x = element.id[0];
        let y = +element.id[1];
        let color = MAP_STATE[element.id][0];
        let notColor;
        (color == 'w') ? notColor = 'b' : notColor = 'w';
        alowMove = alowMove.concat(moveVector(x, y, 1, 0, notColor));
        alowMove = alowMove.concat(moveVector(x, y, -1, 0, notColor));
        alowMove = alowMove.concat(moveVector(x, y, 0, 1, notColor));
        alowMove = alowMove.concat(moveVector(x, y, 0, -1, notColor));
        console.log(alowMove);
    },
    "b": (element)=> {
        let alowMove = [];
        let x = element.id[0];
        let y = +element.id[1];
        let color = MAP_STATE[element.id][0];
        let notColor;
        (color == 'w') ? notColor = 'b' : notColor = 'w';
        alowMove = alowMove.concat(moveVector(x, y, 1, 1, notColor));
        alowMove = alowMove.concat(moveVector(x, y, -1, 1, notColor));
        alowMove = alowMove.concat(moveVector(x, y, 1, -1, notColor));
        alowMove = alowMove.concat(moveVector(x, y, -1, -1, notColor));
        console.log(alowMove);
    },
    "q": (element)=> {
        let alowMove = [];
        let x = element.id[0];
        let y = +element.id[1];
        let color = MAP_STATE[element.id][0];
        let notColor;
        (color == 'w') ? notColor = 'b' : notColor = 'w';
        alowMove = alowMove.concat(moveVector(x, y, 1, 1, notColor));
        alowMove = alowMove.concat(moveVector(x, y, -1, 1, notColor));
        alowMove = alowMove.concat(moveVector(x, y, 1, -1, notColor));
        alowMove = alowMove.concat(moveVector(x, y, -1, -1, notColor));
        alowMove = alowMove.concat(moveVector(x, y, 1, 0, notColor));
        alowMove = alowMove.concat(moveVector(x, y, -1, 0, notColor));
        alowMove = alowMove.concat(moveVector(x, y, 0, 1, notColor));
        alowMove = alowMove.concat(moveVector(x, y, 0, -1, notColor));
        console.log(alowMove);
    },
    "n": (element)=> {
        let alowMove = [];
        let x = element.id[0];
        let y = +element.id[1];
        let color = MAP_STATE[element.id][0];
        alowMove.push(moveKnight(x, y, 1, 2, color));
        alowMove.push(moveKnight(x, y, 1, -2, color));
        alowMove.push(moveKnight(x, y, -1, 2, color));
        alowMove.push(moveKnight(x, y, -1, -2, color));
        alowMove.push(moveKnight(x, y, 2, 1, color));
        alowMove.push(moveKnight(x, y, 2, -1, color));
        alowMove.push(moveKnight(x, y, -2, 2, color));
        alowMove.push(moveKnight(x, y, -2, -2, color));
        console.log(alowMove);
    },
    "k": (element)=> {
        let alowMove = [];
        let x = element.id[0];
        let y = +element.id[1];
        let color = MAP_STATE[element.id][0];
        let notColor;
        (color == 'w') ? notColor = 'b' : notColor = 'w';
    }
}
let lastPieceCheck = undefined;
let statusCheked = false;
let moveTurn = "w";
let MAP_STATE;

function incLet(c, inc){
    return String.fromCharCode(c.charCodeAt() + inc);
}
function moveVector(i, j, a, b, notColor){
    let result = [];
    while (true) {
        if ((i > 'a') && (i < 'h')){
            i = incLet(i, a);
        }
        else{
            break;
        }
        if ((j > 1) && (j < 8)){
            j += b;
        }
        else{
            break;
        }
        if (MAP_STATE[i + j] == 'ep') {
            result.push(i + j);
        } else {
            if (MAP_STATE[i + j][0] == notColor) {
                result.push(i + j);
            }
            break;
        }
    }
    return result;
}
function moveKnight(i, j, a, b, color){
    if (('abcdefg'.includes(incLet(i, a))) && ('12345678'.includes(j+b)) && (MAP_STATE[incLet(i, a) + (j+b)][0] != color)){
        return incLet(i, a) + (j+b);
    }

}
function createChessTable() {
    MAP_STATE = {...INITIAL_STATE};
    let chessTableDiv = document.createElement("div");
    chessTableDiv.classList.add("chess-table");
    let colorBox = true;
    for (let row = 8; row >= 1; row--) {
        for (let colomn of "abcdefgh") {
            let chessBox = document.createElement("div");
            chessBox.id = `${colomn}${row}`;
            chessBox.classList.add("piece-box");
            colorBox ? chessBox.classList.add("white-box") : chessBox.classList.add("black-box");
            chessTableDiv.appendChild(chessBox);
            colorBox = !colorBox;
        }
        colorBox = !colorBox;
    }
    return chessTableDiv;
}
function move(toPieceBox){
    if (toPieceBox.childNodes.length){
        toPieceBox.firstChild.remove()
    }

    MAP_STATE[toPieceBox.id] = lastPieceCheck.firstChild.classList[0];
    MAP_STATE[lastPieceCheck.id] = 'ep';

    toPieceBox.appendChild(lastPieceCheck.firstChild);
    toPieceBox.firstChild.classList.remove("grab");

    lastPieceCheck = undefined;
    statusCheked = false;
    (moveTurn == 'w')? moveTurn = 'b': moveTurn = 'w';
}

function moveChessPiece(Piece){
    move(Piece);
}
function clickPieceBox() {
    // if has a piece
    if (this.childNodes.length){
        if (this.firstChild.classList[0][0] == moveTurn) {
            if (!lastPieceCheck) {
                lastPieceCheck = this;
            }
            console.log('curent piece:', this.firstChild.classList[0]);
            statusCheked = this.firstChild.classList.toggle("grab");
            if (statusCheked) {
                // posible pice move
                if (lastPieceCheck.id != this.id) {
                    console.log(lastPieceCheck.id, "change piece:", this.id);
                    lastPieceCheck.firstChild.classList.remove("grab");
                    this.firstChild.classList.add("grab");
                    lastPieceCheck = this;
                    pieceMoves[this.firstChild.classList[0][1]](this);

                } else {
                    console.log('select', this.id);
                    pieceMoves[this.firstChild.classList[0][1]](this);
                }
            } else {
                console.log('unselect', this.id);
                lastPieceCheck = undefined;
            }
        }
        else {
            if (statusCheked) {
                console.log(lastPieceCheck.firstChild.classList[0],'move',lastPieceCheck.id ,'->', this.id);
                moveChessPiece(this);
            }
            else{
                console.log('unmove');
            }
        }
    }
    else {
        if (statusCheked) {
            console.log(lastPieceCheck.firstChild.classList[0],'move',lastPieceCheck.id ,'->', this.id);
            moveChessPiece(this);
        }
        else{
            console.log('unmove');
        }

    }
}
function DragStart() {
    this.style.opacity = '0.4';
}
function DragEnd() {
    this.style.opacity = '1';
}
function reproduceTheChessTable(state1) {
    for (let cell in state1) {
        if (state1[cell] != "ep") {
            let element = document.getElementById(cell);
            let chessPiece = document.createElement("div");
            chessPiece.classList.add(state1[cell]);
            chessPiece.classList.add("chessPiece");
            chessPiece.addEventListener('dragstart', DragStart);
            chessPiece.addEventListener('dragend', DragEnd);
            chessPiece.setAttribute("draggable", true);
            element.appendChild(chessPiece);
        }
    }
}
function startEvent(){
    let pieceBoxs = document.getElementsByClassName("piece-box");
    for (let pieceBox of pieceBoxs){
        pieceBox.addEventListener("mousedown", clickPieceBox.bind(pieceBox));
    }

}
function main() {
    document.body.appendChild(createChessTable());// Create chess table
    reproduceTheChessTable(INITIAL_STATE); //New game
    startEvent()
}
main()