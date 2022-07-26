let doc = document;
let time = 5;
doc.getElementById('counter').style.setProperty("font-size","35px");
doc.getElementById('counter').style.setProperty("color","#aee8bf");
doc.body.style.setProperty("text-align", "center");
let interval = setInterval(countDown, 10);
setInterval(main,100);

let startGame = () => {
    myGameArea.start();
}

let chessBoard = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn','br' ],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp','bp' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e','e' ],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp','wp' ],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn','wr' ]
    ];

let width = 8;
let height = 8;

let getImg = (type)=>{
    switch (type) {
        case 'r':
            return 'k.svg';
        default:
            return 'k.svg';
    }
}

let drawPieces = (myCanvas)=>{
    for(let i = 0; i < height; i ++){
        for(let j = 0; j < width; j ++){
            if(chessBoard[i][j] !== 'e'){
                if(chessBoard[i][j][0] === 'b'){
                    let img = new Image;
                    img.src = './images/' + getImg(chessBoard[i][j][1]);
                    myCanvas.drawImage(img,i*10,j*10,10,10);
                }
                else{
                    let img = new Image;
                    img.src = './images/' + getImg(chessBoard[i][j][1]);
                    myCanvas.drawImage(img,i*10,j*10,10,10);
                }
            }
            else{
                let img = new Image;
                img.src = './images/' + getImg(chessBoard[i][j][1]);
                myCanvas.drawImage(img,i*10,j*10,50,50);
            }
        }
    }
}

let drawTable= (myCanvas)=>{
    myCanvas.fillStyle = '#ff0088';
    //myCanvas.globalCompositeOperation = 'destination-over';
    for(let i = 0; i < height; i ++){
        for(let j = 0; j < width; j ++){
                if( (i + j)% 2 === 0 ){
                    myCanvas.fillStyle = '#afb9ae';
                }
                else {
                    myCanvas.fillStyle = '#0e0303';
                }
                myCanvas.fillRect(i*10,j*10,10,10);
        }
    }
    //myCanvas.globalCompositeOperation = 'source-over';
}

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        this.context.scale(10,10);
        drawTable(this.context);
        drawPieces(this.context);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function countDown(){
       doc.getElementById('counter').innerHTML = "Time left : " + time;
       time --;
       if(time < 0) {
           clearInterval(interval);
           doc.getElementById('counter').style.setProperty('display','none');
           startGame();
           console.log('game started');
       }
}

function main(){

}