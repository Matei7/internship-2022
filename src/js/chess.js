let doc = document;
let time = 5;
const SCALE_FACTOR = 10;
let interval = setInterval(countDown, 10);

let preset = () => {
    loadImages();
    chessBoard = JSON.parse(sessionStorage.getItem("myData"));
    if(chessBoard === null)
        chessBoard = [];
    console.log(chessBoard);
    doc.getElementById('counter').style.setProperty("font-size", "35px");
    doc.getElementById('counter').style.setProperty("color", "#aee8bf");
    doc.body.style.setProperty("text-align", "center");
    setInterval(main, 100);
}

let images = {};
let types = ['br', 'bn', 'bb', 'bq', 'bk','bp','wr', 'wn', 'wb', 'wq', 'wk','wp'];
let loadImages = () =>{
    types.forEach((el) =>{
        let img = new Image();
        img.src = './images/' + getImg(el);
        images[el] = img;
    })
}

let initialBoard = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn','br' ],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp','bp' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp','wp' ],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn','wr' ]
    ];

let chessBoard = [];
const WIDTH = 8;
const HEIGHT = 8;

let turn = 0;

let getImg = (type)=>{
    return type + '.svg';
}

let isEmpty = (x, y) =>{
    return chessBoard[y][x] === 'e';
}

let isWhitePiece = (x,y) =>{
    return chessBoard[y][x][0] === 'w';
}
let isBlackPiece = (x,y) =>{
    return chessBoard[y][x][0] === 'b';
}

let drawPiece = (myCanvas, i, j) =>{
    if(chessBoard[i][j] !== 'e'){
        myCanvas.drawImage(images[chessBoard[i][j]], j * SCALE_FACTOR, i * SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR);
    }
}

let drawPieces = (myCanvas)=>{
    for(let i = 0; i < HEIGHT; i ++){
        for(let j = 0; j < WIDTH; j ++){
            drawPiece(myCanvas,i,j);
        }
    }
}

