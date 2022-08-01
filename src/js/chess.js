import "../css/style-chess.scss";
import $ from "jquery";

let table;
let count = document.createElement("div");
count.classList.add("count");
let piecesPosition = { "a8": "rookB", "b8": "knightB", "c8": "bishopB", "d8": "queenB", "e8": "kingB", "f8": "bishopB", "g8": "knightB", "h8": "rookB",
                       "a7": "pawnB", "b7": "pawnB", "c7": "pawnB", "d7": "pawnB", "e7": "pawnB", "f7": "pawnB", "g7": "pawnB", "h7": "pawnB",
                       "a6": "none", "b6": "none", "c6": "none", "d6": "none", "e6": "none", "f6": "none", "g6": "none", "h6": "none",
                       "a5": "none", "b5": "none", "c5": "none", "d5": "none", "e5": "none", "f5": "none", "g5": "none", "h5": "none",
                       "a4": "none", "b4": "none", "c4": "none", "d4": "none", "e4": "none", "f4": "none", "g4": "none", "h4": "none",
                       "a3": "none", "b3": "none", "c3": "none", "d3": "none", "e3": "none", "f3": "none", "g3": "none", "h3": "none",
                       "a2": "pawnW", "b2": "pawnW", "c2": "pawnW", "d2": "pawnW", "e2": "pawnW", "f2": "pawnW","g2": "pawnW", "h2": "pawnW",
                       "a1": "rookW", "b1": "knightW", "c1": "bishopW", "d1": "queenW", "e1": "kingW", "f1": "bishopW", "g1": "knightW", "h1": "rookW"
}

const position = [['rookB','knightB','bishopB','queenB','kingB','bishopB','knightB','rookB'],
                ['pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB','pawnB'],
                ['none','none','none','none','none','none','none','none'],
                ['none','none','none','none','none','none','none','none'],
                ['none','none','none','none','none','none','none','none'],
                ['none','none','none','none','none','none','none','none'],
                ['pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW','pawnW'],
                ['rookW','knightW','bishopW','queenW','kingW','bishopW','knightW','rookW']];

function board() {
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
    // setTimeout(() => {
    //     startGame();
    // }, 2000);

}

function dragStart(e){
    this.style.opacity("0.2");
    e.currentTarget.classList.add("dragging");
}

function dragEnd(e){
    this.style.opacity("1.0");
    e.currentTarget.classList.add("dragging");
}

function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.
    return false;
}

function drag(e){
    e.dataTransfer.setData('text/html',e.currentTarget.outerHTML);
    e.dataTransfer.setData('text/plain',e.currentTarget.dataset.id);
}

function dragEnter(e){
    e.currentTarget.classList.add('drop');
}

function dragLeave(e){
    e.currentTarget.classList.remove('drop');
}

function startGame() {
    for (let piece in piecesPosition) {
        let p = piecesPosition[piece];
        let pieceId = document.getElementById(piece);
        let newDiv = document.createElement("div");
        if (piecesPosition[piece].includes("B")) {
            newDiv.classList.add("piece");
            newDiv.classList.add(p.substring(0, p.indexOf('B')) + "B");
            newDiv.addEventListener("dragstart", dragStart);
            newDiv.addEventListener("dragend", dragEnd);
            newDiv.addEventListener("dragenter", dragEnter);
            newDiv.addEventListener("dragleave",dragLeave);
            newDiv.addEventListener("drop",handleDrop);
            newDiv.draggable = true;
            pieceId.appendChild(newDiv);
        } else {
            if (piecesPosition[piece].includes("W")) {
                newDiv.classList.add("piece");
                newDiv.classList.add(p.substring(0, p.indexOf('W')) + "W");
                newDiv.addEventListener("dragstart", dragStart);
                newDiv.addEventListener("dragend", dragEnd);
                newDiv.addEventListener("dragenter", dragEnter);
                newDiv.addEventListener("dragleave",dragLeave);
                newDiv.addEventListener("drop",handleDrop);
                newDiv.draggable = true;
                pieceId.appendChild(newDiv);
            }
        }
    }
}
function addButton() {
    let divButton = document.createElement("div");
    divButton.classList.add("divButton");
    let button = document.createElement("button");
    button.innerHTML = "Start new game";
    divButton.appendChild(button);
    document.body.appendChild(divButton);
    button.addEventListener("click", function () {
        board();
        startGame();
        movePieces();
    });
}

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
//         addButton();
//     }
// },1000);

addButton();

function movePieces() {

    let cellSelected = document.getElementsByClassName("piece");
    for (let i = 0; i < cellSelected.length; i++) {
        // let cellSelected = document.querySelectorAll(".piece")[i];

        cellSelected[i].addEventListener("mouseover",function (){
            cellSelected[i].classList.add("selector");
        });
        cellSelected[i].addEventListener("mouseout",function (){
            cellSelected[i].classList.remove("selector");
        });


        cellSelected[i].addEventListener("click", () => {
            let check = document.querySelector(".selector");
            if (check !== undefined) {
                let idSelected = cellSelected[i].id;
                for (let piece in piecesPosition) {
                    if(idSelected === piece){
                        if(piece === "a7"){
                            $(".highlight").toggleClass("highlight");
                            $(document.getElementById("a5")).toggleClass("highlight");
                            $(document.getElementById("a6")).toggleClass("highlight");

                        }
                        else{
                            if(piece === "b7"){
                                $(".highlight").toggleClass("highlight");
                                $(document.getElementById("b5")).toggleClass("highlight");
                                $(document.getElementById("b6")).toggleClass("highlight");
                            }
                            else{
                                if(piece === "b8"){
                                    $(".highlight").toggleClass("highlight");
                                    $(document.getElementById("a6")).toggleClass("highlight");
                                    $(document.getElementById("c6")).toggleClass("highlight");
                                }
                                else{
                                    if(piece === "a2"){
                                        $(".highlight").toggleClass("highlight");
                                        $(document.getElementById("a3")).toggleClass("highlight");
                                        $(document.getElementById("a4")).toggleClass("highlight");
                                    } else {
                                        if (piece === "b2") {
                                            $(".highlight").toggleClass("highlight");
                                            $(document.getElementById("b3")).toggleClass("highlight");
                                            $(document.getElementById("b4")).toggleClass("highlight");
                                        }
                                        else{
                                            if(piece === "b1"){
                                                $(".highlight").toggleClass("highlight");
                                                $(document.getElementById("a3")).toggleClass("highlight");
                                                $(document.getElementById("c3")).toggleClass("highlight");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
        })
    }
}

