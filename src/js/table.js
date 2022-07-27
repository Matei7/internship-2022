import "../css/style-table.scss";

let mainDiv = document.createElement("div");
document.body.appendChild(mainDiv);

let top = document.createElement('div');
top.classList.add("top");
mainDiv.appendChild(top);

function createMain() {
    mainDiv = document.createElement("div");
    document.body.appendChild(mainDiv);
}

function drawTable() {
    let indexColumn;
    const tableDiv = document.createElement("div");
    tableDiv.classList.add("tableBoard");
    mainDiv.appendChild(tableDiv);
    mainDiv.classList.add("main");

    const topLeftSet = document.createElement("div");
    topLeftSet.classList.add("top-left-set-of-five");
    tableDiv.appendChild(topLeftSet);

    indexColumn = 6;
    for(let i = 0; i < 6; i++ ) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("top-left-triangles");
        triangleDiv.setAttribute("id","column-" + indexColumn);
        indexColumn++;
        topLeftSet.appendChild(triangleDiv);
    }

    const topRightSet = document.createElement("div");
    topRightSet.classList.add("top-right-set-of-five");
    tableDiv.appendChild(topRightSet);

    indexColumn = 0;
    for(let i = 0; i < 6; i++ ) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("top-right-triangles");
        triangleDiv.setAttribute("id","column-" + indexColumn);
        indexColumn++;
        topRightSet.appendChild(triangleDiv);
    }

    const bottomLeftSet = document.createElement("div");
    bottomLeftSet.classList.add("bottom-left-set-of-five");
    tableDiv.appendChild(bottomLeftSet);

    indexColumn = 12;
    for(let i = 0; i < 6; i++ ) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("bottom-left-triangles");
        triangleDiv.setAttribute("id","column-" + indexColumn);
        indexColumn++;
        bottomLeftSet.appendChild(triangleDiv);
    }

    indexColumn = 18;
    const bottomRightSet = document.createElement("div");
    bottomRightSet.classList.add("bottom-right-set-of-five");
    tableDiv.appendChild(bottomRightSet);

    for(let i = 0; i < 6; i++ ) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("bottom-right-triangles");
        triangleDiv.setAttribute("id","column-" + indexColumn);
        indexColumn++;
        bottomRightSet.appendChild(triangleDiv);
    }
}


// let whites = [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5];
// function drawPieces(nr, index) {
//     console.log(`${index + 1} - nr de piese: ${nr}`)
//     ;}
// whites.forEach((nr, index) => drawPieces(nr, index));


function drawPiece(numberOfPieces, columnIndex, color) {
    const divElement = document.createElement('div');
    divElement.classList.add('div-set');
    divElement.setAttribute("id", "set-" + columnIndex);
    document.getElementById("column-" + columnIndex).appendChild(divElement);

    for(let index = 0; index < numberOfPieces; index++) {
        const circleDiv = document.createElement("div");
        circleDiv.classList.add(color + "-pieces");
        circleDiv.setAttribute("id", color+ "-piece-" + index);
        document.getElementById("set-"+ columnIndex).appendChild(circleDiv);
    }

    if(columnIndex > 11) {
        console.log(columnIndex);
        divElement.style.bottom = '0';
        divElement.style.position = 'absolute';
        divElement.style.bottom = '0';
    }
}

function initialState() {
    let whites = [2,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,3,0,5,0,0,0,0,0];
    let blacks = [0,0,0,0,0,5,0,3,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,2];
    const white = "white";
    const black = "black";

    whites.forEach((nr, index) => drawPiece(nr, index, white));
    blacks.forEach((nr, index) => drawPiece(nr, index, black));
}

function startGame() {
    // top = document.createElement('div');
    top.classList.add("top");
    mainDiv.appendChild(top);
    const startBtn = document.createElement("button");
    startBtn.classList.add("start-button");
    startBtn.innerHTML = "Start new game";
    top.appendChild(startBtn);
    startBtn.addEventListener('click', clickStart);
}

// function createDice() {
//     const rollDiceBtn = document.createElement('button');
//     rollDiceBtn.classList.add("dice-button");
//     rollDiceBtn.innerHTML = "Roll the dice";
//     top.appendChild(rollDiceBtn);
//     rollDiceBtn.addEventListener('click', rollDice);
// }

const rollDiceBtn = document.createElement('button');
rollDiceBtn.classList.add("dice-button");
rollDiceBtn.innerHTML = "Roll the dice";
top.appendChild(rollDiceBtn);
rollDiceBtn.addEventListener('click', rollDice);
function rollDice() {

}

function clearTable() {
    mainDiv.remove();
}

function clickStart() {
    clearTable();
    createMain();
    startGame();
    drawTable();
    initialState();
}

function main() {
    startGame();
    drawTable();
    initialState();

    // createDice();
}

main();