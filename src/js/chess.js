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

let position = [['a8','b8','c8','d8','e8','f8','g8','h8'],
                ['a7','b7','c7','d7','e7','f7','g7','h7'],
                ['a6','b6','c6','d6','e6','f6','g6','h6'],
                ['a5','b5','c5','d5','e5','f5','g5','h5'],
                ['a4','b4','c4','d4','e4','f4','g4','h4'],
                ['a3','b3','c3','d3','e3','f3','g3','h1'],
                ['a2','b2','c2','d2','e2','f2','g2','h2'],
                ['a1','b1','c1','d1','e1','f1','g1','h3']];

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

function startGame() {
    for (let piece in piecesPosition) {
        let p = piecesPosition[piece];
        let pieceId = document.getElementById(piece);
        if (piecesPosition[piece].includes("B")) {
            pieceId.classList.add(p.substring(0, p.indexOf('B')) + "-black");
            pieceId.classList.add("piece");
        } else {
            if (piecesPosition[piece].includes("W")) {
                pieceId.classList.add(p.substring(0, p.indexOf('W')) + "-white");
                pieceId.classList.add("piece");
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


    // let onClick = document.getElementsByClassName('selector');
    // onClick.addEventListener("click", function (){
    //     alert("da");
    // })
}