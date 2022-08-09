import $ from "jquery"

const SCALE_FACTOR = 10; //the scale at which the canvas will be scaled
const WIDTH = 8; // board width
const HEIGHT = 8; //board height
const INITIAL_BOARD = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn','br' ],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp','bp' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp','wp' ],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn','wr' ]
];

let doc = document;
let time = 5; // used for a timer
let interval = setInterval(countDown, 1000); // the timer
let email = "";
let images = {}; // a dictionary in which images will be preloaded

// a list containing chess piece types, used for image preloading
// types[i][0] == 'b' ? black piece : white piece
// types[i][1] represents the piece type, p = pawn , k = king , n = knight r = rook, q = queen , b = bishop
let types = ['br', 'bn', 'bb', 'bq', 'bk','bp','wr', 'wn', 'wb', 'wq', 'wk','wp'];
let chessBoard = [];
let turn = 0; //white to move ? 0 : 1
let queue =[]; //a queue which contains positions which have been animated for possible moves
let selectedPiece = []; // contains the current selected piece
let possibleMoves = []; // a list containing the possible moves of a selected piece
let prevPos = []; // previous position which was drawn for drag&drop
let mousePressed = 0; // == 1 ? mouse button pressed : not pressed, used for drag&drop
let hovered = [];// coordinates of the hovered piece
let myTime = 0;// used to redraw only once, this mechanic should be eliminated for good
let input = doc.createElement("input"); // input field for email
let button = doc.createElement("button");//button for registering
let loadFromServerButton = doc.createElement("button");//button for loading from server
let newGameButton = doc.createElement("button");//button for new game
let logOutButton = doc.createElement("button");
let label = doc.createElement("label");//label to display "Email" text
let originalVal = input.value;//store original value and only load game if things have changed
let moveList = [];// stores moves for random move generator
//adds the user to the server
let createUser = () => {
    $.ajax(
        {
            method : "POST",
            url : "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/user",
            data : {
                "email" : email
            }
        }
    ).done(()=>{
        console.log("user Created");
    });
}
//uploads data to the server using email and key
let uploadToServer = () => {
    $.ajax(
        {
            method : "POST",
            url : "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data",
            data : {
                "email" : email,
                "key" : "livingInAShack",
                "data" : {
                    turn, chessBoard
                }
            }
        }
    ).done(()=>{
        console.log("dat Uploaded");
    });
}
//retrieves data from the server
let getFromServer = () => {
    $.ajax(
        {
            method : "GET",
            url : "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data",
            data : {
                "email": email,
                "key": "livingInAShack"
            }
        }
    ).done( (response) =>{
        let data = response.data[response.data.length -1];
        chessBoard = data.value.chessBoard;
        turn = data.value.turn;
        redraw();
    });
}
//retrieves the local storage data
let retrieveData = () =>{
    try {
        email = localStorage.getItem("myData");
        let data = JSON.parse(localStorage.getItem(email)); // using JSON.parse()
        email = data["email"];
        turn = data["turn"];
        chessBoard = data["board"];
    }catch (e) {
        //if there is no valid data or the data gets corrupted
        email = "";
        turn = 0;
        chessBoard = [];
    }
}
//uploads data to local storage
let uploadData = ()=>{
    let data = {};
    data["email"] = email;
    data["turn"] =  turn;
    data["board"] =  chessBoard;
    localStorage.setItem("myData", email);//using JSON.stringify
    localStorage.setItem(email, JSON.stringify(data));
}
// a pre-setup function that sets/loads different sh*t
let preset = () => {
    loadImages();
    retrieveData();
    if(chessBoard === null)
        chessBoard = [];
    doc.body.style.backgroundImage = "url(./images/background.jpg)";
    doc.body.style.backgroundRepeat= "no-repeat";
    doc.getElementById('main').style.setProperty("font-size", "35px");
    doc.getElementById('main').style.setProperty("color", "#edf510");
    doc.body.style.setProperty("text-align", "center");
    setInterval(main, 100);
}
// preloads images for in-game performance
let loadImages = () =>{
    types.forEach((el) =>{
        let img = new Image();
        img.src = './images/' + getImg(el); // images are in another folder called "images", the names of the images are in the list "types"
        images[el] = img;
    })
}

