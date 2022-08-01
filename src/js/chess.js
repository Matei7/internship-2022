import "../css/chess_style.scss";
import $ from "jquery";


const letters = "abcdefgh";
const piecesNameArray = ["rb","nb","bb","kb","qb","r","n","b","k","q","pb","p"];
const matrix={
    "a8":"rb","b8":"nb","c8":"bb","d8":"qb","e8":"kb","f8":"bb","g8":"nb","h8":"rb",
    "a7":"pb","b7":"pb","c7":"pb","d7":"pb","e7":"pb","f7":"pb","g7":"pb","h7":"pb",
    "a6":"e","b6":"e","c6":"e","d6":"e","e6":"e","f6":"e","g6":"e","h6":"e",
    "a5":"e","b5":"e","c5":"e","d5":"e","e5":"e","f5":"e","g5":"e","h5":"e",
    "a4":"e","b4":"e","c4":"e","d4":"e","e4":"e","f4":"e","g4":"e","h4":"e",
    "a3":"e","b3":"e","c3":"e","d3":"e","e3":"e","f3":"e","g3":"e","h3":"e",
    "a2":"p","b2":"p","c2":"p","d2":"p","e2":"p","f2":"p","g2":"p","h2":"p",
    "a1":"r","b1":"n","c1":"b","d1":"q","e1":"k","f1":"b","g1":"n","h1":"r",
};
let game = Object.assign({},matrix);
let cell = Object.keys(game);

let turn = "white";

let from;
let to;
let pieceType;

function createTable(){
    const main = document.createElement("div");
    main.setAttribute("class","main");
    document.body.appendChild(main);
    let l ;
    let color;
    let colorCheck = true;
    for (let i = 8; i >= 1;i--){
        for (l of letters){
          const child = document.createElement("div");
          child.setAttribute("id", l+i);
          colorCheck ? color = "white-box" : color = "black-box",colorCheck = !colorCheck;
          child.setAttribute("class","chess-box "+color);
          main.appendChild(child);

        }
        colorCheck = !colorCheck;
    }
}

function placeThePieces(){

    let dele = $(".chess-box img");
    for (let i of dele){
        $(i).remove();
    }

    for (let i =0; i<piecesNameArray.length;i++){
        let location;
        let dark;
        if(piecesNameArray[i].length === 2){
            location = "Negru";
            dark = "";
        }
        else {
            location = "Alb"
            dark = "l";
        }
        let piecesName = piecesNameArray[i];
        piecesName = document.createElement("img");
        piecesName.setAttribute("src", "../src/img/"+location+"/Chess_"+piecesNameArray[i]+dark+"t45.svg");
        piecesName.classList.add("piesa");
        for (let j of cell) {
            if (game[j] === piecesNameArray[i]){
                document.getElementById(j).appendChild(piecesName.cloneNode());
            }
        }
    }
}
function moveFrom(){
    if (turn === "white" && game[this.parentElement.id].length === 1 && (game[this.parentElement.id] !== "e")){
        $(".piece-ready").toggleClass("piece-ready")
        this.parentElement.classList.toggle("piece-ready");
        from = this.parentElement.id;
        pieceType = game[from];
        console.log(pieceType);
        console.log("from "+from);
        potentialMoveLight();
        console.log(turn)
    }
    else if (turn === "black" && game[this.parentElement.id].length === 2 && (game[this.parentElement.id] !== "e")){
        $(".piece-ready").toggleClass("piece-ready");
        this.parentElement.classList.toggle("piece-ready");
        from = this.parentElement.id;
        pieceType = game[from];
        console.log(pieceType);
        console.log("from "+from);
        potentialMoveDark();
    }

    if(turn === "white" && game[this.parentElement.id].length === 2 ){
        console.log(turn);
        debugger;
        if (pieceType !== undefined) {
            game[this.parentElement.id] = game[from];
            game[from] = "e";
            console.log(this.parentElement.id);
            placeThePieces();
        }
    }

}

function moveTo(){
    to = this.id;
    if($(`#${to}`).hasClass("potential")){
        if(turn = "white"){
            turn = "black"
        }
        else{
            turn = "white";
        }
        console.log("to "+to);
        game[to] = game[from];
        game[from] = "e";
        console.log("from "+from);
        $(".potential").toggleClass("potential");
        placeThePieces();
    }
}
function searchFreeBoxes(){
    $(document).on('click','.chess-box:empty',moveTo);
}
function searchPieces(){
    $(document).on('click','.chess-box img',moveFrom);
}

function event(){
    searchPieces()
    searchFreeBoxes()
}

function potentialMoveLight(){
    $(".potential").toggleClass("potential");
    if( pieceType === "p"){
        if(matrix[from] === game[from]){
            for(let i = +from[1]+1; i<+from[1]+3;i++){
                $("#"+from[0]+i).toggleClass("potential");
            }
        }
        else{
            for(let i = +from[1]+1; i<+from[1]+2;i++){
                $("#"+from[0]+i).toggleClass("potential");
            }
        }
    }
}
function potentialMoveDark(){
    $(".potential").toggleClass("potential");
    if( pieceType === "pb"){
        if(matrix[from] === game[from]){
            for(let i = +from[1]-1; i>+from[1]-3;i--){
                $("#"+from[0]+i).toggleClass("potential");
            }
        }
        else{
            for(let i = +from[1]-1; i>+from[1]-2;i--){
                $("#"+from[0]+i).toggleClass("potential");
            }
        }
    }
}

createTable();
placeThePieces();
event();


