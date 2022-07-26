import "../css/chess_style.scss";

let matrix={
    "a8":"rb","b8":"nb","c8":"bb","d8":"kb","e8":"qb","f8":"bb","g8":"nb","h8":"rb",
    "a7":"pb","b7":"pb","c7":"pb","d7":"pb","e7":"pb","f7":"pb","g7":"pb","h7":"pb",
    "a6":"e","b6":"e","c6":"e","d6":"e","e6":"e","f6":"e","g6":"e","h6":"e",
    "a5":"e","b5":"e","c5":"e","d5":"e","e5":"e","f5":"e","g5":"e","h5":"e",
    "a4":"e","b4":"e","c4":"e","d4":"e","e4":"e","f4":"e","g4":"e","h4":"e",
    "a3":"e","b3":"e","c3":"e","d3":"e","e3":"e","f3":"e","g3":"e","h3":"e",
    "a2":"p","b2":"p","c2":"p","d2":"p","e2":"p","f2":"p","g2":"p","h2":"p",
    "a1":"r","b1":"n","c1":"b","d1":"k","e1":"q","f1":"b","g1":"n","h1":"r",
};
function createTable(){
    const main = document.createElement("div");
    main.setAttribute("class","main");
    document.body.appendChild(main);
    const letters = "abcdefgh";
    let l ;
    let color;
    let colorCheck = true;
    for (let i = 1; i < 9;i++){
        for (l of letters){
          const child = document.createElement("div");
          child.setAttribute("id", l+i);
          colorCheck ? color = "white-box" : color = "blakc-box",colorCheck = !colorCheck;
          child.setAttribute("class","chess-table "+color);
          main.appendChild(child);

        }
        colorCheck = !colorCheck;
    }
}

function placeThePieces(){
    const rb = document.createElement("img");
    const nb = document.createElement("img");
    const bb = document.createElement("img");
    const kb = document.createElement("img");
    const qb = document.createElement("img");

    const r = document.createElement("img");
    const n = document.createElement("img");
    const b = document.createElement("img");
    const k = document.createElement("img");
    const q = document.createElement("img");

    const pb = document.createElement("img");
    const p = document.createElement("img");

    rb.setAttribute("src", "../src/img/Negru/Chess_rdt45.svg");
    nb.setAttribute("src", "../src/img/Negru/Chess_ndt45.svg");
    bb.setAttribute("src", "../src/img/Negru/Chess_bdt45.svg");
    kb.setAttribute("src", "../src/img/Negru/Chess_kdt45.svg");
    qb.setAttribute("src", "../src/img/Negru/Chess_qdt45.svg");

    r.setAttribute("src", "../src/img/Alb/Chess_rlt45.svg");
    n.setAttribute("src", "../src/img/Alb/Chess_nlt45.svg");
    b.setAttribute("src", "../src/img/Alb/Chess_blt45.svg");
    k.setAttribute("src", "../src/img/Alb/Chess_klt45.svg");
    q.setAttribute("src", "../src/img/Alb/Chess_qlt45.svg");

    pb.setAttribute("src", "../src/img/Negru/Chess_pdt45.svg");
    p.setAttribute("src", "../src/img/Alb/Chess_plt45.svg");

    rb.classList.add("piesa");
    nb.classList.add("piesa");
    bb.classList.add("piesa");
    kb.classList.add("piesa");
    qb.classList.add("piesa");
    r.classList.add("piesa");
    n.classList.add("piesa");
    b.classList.add("piesa");
    k.classList.add("piesa");
    q.classList.add("piesa");
    pb.classList.add("piesa");
    p.classList.add("piesa");

    let cell = Object.keys(matrix);
    for (let i of cell){
        switch (matrix[i]) {
            case "rb":
                document.getElementById(i).appendChild(rb.cloneNode());
                break;
            case "nb":
                document.getElementById(i).appendChild(nb.cloneNode());
                break;
            case "bb":
                document.getElementById(i).appendChild(bb.cloneNode());
                break;
            case "kb":
                document.getElementById(i).appendChild(kb.cloneNode());
                break;
            case "qb":
                document.getElementById(i).appendChild(qb.cloneNode());
                break;

            case "r":
                document.getElementById(i).appendChild(r.cloneNode());
                break;
            case "n":
                document.getElementById(i).appendChild(n.cloneNode());
                break;
            case "b":
                document.getElementById(i).appendChild(b.cloneNode());
                break;
            case "k":
                document.getElementById(i).appendChild(k.cloneNode());
                break;
            case "q":
                document.getElementById(i).appendChild(q.cloneNode());
                break;

            case "pb":
                document.getElementById(i).appendChild(pb.cloneNode());
                break;
            case "p":
                document.getElementById(i).appendChild(p.cloneNode());
                break;
        }
    }
}

createTable();
placeThePieces();