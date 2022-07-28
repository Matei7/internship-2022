import "../css/chess_style.scss";

const letters = "abcdefgh";
const piecesNameArray = ["rb","nb","bb","kb","qb","r","n","b","k","q","pb","p"];
const matrix={
    "a8":"rb","b8":"nb","c8":"bb","d8":"kb","e8":"qb","f8":"bb","g8":"nb","h8":"rb",
    "a7":"pb","b7":"pb","c7":"pb","d7":"pb","e7":"pb","f7":"pb","g7":"pb","h7":"pb",
    "a6":"e","b6":"e","c6":"e","d6":"e","e6":"e","f6":"e","g6":"e","h6":"e",
    "a5":"e","b5":"e","c5":"e","d5":"e","e5":"e","f5":"e","g5":"e","h5":"e",
    "a4":"e","b4":"e","c4":"e","d4":"e","e4":"e","f4":"e","g4":"e","h4":"e",
    "a3":"e","b3":"e","c3":"e","d3":"e","e3":"e","f3":"e","g3":"e","h3":"e",
    "a2":"p","b2":"p","c2":"p","d2":"p","e2":"p","f2":"p","g2":"p","h2":"p",
    "a1":"r","b1":"n","c1":"b","d1":"k","e1":"q","f1":"b","g1":"n","h1":"r",
};
let game = Object.assign({},matrix);

let cell = Object.keys(game);
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
            if (matrix[j] === piecesNameArray[i]){
                document.getElementById(j).appendChild(piecesName.cloneNode());
            }
        }
    }
}

function event(){
    //let selected ;
     for (let i = 0;i<64;i++) {
         let ass = document.querySelectorAll(".chess-box")[i];
         ass.addEventListener("mouseenter",()=>{
             console.log(ass.id);
         });
     }
     for (let i = 0; i<64; i++){
         let pa = document.querySelectorAll(".piesa")[i];
         pa.addEventListener("mouseenter", () => {
             pa.parentElement.classList.add("piece-selected");
         });
         pa.addEventListener("mouseleave", () => {
             pa.parentElement.classList.remove("piece-selected");
         });
         pa.addEventListener("click", () => {
             pa.parentElement.classList.toggle("piece-ready");
         });
     }

}

createTable();
placeThePieces();
event();