import "../css/style-chess.scss";
import $ from "jquery";

let count = document.createElement("div"),
    highlightedPiece;
count.classList.add("count");
let piecesPosition = {
    "a8": "rookB",
    "b8": "knightB",
    "c8": "bishopB",
    "d8": "queenB",
    "e8": "kingB",
    "f8": "bishopB",
    "g8": "knightB",
    "h8": "rookB",
    "a7": "pawnB",
    "b7": "pawnB",
    "c7": "pawnB",
    "d7": "pawnB",
    "e7": "pawnB",
    "f7": "pawnB",
    "g7": "pawnB",
    "h7": "pawnB",
    "a6": "none",
    "b6": "none",
    "c6": "none",
    "d6": "none",
    "e6": "none",
    "f6": "none",
    "g6": "none",
    "h6": "none",
    "a5": "none",
    "b5": "none",
    "c5": "none",
    "d5": "none",
    "e5": "none",
    "f5": "none",
    "g5": "none",
    "h5": "none",
    "a4": "none",
    "b4": "none",
    "c4": "none",
    "d4": "none",
    "e4": "none",
    "f4": "none",
    "g4": "none",
    "h4": "none",
    "a3": "none",
    "b3": "none",
    "c3": "none",
    "d3": "none",
    "e3": "none",
    "f3": "none",
    "g3": "none",
    "h3": "none",
    "a2": "pawnW",
    "b2": "pawnW",
    "c2": "pawnW",
    "d2": "pawnW",
    "e2": "pawnW",
    "f2": "pawnW",
    "g2": "pawnW",
    "h2": "pawnW",
    "a1": "rookW",
    "b1": "knightW",
    "c1": "bishopW",
    "d1": "queenW",
    "e1": "kingW",
    "f1": "bishopW",
    "g1": "knightW",
    "h1": "rookW"
}

let position = JSON.parse(localStorage.getItem("chess"));  
let from;
let colorTurn = "black";
let fromCell;
let toCell;
let dragItem = null;

//======================================================== Drag & Drop Functions ==========================================================//

function dragEnd(e) {
    e.preventDefault();
    highlightMoves();
    setTimeout(function () {
        dragItem.style.display = "block";
        dragItem.style.position = "absolute";
        dragItem = null;
    });
}

