import "../css/style-chess.scss";
import $ from "jquery";

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

localStorage.setItem("chess",JSON.stringify(piecesPosition));


count.innerHTML = "The game will start in";
document.body.appendChild(count);
let seconds = 5;
let countDown = setInterval(function(){
    if(seconds > 0){
        count.innerHTML = seconds;
        seconds--;
    }
    else{
        clearInterval(countDown);
        count.innerHTML = " ";
        let divButton = document.createElement("div");
        divButton.classList.add("divButton");
        let button = document.createElement("button");
        button.innerHTML = "Start new game";
        button.addEventListener("click", startNewGame);
        divButton.appendChild(button);
        document.body.appendChild(divButton);
    }
},1000);

let dragItem = null;

function dragEnd(){
    setTimeout(function (){
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

function dragNdrop(div){
    div.draggable = true;
    div.addEventListener("dragstart", function (){
        dragItem = div;
        setTimeout(function (){
            div.style.display = "none";
        });
    });
    div.addEventListener("dragend", dragEnd);
    div.addEventListener("dragover", dragOver);
    div.addEventListener("dragenter",dragEnter);
    div.addEventListener("drop",handleDrop);
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
                let newDiv = document.createElement("div");
                newDiv.classList.add("piece");
                dragNdrop(newDiv);
                cell.appendChild(newDiv);
                table.appendChild(cell);
                color = false;

            } else {
                cell.classList.add("black");
                let newDiv = document.createElement("div");
                newDiv.classList.add("piece");
                dragNdrop(newDiv);
                cell.appendChild(newDiv);
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
        if (position[piece].includes("B")) {
            newDiv.classList.add("piece");
            newDiv.classList.add(p.substring(0, p.indexOf('B')) + "B");
            dragNdrop(newDiv);
            pieceId.appendChild(newDiv);
        } else {
            if (position[piece].includes("W")) {
                newDiv.classList.add("piece");
                newDiv.classList.add(p.substring(0, p.indexOf('W')) + "W");
                dragNdrop(newDiv);
                pieceId.appendChild(newDiv);
            }
        }
    }
}



function startNewGame() {
        localStorage.clear();
        let table;
        $( ".main" ).remove();
        board(table);
        startGame(piecesPosition);
        movePieces();
}


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