//forms image name given the type
let getImg = (type)=>{
    return type + '.svg';
}

//checks if there is an empty space at x y
let isEmpty = (x, y) =>{
    return chessBoard[y][x] === 'e';
}
//checks if there is a white piece at x y
let isWhitePiece = (x,y) =>{
    return chessBoard[y][x][0] === 'w';
}
//checks if there is a white piece at x y
let isBlackPiece = (x,y) =>{
    return chessBoard[y][x][0] === 'b';
}
//checks if a position is on board
let onBoard = (i, j, width, height) => {
    return i >= 0 && i < width && j >= 0 && j < height;
}
//draws on piece given the canvas context and i,j as chessboard coordinates, in screen coordinates they have to be reverted to j,i
let drawPiece = (myCanvas, i, j) =>{
    if(!isEmpty(j,i)){
        myCanvas.drawImage(images[chessBoard[i][j]], j * SCALE_FACTOR, i * SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR);
    }
}
//draws all pieces by making use of the previous drawPiece function
let drawPieces = (myCanvas)=>{
    for(let i = 0; i < HEIGHT; i ++){
        for(let j = 0; j < WIDTH; j ++){
            drawPiece(myCanvas,i,j);
        }
    }
}
//draws a square on the table given the canvas context and i,j as chessboard coordinates
let drawSquare = (myCanvas,i , j)=>{
    if( (i + j)% 2 === 1 ){
        myCanvas.fillStyle = '#4b1616';
    }
    else {
        myCanvas.fillStyle = 'rgb(213,186,167)';
    }
    myCanvas.fillRect(j*SCALE_FACTOR,i*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
}
//same as drawSquare but it draws the square in a different color, used when hover over available piece
let drawSelectedSquare = (myCanvas,i , j)=>{
    myCanvas.fillStyle = '#604646';
    myCanvas.fillRect(j*SCALE_FACTOR,i*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
}
// draws all the squares given the context of the canvas
let drawTable= (myCanvas)=>{
    for(let i = 0; i < HEIGHT; i ++){
        for(let j = 0; j < WIDTH; j ++){
                drawSquare(myCanvas, i,j);
        }
    }
}
// redraws the squares in the queue which have been affected by possible moves animation
let redo = (myCanvas) => {
    let x1,y1;
    while(queue.length !== 0) {
        [x1, y1] = queue.pop();
        myCanvas.clearRect(x1*SCALE_FACTOR,y1*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
        drawSquare(myCanvas,y1,x1);
        drawPiece(myCanvas,y1,x1);
    }
}
// computes the possible moves of a pawn
let computePawnMoves = (i, j, color) =>{
    let max = 1; // the maximum distance the pawn can travel
    let dir = 1; // dir == 1 ? move from 1 to 8 : move from 8 to 1
    if(color === 'w'){
        dir = -1;// white is on the downside
        // first move
        if(i === 6){
            //can move 2 squares
            max = 2;
        }
        //check if pawn can take enemy piece, pawn takes diagonally
        if(onBoard(i-1,j+1,HEIGHT,WIDTH) && chessBoard[i-1][j+1][0] === 'b'){
            possibleMoves.push([j+1,i-1]);
        }
        if(onBoard(i-1,j-1,HEIGHT,WIDTH) && chessBoard[i-1][j-1][0] === 'b'){
            possibleMoves.push([j-1,i-1]);
        }
    }
    else{
        // first move
        if(i === 1){
            //can move 2 squares
            max = 2;
        }
        //check if pawn can take enemy piece, pawn takes diagonally
        if(onBoard(i+1,j+1,HEIGHT,WIDTH) && chessBoard[i+1][j+1][0] === 'w'){
            possibleMoves.push([j+1,i+1]);
        }
        if(onBoard(i+1,j-1,HEIGHT,WIDTH)&& chessBoard[i+1][j-1][0] === 'w'){
            possibleMoves.push([j-1,i+1]);
        }
    }

    let k = i;
    // go on the current pawn column and add the possible forward moves
    while(dir*(k-i) < max && k < 7 && k > 0){// dir*(k - i) < max means:  given the direction , go in that direction until you moved max times
        k += dir;// go in the given direction
        if(chessBoard[k][j] !== 'e') //if there is a piece blocking the path, the pawn shouldn't be able to move
            break;
        possibleMoves.push([j,k]);
    }
}
// used for rook & bishop moves
// given starting position i,j and a direction dir1,dir2 and the color of the piece compute possible moves in that direction until piece leaves the board
let moveOnBoard = (i,j,dir1, dir2, color) =>{
    i += dir1;
    j += dir2;
    while(onBoard(i,j,WIDTH,HEIGHT)){
        if(!isEmpty(j,i)) {
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
//computes bishop moves by going in all 4 diagonal directions
let computeBishopMoves = (i, j, color) => {
    //down-right
    moveOnBoard(i,j,-1,1,color);
    //up-left
    moveOnBoard(i,j,1,-1,color);
    //up-right
    moveOnBoard(i,j,1,1,color);
    //down-left
    moveOnBoard(i,j,-1,-1,color);
}
//computes bishop moves by going in all 4 directions: up down , left, right
let computeRookMoves = (i, j, color) => {
    //down
    moveOnBoard(i,j,-1,0,color);
    //up
    moveOnBoard(i,j,1,0,color);
    //left
    moveOnBoard(i,j,0,1,color);
    //right
    moveOnBoard(i,j,0,-1,color);
}
//checks all 8 directions and adds possible moves
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
//checks all directions for the knight and adds possible moves
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
// interface for possible moves given position, detects which piece is at the given position and computes possible moves accordingly
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
        case 'wq': //queen = bishop + rook
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
let generateAllPossibleMoves = (color) =>{
    for(let i = 0; i < 8; i ++){
        for(let j = 0; j < 8; j ++){
            if(chessBoard[i][j][0] === color){
                computePossibleMoves(i,j);
            }
            while(possibleMoves.length !== 0){
                moveList.push([possibleMoves.pop(),i,j]);
            }
        }
    }
}

// TODO , king safety
let safe = (i,j,color)=>{
    return true;
}
//checks if rook and king are in the starting position, this part is hard coded
let canSwap = (type, color)=>{
    if(color === 'w'){
        if(type === 'small' && chessBoard[7][4] === 'wk' && chessBoard[7][7] === "wr" &&
            chessBoard[7][5] === 'e' && chessBoard[7][6] === 'e'){
            possibleMoves.push([6,7]);
        }
        if(type === 'big' && chessBoard[7][4] === 'wk' && chessBoard[7][0] === "wr" &&
            chessBoard[7][1] === 'e' && chessBoard[7][2] === 'e' && chessBoard[7][3] === 'e'){
            possibleMoves.push([2,7]);
        }
    }
    if(color === 'b'){
        if(type === 'small' && chessBoard[0][4] === 'bk' && chessBoard[0][7] === "br" &&
            chessBoard[0][5] === 'e' && chessBoard[0][6] === 'e'){
            possibleMoves.push([6,0]);
        }
        if(type === 'big' && chessBoard[0][4] === 'bk' && chessBoard[0][0] === "br" &&
            chessBoard[0][1] === 'e' && chessBoard[0][2] === 'e' && chessBoard[0][3] === 'e'){
            possibleMoves.push([2,0]);
        }
    }
}
//draws a little circle on those squares the piece can legally move given the possible moves
let drawPossibleMoves = (myCanvas,x,y) =>{
    redo(myCanvas);
    computePossibleMoves(y,x);
    while(possibleMoves.length !== 0){
        let x1,y1;
        myCanvas.fillStyle = '#8ff88b';
        if(possibleMoves.length === 1 && possibleMoves[0] == null) return;
        [x1,y1] = possibleMoves.pop();
        myCanvas.beginPath();
        myCanvas.arc(SCALE_FACTOR*x1+5, SCALE_FACTOR*y1+5,1, 50, 0, 2 * Math.PI);
        myCanvas.strokeStyle = '#87ad87';
        myCanvas.strokeOpacity = 0.1;
        myCanvas.stroke();
        //adds the moves to the queue for moving pieces
        queue.push([x1,y1]);
    }
}
//TODO pawn promotions
let promote = (x,y,color)=>{

}

//redraw the entire table
let redraw = () =>{
    myGameArea.context.clearRect(0,0,myGameArea.canvas.width, myGameArea.canvas.height);
    drawTable(myGameArea.context);
    drawPieces(myGameArea.context);
}

//castles king, hard coded
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

//return normalized position given the event
let getActualPosition = (event) =>{
    let x = event.offsetX;
    let y = event.offsetY;
    const squareArea = SCALE_FACTOR * SCALE_FACTOR;
    x = Math.floor(x/squareArea);
    y = Math.floor(y/squareArea);
    return [x,y];
}
//redraw the squares affected by draw on drag
//TODO make it efficient, a piece can only be over 4 squares at a time, but this function checks all squares around the piece position
let restoreSquares = (con, x, y) => {
    let j = Math.floor(x /(SCALE_FACTOR*SCALE_FACTOR));
    let i = Math.floor(y /(SCALE_FACTOR*SCALE_FACTOR));
    if(onBoard(i,j+1,WIDTH,HEIGHT)){
        drawSquare(con,i,j+1);
        drawPiece(con,i,j+1);
    }
    if(onBoard(i,j-1,WIDTH,HEIGHT)){
        drawSquare(con,i,j-1);
        drawPiece(con,i,j-1);
    }
    if(onBoard(i+1,j,WIDTH,HEIGHT)){
        drawSquare(con,i+1,j);
        drawPiece(con,i+1,j);
    }
    if(onBoard(i-1,j,WIDTH,HEIGHT)){
        drawSquare(con,i-1,j);
        drawPiece(con,i-1,j);
    }
    if(onBoard(i+1,j-1,WIDTH,HEIGHT)){
        drawSquare(con,i+1,j-1);
        drawPiece(con,i+1,j-1);
    }
    if(onBoard(i-1,j-1,WIDTH,HEIGHT)){
        drawSquare(con,i-1,j-1);
        drawPiece(con,i-1,j-1);
    }
    if(onBoard(i-1,j+1,WIDTH,HEIGHT)){
        drawSquare(con,i-1,j+1);
        drawPiece(con,i-1,j+1);
    }
    if(onBoard(i+1,j+1,WIDTH,HEIGHT)){
        drawSquare(con,i+1,j+1);
        drawPiece(con,i+1,j+1);
    }
    drawSquare(con,i,j);
    drawPiece(con,i,j);
}
//draws piece under the mouse given an event
let drawPieceUnderMouse = (event) =>{
    let x = event.offsetX;
    let y = event.offsetY;
    let con = myGameArea.context;
    //if no piece is selected, there is nothing to drag
    if(selectedPiece.length === 0)
        return;
    let selX, selY;
    [selX, selY] = selectedPiece;
    //if the pieces was drawn,
    if(prevPos.length !== 0){
        let prevX,prevY;
        [prevX,prevY] = prevPos;
        con.clearRect(prevX/SCALE_FACTOR-SCALE_FACTOR/2,prevY/SCALE_FACTOR-SCALE_FACTOR/2,SCALE_FACTOR,SCALE_FACTOR);
        restoreSquares(con,prevX,prevY);
        prevPos = [];
    }
    //redraw selected piece square empty
    con.clearRect(selX*SCALE_FACTOR,selY*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
    drawSquare(con,selY,selX);
    //redraw possible moves
    drawPossibleMoves(con,selX,selY);
    //draw the image right under the mouse
    con.drawImage(images[chessBoard[selY][selX]], x/10-5, y/10-5, SCALE_FACTOR, SCALE_FACTOR);
    //update prevPos
    prevPos = [x,y];
}
//makes updates on click
let doMouseDown = (event)=>{
    //mouse is presses
    mousePressed = 1;
    let x,y;
    [x, y] = getActualPosition(event);
    //did piece move?
    let movedPiece = 0;
    //did castle happen?
    let castled = 0;
    //if a piece is selected
    if(selectedPiece.length > 0){
        let selectedX, selectedY;
        [selectedX, selectedY] = selectedPiece;
        //search current position in queue, list of possible moves
        queue.forEach(el =>{
            let myX, myY;
            [myX, myY] = el;
            // if element found
            if(x === myX && y === myY && (x !== selectedX || y !== selectedY) ){
                //update turn
                if(chessBoard[selectedY][selectedX][0] === 'w'){
                    turn = 1;
                }
                else
                    turn = 0;
                castled += castle(selectedX, selectedY,x);//check if castling is possible
                //move the piece
                chessBoard[y][x] = chessBoard[selectedY][selectedX];
                // empty previous spot
                chessBoard[selectedY][selectedX] = 'e';
                // promotion, TODO implement promote
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
    //if no piece is selected then select piece according to turn if there is a piece in the current position
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
    //if piece moved
    if(movedPiece !== 0){
        redo(myGameArea.context);
        uploadData();
        uploadToServer();
    }
    // if castle happened
    if(castled) redraw();
}
// for the end of drag and drop action, mostly like doMouseDown
let doMouseUp = (event) =>{
    //mouse is presses
    mousePressed = 0;
    let x,y;
    [x, y] = getActualPosition(event);
    //did piece move?
    let movedPiece = 0;
    //if a piece is selected
    if(selectedPiece.length > 0){
        let selectedX, selectedY;
        [selectedX, selectedY] = selectedPiece;
        //search current position in queue, list of possible moves
        queue.forEach(el =>{
            let myX, myY;
            [myX, myY] = el;
            // if element found
            if(x === myX && y === myY && (x !== selectedX || y !== selectedY) ){
                //update turn
                if(chessBoard[selectedY][selectedX][0] === 'w'){
                    turn = 1;
                }
                else
                    turn = 0;
                castle(selectedX, selectedY,x);//check if castling is possible
                //move the piece
                chessBoard[y][x] = chessBoard[selectedY][selectedX];
                // empty previous spot
                chessBoard[selectedY][selectedX] = 'e';
                // promotion, TODO implement promote
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
    // if piece moved
    if(movedPiece !== 0){
        redo(myGameArea.context);
        uploadData();
        uploadToServer();
    }
    //redraw at the end
    redraw();
}
// handles hover piece event
let hoverPiece = (x,y) => {
    drawSelectedSquare(myGameArea.context, y,x);
    drawPiece(myGameArea.context, y,x);
    doc.body.style.cursor = 'pointer';
    hovered = [x,y];
}
// the opposite of hoverPiece, if there is no piece under the mouse, cancel last hover
let redoHover = () =>{
    if(hovered.length === 0)
        return;
    let x,y;
    [x,y]= hovered;
    myGameArea.context.clearRect(x*SCALE_FACTOR,y*SCALE_FACTOR,SCALE_FACTOR,SCALE_FACTOR);
    drawSquare(myGameArea.context, y,x);
    drawPiece(myGameArea.context, y,x);
    doc.body.style.cursor = 'default';
    hovered = [];
}
// handles mouse movement event
let doOnMouseMove = (event) =>{
    if(myTime === 0){
        redraw();
        myTime = 1;
    }
    let x, y;
    [x, y] = getActualPosition(event);
    // drag piece
    if(mousePressed){
        drawPieceUnderMouse(event);
        return;
    }
    // hover piece if there is turn color piece
    if(hovered.length === 0) {
        if (turn === 0 && isWhitePiece(x, y))
            hoverPiece(x, y);
        if (turn === 1 && isBlackPiece(x, y))
            hoverPiece(x, y);
    }
    // else redo the hover
    else
    {
        let hovX, hovY;
        [hovX, hovY] = hovered;
        if(hovX !== x || hovY !== y) {
            redoHover();
            //there might be a piece on this square so check for piece
            if (turn === 0 && isWhitePiece(x, y))
                hoverPiece(x, y);
            if (turn === 1 && isBlackPiece(x, y))
                hoverPiece(x, y);
        }
    }
}
// a counter to give time for images to load, about 5 seconds
let doReleaseKey = (event) =>{
    let key = event.key;
    if(key === 'r'){
        generateAllPossibleMoves(turn === 0 ? 'w' : 'b');
        let move = moveList[Math.floor(Math.random()*moveList.length)];
        chessBoard[move[0][1]][move[0][0]] = chessBoard[move[1]][move[2]];
        chessBoard[move[1]][move[2]] = 'e';
        turn = turn === 0 ? 1 : 0;
        redraw();
    }
    moveList =[];
}
async function countDown(){
    preset();
    let main = doc.getElementById('main');
    let phrase = ['Loading stuff', 'Preparing pieces', 'Waiting for the queen to prepare', 'Checking Logins', 'Waiting For Matei to be ready'];
       main.innerHTML = phrase[5 - time] +  " : " + time;
       main.style.textAlign = "center";
       if(time > 0) {
           time--;
       }
       else
       {
           time --;
       }
       if(time < 0) {
           clearInterval(interval);
           main.style.setProperty('display','none');
           if(email === "")
               setLogin();
           else
               startGame();
           console.log('game started');
       }
}
//login function, start game after login
let login = () => {
    if(input.value !== originalVal){
        email = input.value;
        createUser();
        startGame();
        doc.body.removeChild(input);
        doc.body.removeChild(label);
        doc.body.removeChild(button);
    }
}
//login setup, add all required elements to the page
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
//define gameArea, a canvas, a start method and canvas setups
let logOut = () =>{
    email = "";
    uploadData();
    doc.location.reload();
}
let myGameArea = {
    //create canvas
    canvas : document.createElement("canvas"),
    start : function() {
        //canvas setups
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        this.context.scale(SCALE_FACTOR,SCALE_FACTOR);
        //if no chessboard was loaded from local storage
        if(chessBoard.length === 0) {
            chessBoard = JSON.parse(JSON.stringify(INITIAL_BOARD));
        }
        //draw table and pieces
        drawTable(this.context);
        drawPieces(this.context);
        //setup events
        this.canvas.addEventListener("mousedown", doMouseDown, false);
        this.canvas.addEventListener("mousemove", doOnMouseMove, false);
        this.canvas.addEventListener("mouseup", doMouseUp, false);
        doc.addEventListener("keyup",doReleaseKey,false);


        this.canvas.style.float = "left";
        this.canvas.style.marginLeft = "100px";
        //insert onto page canvas and multiple buttons
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        newGameButton.innerHTML = "New Game";
        newGameButton.style.marginTop = "130px";
        newGameButton.style.padding = "10px 50px 10px 50px";
        newGameButton.style.float = "left";
        newGameButton.onclick = restartGame;
        newGameButton.style.marginLeft = "23vw";
        logOutButton.innerHTML = "Log Out";
        logOutButton.style.marginTop = "30px";
        logOutButton.style.padding = "10px 50px 10px 50px";
        logOutButton.style.float = "left";
        logOutButton.style.marginLeft = "23vw";
        logOutButton.onclick = logOut;
        loadFromServerButton.innerHTML = "Load Saved Game";
        loadFromServerButton.style.marginTop = "30px";
        loadFromServerButton.style.padding = "10px 50px 10px 50px";
        loadFromServerButton.style.float = "left";
        loadFromServerButton.style.marginLeft = "23vw";
        loadFromServerButton.onclick = getFromServer;
        this.canvas.parentElement.appendChild(newGameButton);
        this.canvas.parentElement.appendChild(logOutButton);
        this.canvas.parentElement.appendChild(loadFromServerButton);
    }
}
//start the game
let startGame = () => {
    myGameArea.start()
}
//restart's the chessboard state
let restartGame = () =>{
    chessBoard = JSON.parse(JSON.stringify(INITIAL_BOARD));
    turn = 0;
    redraw();
}
// should every program have a main?
function main(){

}