let drawRectangle = (myCanvas,i , j)=>{
    if( (i + j)% 2 === 1 ){
        myCanvas.fillStyle = '#afb9ae';
    }
    else {
        myCanvas.fillStyle = 'rgba(14,3,3,0)';
    }
    myCanvas.fillRect(j*SCALE_FACTOR,i*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
}
let drawSelectedRectangle = (myCanvas,i , j)=>{
    myCanvas.fillStyle = '#c5ffc3';
    myCanvas.fillRect(j*SCALE_FACTOR,i*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
}

let drawTable= (myCanvas)=>{
    for(let i = 0; i < HEIGHT; i ++){
        for(let j = 0; j < WIDTH; j ++){
                drawRectangle(myCanvas, i,j);
        }
    }
}
let queue =[];
let selectedPiece = []
let redo = (myCanvas) => {
    let x1,y1;
    while(queue.length !== 0) {
        [x1, y1] = queue.pop();
        myCanvas.clearRect(x1*SCALE_FACTOR,y1*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
        drawRectangle(myCanvas,y1,x1);
        drawPiece(myCanvas,y1,x1);
    }
}

let onBoard = (i, j, width, height) => {
    return i >= 0 && i < width && j >= 0 && j < height;
}

let possibleMoves = []
let computePawnMoves = (i, j, color) =>{
    let max = 1;
    let dir = 1;
    if(color === 'w'){
        dir = -1;
        if(i === 6){
            max = 2;
        }
        if(i > 0 && j < 7 && chessBoard[i-1][j+1][0] === 'b'){
            possibleMoves.push([j+1,i-1]);
        }
        if(i > 0 && j > 0 && chessBoard[i-1][j-1][0] === 'b'){
            possibleMoves.push([j-1,i-1]);
        }
    }
    else{
        if(i === 1){
            max = 2;
        }
        if(i < 7 && j < 7 && chessBoard[i+1][j+1][0] === 'w'){
            possibleMoves.push([j+1,i+1]);
        }
        if(i < 7 && j > 0 && chessBoard[i+1][j-1][0] === 'w'){
            possibleMoves.push([j-1,i+1]);
        }
    }
    let k = i;

    while(dir*(k-i) < max && k < 7 && k > 0){
        k += dir;
        if(chessBoard[k][j] !== 'e')
            break;
        possibleMoves.push([j,k]);
    }
}
let moveDiagonally = (i,j,dir1, dir2, color) =>{
    i += dir1;
    j += dir2;
    while(onBoard(i,j,WIDTH,HEIGHT)){
        if(chessBoard[i][j] !== 'e') {
            if(chessBoard[i][j][0] !== color){
                possibleMoves.push([j,i]);
            }
            break;
        }
        possibleMoves.push([j,i]);
        i += dir1;
        j += dir2;
    }
}

let computeBishopMoves = (i, j, color) => {
    moveDiagonally(i,j,-1,1,color);
    moveDiagonally(i,j,1,-1,color);
    moveDiagonally(i,j,1,1,color);
    moveDiagonally(i,j,-1,-1,color);
}

let computeRookMoves = (i, j, color) => {
    moveDiagonally(i,j,-1,0,color);
    moveDiagonally(i,j,1,0,color);
    moveDiagonally(i,j,0,1,color);
    moveDiagonally(i,j,0,-1,color);
}

let safe = (i,j,color)=>{
    return true;
}
let canSwap = (dir, color)=>{
    if(color === 'w'){
        if(dir === 'small' && chessBoard[7][4] === 'wk' && chessBoard[7][7] === "wr" &&
            chessBoard[7][5] === 'e' && chessBoard[7][6] === 'e'){
            possibleMoves.push([6,7]);
        }
        if(dir === 'big' && chessBoard[7][4] === 'wk' && chessBoard[7][0] === "wr" &&
            chessBoard[7][1] === 'e' && chessBoard[7][2] === 'e' && chessBoard[7][3] === 'e'){
            possibleMoves.push([2,7]);
        }
    }
    if(color === 'b'){
        if(dir === 'small' && chessBoard[0][4] === 'bk' && chessBoard[0][7] === "br" &&
            chessBoard[0][5] === 'e' && chessBoard[0][6] === 'e'){
            possibleMoves.push([6,0]);
        }
        if(dir === 'big' && chessBoard[0][4] === 'bk' && chessBoard[0][0] === "br" &&
            chessBoard[0][1] === 'e' && chessBoard[0][2] === 'e' && chessBoard[0][3] === 'e'){
            possibleMoves.push([2,0]);
        }
    }
}
let computeKingMoves = (i, j, color) => {
    if(onBoard(i,j+1,WIDTH,HEIGHT) && safe(i,j+1,color) && chessBoard[i][j+1][0] !== color){
        possibleMoves.push([j+1,i]);
    }
    if(onBoard(i,j-1,WIDTH,HEIGHT) && safe(i,j-1,color) && chessBoard[i][j-1][0] !== color){
        possibleMoves.push([j-1,i]);
    }
    if(onBoard(i+1,j,WIDTH,HEIGHT) && safe(i+1,j,color) && chessBoard[i+1][j][0] !== color){
        possibleMoves.push([j,i+1]);
    }
    if(onBoard(i-1,j,WIDTH,HEIGHT) && safe(i-1,j,color) && chessBoard[i-1][j][0] !== color){
        possibleMoves.push([j,i-1]);
    }
    if(onBoard(i+1,j-1,WIDTH,HEIGHT) && safe(i+1,j-1,color) && chessBoard[i+1][j-1][0] !== color){
        possibleMoves.push([j-1,i+1]);
    }
    if(onBoard(i-1,j-1,WIDTH,HEIGHT) && safe(i-1,j-1,color) && chessBoard[i-1][j-1][0] !== color){
        possibleMoves.push([j-1,i-1]);
    }
    if(onBoard(i-1,j+1,WIDTH,HEIGHT) && safe(i-1,j+1,color) && chessBoard[i-1][j+1][0] !== color){
        possibleMoves.push([j+1,i-1]);
    }
    if(onBoard(i+1,j+1,WIDTH,HEIGHT) && safe(i+1,j+1,color) && chessBoard[i+1][j+1][0] !== color){
        possibleMoves.push([j+1,i+1]);
    }
    canSwap('small',color);
    canSwap('big',color);
    let e = possibleMoves.pop();
    possibleMoves.push(e);
}

let computeKnightMoves = (i, j, color) => {
    if(onBoard(i+2,j-1,WIDTH,HEIGHT) && chessBoard[i+2][j-1][0] !== color){
        possibleMoves.push([j-1,i+2]);
    }
    if(onBoard(i+2,j+1,WIDTH,HEIGHT) && chessBoard[i+2][j+1][0] !== color){
        possibleMoves.push([j+1,i+2]);
    }
    if(onBoard(i-2,j-1,WIDTH,HEIGHT) && chessBoard[i-2][j-1][0] !== color){
        possibleMoves.push([j-1,i-2]);
    }
    if(onBoard(i-2,j+1,WIDTH,HEIGHT) && chessBoard[i-2][j+1][0] !== color){
        possibleMoves.push([j+1,i-2]);
    }
    if(onBoard(i-1,j+2,WIDTH,HEIGHT) && chessBoard[i-1][j+2][0] !== color){
        possibleMoves.push([j+2,i-1]);
    }
    if(onBoard(i+1,j+2,WIDTH,HEIGHT) && chessBoard[i+1][j+2][0] !== color){
        possibleMoves.push([j+2,i+1]);
    }
    if(onBoard(i-1,j-2,WIDTH,HEIGHT) && chessBoard[i-1][j-2][0] !== color){
        possibleMoves.push([j-2,i-1]);
    }
    if(onBoard(i+1,j-2,WIDTH,HEIGHT) && chessBoard[i+1][j-2][0] !== color){
        possibleMoves.push([j-2,i+1]);
    }
}

let computePossibleMoves = (i, j)=> {
    switch(chessBoard[i][j]){
        case 'wp':
           computePawnMoves(i,j,'w');
           break;
        case 'bp':
            computePawnMoves(i,j,'b');
            break;
        case 'wb':
            computeBishopMoves(i,j,'w');
            break;
        case 'bb':
            computeBishopMoves(i,j,'b');
            break;
        case 'wr':
            computeRookMoves(i,j,'w');
            break;
        case 'br':
            computeRookMoves(i,j,'b');
            break;
        case 'wq':
            computeBishopMoves(i,j,'w');
            computeRookMoves(i,j,'w');
            break;
        case 'bq':
            computeBishopMoves(i,j,'b');
            computeRookMoves(i,j,'b');
            break;
        case 'wk':
            computeKingMoves(i,j,'w');
            break;
        case 'bk':
            computeKingMoves(i,j,'b');
            break;
        case 'wn':
            computeKnightMoves(i,j,'w');
            break;
        case 'bn':
            computeKnightMoves(i,j,'b');
            break;
        default:
            break;
    }
}

let drawPossibleMoves = (myCanvas,x,y) =>{
    redo(myCanvas);
    computePossibleMoves(y,x);
    while(possibleMoves.length !== 0){
        let x1,y1;
        myCanvas.fillStyle = '#8ff88b';
        [x1,y1] = possibleMoves.pop();
        myCanvas.beginPath();
        myCanvas.arc(SCALE_FACTOR*x1+5, SCALE_FACTOR*y1+5,1, 50, 0, 2 * Math.PI);
        myCanvas.strokeStyle = '#87ad87';
        myCanvas.strokeOpacity = 0.1;
        myCanvas.stroke();
        queue.push([x1,y1]);
    }
}

let promote = (x,y,color)=>{

}

let redraw = () =>{
    myGameArea.context.clearRect(0,0,myGameArea.canvas.width, myGameArea.canvas.height);
    drawTable(myGameArea.context);
    drawPieces(myGameArea.context);
}

let castle = (selectedX, selectedY,x) =>{
    if(chessBoard[selectedY][selectedX] === 'wk' && selectedX - x === 2){
        chessBoard[7][3] = 'wr';
        chessBoard[7][0] = 'e';
        return true;
    }
    if(chessBoard[selectedY][selectedX] === 'wk' && selectedX - x === -2){
        chessBoard[7][5] = 'wr';
        chessBoard[7][7] = 'e';
        return true;
    }
    if(chessBoard[selectedY][selectedX] === 'bk' && selectedX - x === 2){
        chessBoard[0][3] = 'br';
        chessBoard[0][0] = 'e';
        return true;
    }
    if(chessBoard[selectedY][selectedX] === 'bk' && selectedX - x === -2){
        chessBoard[0][5] = 'br';
        chessBoard[0][7] = 'e';
        return true;
    }
    return false;
}

let getActualPosition = (event) =>{
    let x = event.offsetX;
    let y = event.offsetY;
    const squareArea = SCALE_FACTOR * SCALE_FACTOR;
    x = Math.floor(x/squareArea);
    y = Math.floor(y/squareArea);
    return [x,y];
}

let prevPos = [];
let drawSpeed = 0;

let restoreSquares = (con, x, y) => {
    let j = Math.floor(x /(SCALE_FACTOR*SCALE_FACTOR));
    let i = Math.floor(y /(SCALE_FACTOR*SCALE_FACTOR));
    if(onBoard(i,j+1,WIDTH,HEIGHT)){
        drawRectangle(con,i,j+1);
        drawPiece(con,i,j+1);
    }
    if(onBoard(i,j-1,WIDTH,HEIGHT)){
        drawRectangle(con,i,j-1);
        drawPiece(con,i,j-1);
    }
    if(onBoard(i+1,j,WIDTH,HEIGHT)){
        drawRectangle(con,i+1,j);
        drawPiece(con,i+1,j);
    }
    if(onBoard(i-1,j,WIDTH,HEIGHT)){
        drawRectangle(con,i-1,j);
        drawPiece(con,i-1,j);
    }
    if(onBoard(i+1,j-1,WIDTH,HEIGHT)){
        drawRectangle(con,i+1,j-1);
        drawPiece(con,i+1,j-1);
    }
    if(onBoard(i-1,j-1,WIDTH,HEIGHT)){
        drawRectangle(con,i-1,j-1);
        drawPiece(con,i-1,j-1);
    }
    if(onBoard(i-1,j+1,WIDTH,HEIGHT)){
        drawRectangle(con,i-1,j+1);
        drawPiece(con,i-1,j+1);
    }
    if(onBoard(i+1,j+1,WIDTH,HEIGHT)){
        drawRectangle(con,i+1,j+1);
        drawPiece(con,i+1,j+1);
    }
    drawRectangle(con,i,j);
    drawPiece(con,i,j);
}

let drawPieceUnderMouse = (event) =>{
    if(drawSpeed++ < 1){
        return;
    }
    drawSpeed = 0;
    let x = event.offsetX;
    let y = event.offsetY;
    let con = myGameArea.context;
    if(selectedPiece.length ===0 )
        return;
    let selX, selY;
    [selX, selY] = selectedPiece;
    con.clearRect(selX*SCALE_FACTOR,selY*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
    drawRectangle(con,selX,selY);
    let img = new Image();
    img.src = './images/' + getImg(chessBoard[selY][selX]);
    if(prevPos.length !== 0){
        let prevX,prevY;
        [prevX,prevY] = prevPos;
        con.clearRect(prevX/SCALE_FACTOR-SCALE_FACTOR/2,prevY/SCALE_FACTOR-SCALE_FACTOR/2,SCALE_FACTOR,SCALE_FACTOR);
        restoreSquares(con,prevX,prevY);
        prevPos = [];
    }
    img.onload= function() {
        img.style.setProperty("filter","invert(1)")
        con.drawImage(img, x/10-5, y/10-5, SCALE_FACTOR, SCALE_FACTOR);
    }
    prevPos = [x,y];
    drawPossibleMoves(con,selX,selY);
}

let mousePressed = 0;

let doMouseDown = (event)=>{
    mousePressed = 1;
    let x,y;
    [x, y] = getActualPosition(event);
    let movedPiece = 0;
    let castled = 0;
    if(selectedPiece.length > 0){
        let selectedX, selectedY;
        [selectedX, selectedY] = selectedPiece;
        queue.forEach(el =>{
            let myX, myY;
            [myX, myY] = el;
            if(x === myX && y === myY && (x !== selectedX || y !== selectedY) ){
                if(chessBoard[selectedY][selectedX][0] === 'w'){
                    turn = 1;
                }
                else
                    turn = 0;

                castled += castle(selectedX, selectedY,x);//check if castling is possible
                chessBoard[y][x] = chessBoard[selectedY][selectedX];
                chessBoard[selectedY][selectedX] = 'e';
                if( chessBoard[y][x] === 'wp' && y === 0){
                    promote(x, y, 'w');
                }
                else if( chessBoard[y][x] === 'bp' && y === 7){
                    promote(x, y, 'b');
                }
                movedPiece = 1;
            }
        });
        queue.push(selectedPiece);
    }
    if(turn === 0 && chessBoard[y][x][0] === 'w') {
        drawPossibleMoves(myGameArea.context, x, y);
        selectedPiece = [x,y];
    }
    else if(chessBoard[y][x][0] === 'b' && turn === 1)
    {
        drawPossibleMoves(myGameArea.context, x, y);
        selectedPiece = [x,y];
    }
    else {
        selectedPiece = [];
    }
    if(movedPiece !== 0){
        redo(myGameArea.context);
    }
    if(castled) redraw();
    localStorage.setItem("myData", JSON.stringify(chessBoard));
}
let doMouseUp = (event) =>{
    mousePressed = 0;
    let x, y;
    [x, y] = getActualPosition(event);
    let movedPiece = 0;
    let castled = 0;
    if(selectedPiece.length > 0){
        let selectedX, selectedY;
        [selectedX, selectedY] = selectedPiece;
        queue.forEach(el =>{
            let myX, myY;
            [myX, myY] = el;
            if(x === myX && y === myY && (x !== selectedX || y !== selectedY) ){
                if(chessBoard[selectedY][selectedX][0] === 'w'){
                    turn = 1;
                }
                else
                    turn = 0;

                castled += castle(selectedX, selectedY,x);//check if castling is possible
                chessBoard[y][x] = chessBoard[selectedY][selectedX];
                chessBoard[selectedY][selectedX] = 'e';
                if( chessBoard[y][x] === 'wp' && y === 0){
                    promote(x, y, 'w');
                }
                else if( chessBoard[y][x] === 'bp' && y === 7){
                    promote(x, y, 'b');
                }
                movedPiece = 1;
            }
        });
        queue.push(selectedPiece);
    }
    if(movedPiece !== 0){
        redo(myGameArea.context);
    }
    else{
        restoreSquares(myGameArea.context,x*SCALE_FACTOR*SCALE_FACTOR,y*SCALE_FACTOR*SCALE_FACTOR);
    }
    if(castled) redraw();
    localStorage.setItem("myData", JSON.stringify(chessBoard));
}

let hovered = [];

let hoverPiece = (x,y) => {
    drawSelectedRectangle(myGameArea.context, y,x);
    drawPiece(myGameArea.context, y,x);
    doc.body.style.cursor = 'pointer';
    hovered = [x,y];
}
let redoHover = () =>{
    if(hovered.length === 0)
        return;
    let x,y;
    [x,y]= hovered;
    myGameArea.context.clearRect(x*SCALE_FACTOR,y*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
    drawRectangle(myGameArea.context, y,x);
    drawPiece(myGameArea.context, y,x);
    doc.body.style.cursor = 'default';
    hovered = [];
}

let myTime = 0;
let doOnMouseMove = (event) =>{
    if(myTime === 0){
        redraw();
        myTime = 1;
    }
    let x, y;
    [x, y] = getActualPosition(event);
    if(mousePressed){
        drawPieceUnderMouse(event);
        return;
    }
    if(hovered.length === 0) {
        if (turn === 0 && isWhitePiece(x, y))
            hoverPiece(x, y);
        if (turn === 1 && isBlackPiece(x, y))
            hoverPiece(x, y);
    }
    else
    {
        let hovX, hovY;
        [hovX, hovY] = hovered;
        if(hovX !== x || hovY !== y) {
            redoHover();
            if (turn === 0 && isWhitePiece(x, y))
                hoverPiece(x, y);
            if (turn === 1 && isBlackPiece(x, y))
                hoverPiece(x, y);
        }
    }
}

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        this.context.scale(SCALE_FACTOR,SCALE_FACTOR);
        if(chessBoard.length === 0) {
           initialBoard.forEach( (el)=> {
              chessBoard.push(el);
           });
        }
        drawTable(this.context);
        drawPieces(this.context);
        this.canvas.addEventListener("mousedown", doMouseDown, false);
        this.canvas.addEventListener("mousemove", doOnMouseMove, false);
        this.canvas.addEventListener("mouseup", doMouseUp, false);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function countDown(){
       doc.getElementById('counter').innerHTML = "Time left : " + time;
       time --;
       if(time < 0) {
           clearInterval(interval);
           doc.getElementById('counter').style.setProperty('display','none');
           setLogin();
           console.log('game started');
       }
}

let login = () => {
    if(input.value !== originalVal){
        email = input.value;
        startGame();
        doc.body.removeChild(input);
        doc.body.removeChild(label);
        doc.body.removeChild(button);
    }
}

let input = doc.createElement("input");
let button = doc.createElement("button");
let label = doc.createElement("label");
let originalVal = input.value;

let setLogin = () =>{
    input.setAttribute("name", "email");
    button.innerHTML = "Login";
    button.style.setProperty("margin-left","20px");
    label.innerHTML = "Email: ";
    button.onclick = login;
    doc.body.appendChild(label);
    doc.body.appendChild(input);
    doc.body.appendChild(button);
}

let email = "";

let startGame = () => {
    preset();
    myGameArea.start()
}
function main(){

}