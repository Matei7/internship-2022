import "../css/style-chess.scss";


let table;
let count = document.createElement("div");
count.classList.add("count");
let piecesPosition = {
    "a8":"rookB","b8":"knightB","c8":"bishopB","d8":"queenB","e8":"kingB","f8":"bishopB","g8":"knight8","h8":"rookB",
    "a7":"pawnB","b7":"pawnB","c7":"pawnB","d7":"pawnB","e7":"pawnB","f7":"pawnB","g7":"pawnB","h7":"pawnB",
    "a6":"none","b6":"none","c6":"none","d6":"none","e6":"none","f6":"none","g6":"none","h6":"none",
    "a5":"none","b5":"none","c5":"none","d5":"none","e5":"none","f5":"none","g5":"none","h5":"none",
    "a4":"none","b4":"none","c4":"none","d4":"none","e4":"none","f4":"none","g4":"none","h4":"none",
    "a3":"none","b3":"none","c3":"none","d3":"none","e3":"none","f3":"none","g3":"none","h3":"none",
    "a2":"pawnW","b2":"pawnW","c2":"pawnW","d2":"pawnW","e2":"pawnW","f2":"pawnW","g2":"pawnW","h2":"pawnW",
    "a1":"rookW","b1":"knightW","c1":"bishopW","d1":"queenW","e1":"kingW","f1":"bishopW","g1":"knightW","h1":"rookW"
}

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

function addButton(){
    let divButton = document.createElement("div");
    divButton.classList.add("divButton");
    let button = document.createElement("button");
    button.innerHTML = "Start new game";
    divButton.appendChild(button);
    document.body.appendChild(divButton);
    button.addEventListener("click",function (){
        alert("am apasat butonul");
        startGame();
    });
}

function startGame(){

    // black pieces
    let rookB = document.getElementById("a8");
    rookB.classList.add("rook-black");
    rookB.classList.add("piece");

    let knightB = document.getElementById("b8");
    knightB.classList.add("knight-black");
    knightB.classList.add("piece");

    let bishopB = document.getElementById("c8");
    bishopB.classList.add("bishop-black");
    bishopB.classList.add("piece");

    let queenB = document.getElementById("d8");
    queenB.classList.add("queen-black");
    queenB.classList.add("piece");

    let kingB = document.getElementById("e8");
    kingB.classList.add("king-black");
    kingB.classList.add("piece");

    let bishopB1 = document.getElementById("f8");
    bishopB1.classList.add("bishop-black");
    bishopB1.classList.add("piece");

    let knightB1 = document.getElementById("g8");
    knightB1.classList.add("knight-black");
    knightB1.classList.add("piece");

    let rookB1 = document.getElementById("h8");
    rookB1.classList.add("rook-black");
    rookB1.classList.add("piece");

    let pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8;
    pawn1 = document.getElementById("a7");
    pawn1.classList.add("pawn-black");
    pawn1.classList.add("piece");

    pawn2 = document.getElementById("b7");
    pawn2.classList.add("pawn-black");
    pawn2.classList.add("piece");

    pawn3 = document.getElementById("c7");
    pawn3.classList.add("pawn-black");
    pawn3.classList.add("piece");

    pawn4 = document.getElementById("d7");
    pawn4.classList.add("pawn-black");
    pawn4.classList.add("piece");

    pawn5 = document.getElementById("e7");
    pawn5.classList.add("pawn-black");
    pawn5.classList.add("piece");

    pawn6 = document.getElementById("f7");
    pawn6.classList.add("pawn-black");
    pawn6.classList.add("piece");

    pawn7 = document.getElementById("g7");
    pawn7.classList.add("pawn-black");
    pawn7.classList.add("piece");

    pawn8 = document.getElementById("h7");
    pawn8.classList.add("pawn-black");
    pawn8.classList.add("piece");

    //white pieces
    let rookW = document.getElementById("a1");
    rookW.classList.add("rook-white");
    rookW.classList.add("piece");

    let knightW = document.getElementById("b1");
    knightW.classList.add("knight-white");
    knightW.classList.add("piece");

    let bishopW = document.getElementById("c1");
    bishopW.classList.add("bishop-white");
    bishopW.classList.add("piece");

    let queenW = document.getElementById("d1");
    queenW.classList.add("queen-white");
    queenW.classList.add("piece");

    let kingW = document.getElementById("e1");
    kingW.classList.add("king-white");
    kingW.classList.add("piece");

    let bishopW1 = document.getElementById("f1");
    bishopW1.classList.add("bishop-white");
    bishopW1.classList.add("piece");

    let knightW1 = document.getElementById("g1");
    knightW1.classList.add("knight-white");
    knightW1.classList.add("piece");

    let rookW1 = document.getElementById("h1");
    rookW1.classList.add("rook-white");
    rookW1.classList.add("piece");

    let pawn1W, pawn2W, pawn3W, pawn4W, pawn5W, pawn6W, pawn7W, pawn8W;
    pawn1W = document.getElementById("a2");
    pawn1W.classList.add("pawn-white");
    pawn1W.classList.add("piece");

    pawn2W = document.getElementById("b2");
    pawn2W.classList.add("pawn-white");
    pawn2W.classList.add("piece");

    pawn3W = document.getElementById("c2");
    pawn3W.classList.add("pawn-white");
    pawn3W.classList.add("piece");

    pawn4W = document.getElementById("d2");
    pawn4W.classList.add("pawn-white");
    pawn4W.classList.add("piece");

    pawn5W = document.getElementById("e2");
    pawn5W.classList.add("pawn-white");
    pawn5W.classList.add("piece");

    pawn6W = document.getElementById("f2");
    pawn6W.classList.add("pawn-white");
    pawn6W.classList.add("piece");

    pawn7W = document.getElementById("g2");
    pawn7W.classList.add("pawn-white");
    pawn7W.classList.add("piece");

    pawn8W = document.getElementById("h2");
    pawn8W.classList.add("pawn-white");
    pawn8W.classList.add("piece");

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
//         board();
//         addButton();
//     }
// },1000);

board();
startGame();
addButton();

function movePieces(){

    for(let i = 0; i < 64; i++){
        let cellSelected = document.querySelectorAll(".piece")[i];

        cellSelected.addEventListener("mouseover",function (){
            cellSelected.classList.add("selector");
        });
        cellSelected.addEventListener("mouseout",function (){
            cellSelected.classList.remove("selector");
        });





        cellSelected.addEventListener("click",()=>{
            let check= document.querySelector(".selector");
            if(check !== undefined){
                let idSelected = cellSelected.id;
                document.getElementById("a4").style.backgroundColor = "wheat";
                document.getElementById("a5").style.backgroundColor = "wheat";
                document.getElementById("a6").style.backgroundColor = "wheat";
            }
        })


    }


        // let onClick = document.getElementsByClassName('selector');
        // onClick.addEventListener("click", function (){
        //     alert("da");
        // })


}

movePieces()
