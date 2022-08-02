import "../css/style-chess.scss";
import $ from "jquery";


let count = document.createElement("div");
count.classList.add("count");
const piecesPosition = { "a8": "rookB", "b8": "knightB", "c8": "bishopB", "d8": "queenB", "e8": "kingB", "f8": "bishopB", "g8": "knightB", "h8": "rookB",
                       "a7": "pawnB", "b7": "pawnB", "c7": "pawnB", "d7": "pawnB", "e7": "pawnB", "f7": "pawnB", "g7": "pawnB", "h7": "pawnB",
                       "a6": "none", "b6": "none", "c6": "none", "d6": "none", "e6": "none", "f6": "none", "g6": "none", "h6": "none",
                       "a5": "none", "b5": "none", "c5": "none", "d5": "none", "e5": "none", "f5": "none", "g5": "none", "h5": "none",
                       "a4": "none", "b4": "none", "c4": "none", "d4": "none", "e4": "none", "f4": "none", "g4": "none", "h4": "none",
                       "a3": "none", "b3": "none", "c3": "none", "d3": "none", "e3": "none", "f3": "none", "g3": "none", "h3": "none",
                       "a2": "pawnW", "b2": "pawnW", "c2": "pawnW", "d2": "pawnW", "e2": "pawnW", "f2": "pawnW","g2": "pawnW", "h2": "pawnW",
                       "a1": "rookW", "b1": "knightW", "c1": "bishopW", "d1": "queenW", "e1": "kingW", "f1": "bishopW", "g1": "knightW", "h1": "rookW"
}

localStorage.setItem("chess",JSON.stringify(piecesPosition));

//
// count.innerHTML = "The game will start in";
// document.body.appendChild(count);
// let seconds = 5;
// let countDown = setInterval(function(){
//     if(seconds > 0){
//         count.innerHTML = seconds;
//         seconds--;
//     }
//     else{
//         clearInterval(countDown);
//         count.innerHTML = " ";
//         let divButton = document.createElement("div");
//         divButton.classList.add("divButton");
//         let button = document.createElement("button");
//         button.innerHTML = "Start new game";
//         button.addEventListener("click", startNewGame);
//         divButton.appendChild(button);
//         document.body.appendChild(divButton);
//     }
// },1000);

let divButton = document.createElement("div");
divButton.classList.add("divButton");
let button = document.createElement("button");
button.innerHTML = "Start new game";
button.addEventListener("click", startNewGame);
divButton.appendChild(button);
document.body.appendChild(divButton);
let dragItem = null;

function dragEnd(e){
    e.preventDefault();
    console.trace();
    setTimeout(function (){
        console.log(dragItem);
        dragItem.style.display = "block";
        dragItem.style.position = "absolute";
        dragItem = null;
    });
}

function handleDrop() {
    this.append(dragItem);
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragNdrop(){
    $(document).on("dragstart",".piece", function (event){
        console.trace(event);
        dragItem = event.target;
        setTimeout(function (){
            event.target.style.display = "none";
        });
    });
    $(document).on("dragend",".piece",dragEnd);
    $(document).on("dragover",".cell",dragOver);
    $(document).on("drop",".cell",handleDrop);
    $(document).on("dragenter",".cell",dragEnter);
}

function board(table) {
    table = document.createElement("div");
    table.classList.add("main");
    document.body.appendChild(table);
    let l;
    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let color = true;
    let j;
    for (j = 8; j >= 1; j--) {
        for (l = 0; l < letter.length; l++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = letter[l] + j;
            if (color) {
                cell.classList.add("white");
                table.appendChild(cell);
                color = false;

            } else {
                cell.classList.add("black");
                table.appendChild(cell);
                color = true;
            }

        }
        color = !color;
    }

}

function startGame(position) {
    for (let piece in position) {
        let p = position[piece];
        let pieceId = document.getElementById(piece);
        let newDiv = document.createElement("div");
        newDiv.draggable = true;
        if (position[piece].includes("B")) {
            newDiv.classList.add("piece");
            newDiv.classList.add(p.substring(0, p.indexOf('B')) + "B");
            pieceId.appendChild(newDiv);
        } else {
            if (position[piece].includes("W")) {
                newDiv.classList.add("piece");
                newDiv.classList.add(p.substring(0, p.indexOf('W')) + "W");
                pieceId.appendChild(newDiv);
            }
        }
    }
    dragNdrop()
}

function startNewGame() {
        localStorage.clear();
        let table;
        $( ".main" ).remove();
        board(table);
        startGame(piecesPosition);
        highlightMoves();
}

let position = JSON.parse(localStorage.getItem("chess"));

let from;
let colorTurn = "black";


function highlightMoves() {
    $("div[class*='cell']").on("mouseover", function () {
        $(this).addClass("selector");
    });
    $("div[class*='cell']").on("mouseout", function () {
        $(this).removeClass("selector");
    });
    $("div[class*='cell']").on("click", function () {
        $(this).removeClass("selector");
        $(".highlight").toggleClass("highlight");
        from = this.id;
        console.log(position[this.id]);
        if (position[from] === "pawnB") {
            console.log(from);
            for (let i = from[1] - 1; i > from[1] - 3; i--) {
                console.log(i);
                $(`#${from[0]}${i}`).toggleClass("highlight");
            }
        } else {
            if (position[from] === "pawnW") {
                for (let i = +from[1] + 1; i < +from[1] + 3; i++) {
                    console.log(i);
                    $(`#${from[0]}${i}`).toggleClass("highlight");
                }
            }
        }

    });
}


