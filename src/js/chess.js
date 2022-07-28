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
let lastCheck = undefined;

function createChessTable() {
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

function moveChessPiece(){

}
function clickPieceBox() {
    if( !lastCheck ){ lastCheck = this;};

    // if lastCheck = piece our color   and (thisbox == empty or thisbox other color piece) and (nu e sah sau nu va cauza) {muta piesa}
    if (lastCheck.id == this.id) {
        this.firstChild.classList.toggle("grab");
        console.log(lastCheck.id, "->", this.id);
    } else {
        console.log(lastCheck.id, "change piece:", this.id);
        lastCheck.firstChild.classList.remove("grab");
        this.firstChild.classList.add("grab");
        lastCheck = this;
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
        pieceBox.addEventListener("click", clickPieceBox.bind(pieceBox));
    }
}


function main() {
    document.body.appendChild(createChessTable());// Create chess table
    reproduceTheChessTable(INITIAL_STATE); //New game
    startEvent()
}

main()