function handleDrop() {
    this.append(dragItem);
    movePiece(this.id, fromCell);

    highlightMoves();
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

//======================================================== Drag & Drop function ==========================================================//

function dragNdrop() {
    $(document).on("dragstart", ".piece", function (event) {
        fromCell = this.parentElement.id;
        dragItem = event.target;
        highlightMoves()
        setTimeout(function () {
            event.target.style.display = "none";
        });
    });
    $(document).on("dragend", ".piece", dragEnd);
    $(document).on("dragover", ".cell", dragOver);
    $(document).on("drop", ".cell", handleDrop);
    $(document).on("dragenter", ".cell", dragEnter);

    document.addEventListener('keydown', moveKeyboardPiece);
}

//======================================================== Render the chess board =========================================================//

function board(table) {
    table = document.createElement("div");
    table.classList.add("main");
    $('.wrapper').prepend(table);
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

//======================================================== Render the chess piece ==========================================================//

function placePieces(pos) {
    console.log(pos);
    for (let piece in pos) {
        let p = pos[piece];
        let pieceId = document.getElementById(piece);
        let newDiv = document.createElement("div");
        newDiv.draggable = true;
        if (pos[piece].includes("B")) {
            newDiv.classList.add("piece");
            newDiv.classList.add(p.substring(0, p.indexOf('B')) + "B");
            pieceId.appendChild(newDiv);
        } else {
            if (pos[piece].includes("W")) {
                newDiv.classList.add("piece");
                newDiv.classList.add(p.substring(0, p.indexOf('W')) + "W");
                pieceId.appendChild(newDiv);
            }
        }
    }
}

//======================================================== Move Keyboard Function ==========================================================//

function moveKeyboardPiece(e) {
    const $highlightedPiece = $(highlightedPiece);
    let parent = $highlightedPiece[0].parentElement.id;
    let par = $highlightedPiece[0].parentElement;
    let nextKeyB = $(`#${parent[0]}${parent[1]-1}`)[0];
    let nextKeyW = $(`#${parent[0]}${+parent[1]+1}`)[0];

    $highlightedPiece.css({
        position: "absolute"
    })
        if ($highlightedPiece.length)
            switch (e.which) {
                case 40:
                    if (par.firstChild.classList[1].charAt(par.firstChild.classList[1].length - 1) === "B")
                        nextKeyB.appendChild(par.firstChild);
                    break;
                case 38:
                    if (par.firstChild.classList[1].charAt(par.firstChild.classList[1].length - 1) === "W")
                        nextKeyW.appendChild(par.firstChild);
                    break;
            }

    let p = document.getElementsByClassName("piece");
    p[0].dispatchEvent(new Event('click'));
    highlightMoves();
}


//======================================================== Move Piece Function ============================================================//

function movePiece(to, from) {
    toCell = to;
    if ($(`#${toCell}`).hasClass("highlight")) {
        if (colorTurn === "black") {
            colorTurn = "white";
        } else {
            colorTurn = "black";
        }
        position[to] = position[from];
        position[from] = "none";
        localStorage.setItem("chess", JSON.stringify(position));
        console.log("from " + from);
        console.log("to " + toCell);
        console.log(position);
    }

}

//======================================================== Highlight the moves ===========================================================//

function highlightMoves() {
    console.log("highlight");
    $("div[class*='cell']").on("mouseover", function () {
        $(this).addClass("selector");
    }).on("mouseout", function (){
        $(this).removeClass("selector");
    }).on("click", function () {
        console.log("highlight 1 ")
        $(this).removeClass("selector");
        $(".highlight").toggleClass("highlight");

            highlightedPiece = this.firstChild;
            from = this.id;
            console.log(position[from])
            if (position[from] === "pawnB") {
                console.log("highlight 2");
                for (let i = from[1] - 1; i > from[1] - 3; i--) {
                    $(`#${from[0]}${i}`).toggleClass("highlight");
                }

            } else {
                if (position[from] === "pawnW") {
                    for (let i = +from[1] + 1; i < +from[1] + 3; i++) {
                        $(`#${from[0]}${i}`).toggleClass("highlight");
                    }
                }
            }
            if (position[from] === "knightB") {
                $(`#${String.fromCharCode((from[0].charCodeAt(0)) - 1)}${from[1] - 2}`).toggleClass("highlight");
                $(`#${String.fromCharCode((from[0].charCodeAt(0)) + 1)}${from[1] - 2}`).toggleClass("highlight");
                if (position[$(`#${String.fromCharCode((from[0].charCodeAt(0)) + 2)}${+from[1] + 1}`)[0].id] === "none")
                    $(`#${String.fromCharCode((from[0].charCodeAt(0)) + 2)}${+from[1] + 1}`).toggleClass("highlight");
                $(`#${String.fromCharCode((from[0].charCodeAt(0)) - 2)}${+from[1] + 1}`).toggleClass("highlight");
            } else {
                if (position[from] === "knightW") {
                    $(`#${String.fromCharCode((from[0].charCodeAt(0)) - 1)}${+from[1] + 2}`).toggleClass("highlight");
                    $(`#${String.fromCharCode((from[0].charCodeAt(0)) + 1)}${+from[1] + 2}`).toggleClass("highlight");
                    if (position[$(`#${String.fromCharCode((from[0].charCodeAt(0)) + 2)}${+from[1] + 1}`)[0].id] === "none")
                        $(`#${String.fromCharCode((from[0].charCodeAt(0)) + 2)}${+from[1] + 1}`).toggleClass("highlight");
                    $(`#${String.fromCharCode((from[0].charCodeAt(0)) - 2)}${+from[1] + 1}`).toggleClass("highlight");
                }
            }

            if (position[from] === "rookB") {
                if ($(`#${from[0]}${from[1] - 1}`) === "none") {
                    for (let i = from[1] - 1; i > from[1] - 6; i--) {
                        $(`#${from[0]}${i}`).toggleClass("highlight");
                    }
                } else {
                    console.log("bad");
                }
            } else {
                if (position[from] === "rookW") {
                    if ($(`#${from[0]}${+from[1] + 1}`) === "none") {
                        for (let i = +from[1] + 1; i < +from[1] + 7; i++) {
                            $(`#${from[0]}${i}`).toggleClass("highlight");
                        }
                    } else {
                        console.log("bad");
                    }
                }
            }
    });
}

//======================================================== Start New Game ==================================================================//
function startNewGame() {
    console.log("new game");

    window.localStorage.clear();
    localStorage.setItem("chess",JSON.stringify(piecesPosition));
    $(".main").remove();
    board();
    placePieces(piecesPosition);
    position = piecesPosition;
    highlightMoves();

}

//======================================================== CountDown Function ==========================================================//

// count.innerHTML = "The game will start in";
// count.style.fontSize = 3.7 + "em";
// document.body.appendChild(count);
// let seconds = 5;
// let countDown = setInterval(function(){
//     if(seconds > 0){
//         count.innerHTML = seconds;
//         count.style.left = 250 + "px";
//         count.style.fontSize = 7 + "em";
//         count.style.color = "brown";
//         seconds--;
//     }
//     else{
//         clearInterval(countDown);
//         count.innerHTML = " ";
//         startGame();
//     }
// },1000);

let divButton = document.createElement("div");
divButton.classList.add("divButton");
let button = document.createElement("button");
button.classList.add("startButton");
button.innerHTML = "Start new game";
$('.controls').append(divButton);
divButton.appendChild(button);
$('.controls').append("<p>Login Data</p>");  
$('.controls').append("<input type=\"text\" class=\"form__input\" id=\"name\" placeholder=\"Email\" required=\"\" />");
$('.controls').append("<button id='button1'>Sign In</button>");
$('.controls').append("<button id='button2'>Load Game</button>");
$('.controls').append("<button id='button3'>Save state</button>");


startGame();
button.addEventListener("click", startNewGame);


//======================================================== Start chess game Function ========================================================//

function startGame() {
    position = JSON.parse(localStorage.getItem("chess"))
    $(".main").remove();
    board();
    placePieces(position);
    highlightMoves();

}

function startGameAjax(p) {
    $(".main").remove();
    board();
    placePieces(p);
    highlightMoves();

}

function postUser(email){
    $.ajax({
        method: "POST",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/user",
        data: {
            email: email
        }
    }).done(function( msg ) {
        alert( "Data Saved: " + msg );
    });

}

function postData(email){
    $.ajax({
        method: "POST",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data/",
        data: {
            email: email,
            key: "chess",
            data: {
                position: JSON.parse(localStorage.getItem("chess"))
            },
            timestamp: "mihaela"
        }
    }).done(function( msg ) {
        alert( "Data Saved: " + msg );
    });

}
let getPosition;
function getData(email){
    $.ajax({
        method: "GET",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data/?email=" + email + "&key=chess" + "&timestamp=mihaela",
        data: {
            email: email,
            key: "chess"
        }
    }).done(function( msg ) {
        getPosition = msg.data[0].value.position;
        startGameAjax(getPosition);
        localStorage.setItem("chess",JSON.stringify(getPosition));
        console.log(getPosition);
    });

}

$("#button1").on("click",function (){
    let emailUser = $(".form__input").val();
    console.log(emailUser);
    postUser(emailUser);
})

$("#button2").on("click",function (){
    let emailUser = $(".form__input").val();
    console.log(emailUser);
    getData(emailUser);
})

$("#button3").on("click",function (){
    let emailUser = $(".form__input").val();
    console.log(emailUser);
    postData(emailUser);
})




dragNdrop();

