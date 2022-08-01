import "../css/style-table.scss";
import $ from "jquery";

let mainDiv = document.createElement("div");
mainDiv = document.createElement("div");
mainDiv.setAttribute("id", "main");
document.body.appendChild(mainDiv);

let top = document.createElement('div');
top = document.createElement('div');
top.classList.add("top");
mainDiv.appendChild(top);

let tableDiv;

function drawTable() {
    let indexColumn;
    tableDiv = document.createElement("div");
    tableDiv.classList.add("tableBoard");
    mainDiv.appendChild(tableDiv);
    mainDiv.classList.add("main");

    const topLeftSet = document.createElement("div");
    topLeftSet.classList.add("top-left-set-of-five");
    tableDiv.appendChild(topLeftSet);

    indexColumn = 6;
    for (let i = 0; i < 6; i++) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("top-left-triangles");
        triangleDiv.setAttribute("id", "column-" + indexColumn);
        indexColumn++;
        topLeftSet.appendChild(triangleDiv);
    }

    const topRightSet = document.createElement("div");
    topRightSet.classList.add("top-right-set-of-five");
    tableDiv.appendChild(topRightSet);

    indexColumn = 0;
    for (let i = 0; i < 6; i++) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("top-right-triangles");
        triangleDiv.setAttribute("id", "column-" + indexColumn);
        indexColumn++;
        topRightSet.appendChild(triangleDiv);
    }

    const bottomLeftSet = document.createElement("div");
    bottomLeftSet.classList.add("bottom-left-set-of-five");
    tableDiv.appendChild(bottomLeftSet);

    indexColumn = 12;
    for (let i = 0; i < 6; i++) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("bottom-left-triangles");
        triangleDiv.setAttribute("id", "column-" + indexColumn);
        indexColumn++;
        bottomLeftSet.appendChild(triangleDiv);
    }

    indexColumn = 18;
    const bottomRightSet = document.createElement("div");
    bottomRightSet.classList.add("bottom-right-set-of-five");
    tableDiv.appendChild(bottomRightSet);

    for (let i = 0; i < 6; i++) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("bottom-right-triangles");
        triangleDiv.setAttribute("id", "column-" + indexColumn);
        indexColumn++;
        bottomRightSet.appendChild(triangleDiv);
    }
}

function drawPiece(numberOfPieces, columnIndex, color) {
    const divElement = document.createElement('div');
    divElement.classList.add('div-set');
    divElement.setAttribute("id", "set-" + columnIndex);
    document.getElementById("column-" + columnIndex).appendChild(divElement);

    for (let index = 0; index < numberOfPieces; index++) {
        const circleDiv = document.createElement("div");
        circleDiv.classList.add(color + "-pieces");
        circleDiv.setAttribute("id", color + "-piece-" + index);
        document.getElementById("set-" + columnIndex).appendChild(circleDiv);
    }

    if (columnIndex > 11) {
        divElement.style.bottom = '0';
        divElement.style.position = 'absolute';
        divElement.style.bottom = '0';
    }
}

let whites;
let blacks;
const white = "white";
const black = "black";

function initialState() {
    whites = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, 0];
    blacks = [0, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];

    whites.forEach((nr, index) => drawPiece(nr, index, white));
    blacks.forEach((nr, index) => drawPiece(nr, index, black));
}

function reRenderPieces(whites, blacks) {
    clearTable();
    drawTable();
    whites.forEach((nr, index) => drawPiece(nr, index, white));
    blacks.forEach((nr, index) => drawPiece(nr, index, black));
}

function startGame() {
    const startBtn = document.createElement("button");
    startBtn.classList.add("start-button");
    startBtn.innerHTML = "Start new game";
    top.appendChild(startBtn);
    startBtn.addEventListener('click', clickStart);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let diceDiv;
let randNumOne;
let randNumTwo;

function createDiceButton() {
    diceDiv = document.createElement('div');
    diceDiv.classList.add('dice-container');
    top.appendChild(diceDiv);

    const firstDice = document.createElement('div');
    firstDice.classList.add('dice-one')
    diceDiv.appendChild(firstDice);
    for (let i = 1; i <= 6; i++) {
        let eachDiv = document.createElement('div');
        eachDiv.classList.add('dice-face', 'dice-face-' + i);
        eachDiv.innerHTML = i.toString();
        firstDice.appendChild(eachDiv);
    }

    const secondDice = document.createElement('div');
    secondDice.classList.add('dice-two')
    diceDiv.appendChild(secondDice);
    for (let i = 1; i <= 6; i++) {
        let eachDiv = document.createElement('div');
        eachDiv.classList.add('dice-face', 'dice-face-' + i);
        eachDiv.innerHTML = i.toString();
        secondDice.appendChild(eachDiv);
    }

    let rollBtn = document.createElement("button");
    rollBtn.classList.add("roll-button");
    rollBtn.innerHTML = "Roll dice!";
    diceDiv.appendChild(rollBtn);

    $(document).ready(function () {
        let dice1 = document.querySelector('.dice-one');
        let dice2 = document.querySelector('.dice-two');
        let rollBtn = document.querySelector('.roll-button');
        let currentClassOne = '';
        let currentClassTwo = '';

        function rollDice() {
            randNumOne = getRandomInt(1, 7);
            randNumTwo = getRandomInt(1, 7);

            let showClassOne = 'show-' + randNumOne;
            let showClassTwo = 'show-' + randNumTwo;

            if (currentClassOne) {
                dice1.classList.remove(currentClassOne);
            }
            if (currentClassTwo) {
                dice2.classList.remove(currentClassTwo);
            }
            dice1.classList.add(showClassOne);
            dice2.classList.add(showClassTwo);
            currentClassOne = showClassOne;
            currentClassTwo = showClassTwo;
            if(randNumOne === randNumTwo) {
                reRenderPieces(whites, blacks);
                selectPieceToMove(4);

            } else {
                reRenderPieces(whites, blacks);
                selectPieceToMove(2);
            }
        }
        rollBtn.addEventListener("click", rollDice);
    });

}

function selectPieceToMove(numberOfDiceUsed) {
    let currentPieceToMove;
    $(".div-set").click(function () {
        let myClass = $(this).closest('[class$="triangles"]');
        let divColor = $(this).children().get(0);
        let color = $(divColor).attr("class");
        if (color.substr(0, 5) === "white") {
            currentPieceToMove = {color: "white", columnNumber: myClass.get(0).id}
        } else {
            currentPieceToMove = {color: "black", columnNumber: myClass.get(0).id}
        }
        switch (numberOfDiceUsed) {
            case 4:
                movePiece(randNumOne, currentPieceToMove);
                numberOfDiceUsed--;
                console.log("numberOfDiceUsed: " + numberOfDiceUsed);
                selectPieceToMove(numberOfDiceUsed);
                break;
            case 3:
                movePiece(randNumOne, currentPieceToMove);
                numberOfDiceUsed--;
                console.log("numberOfDiceUsed: " + numberOfDiceUsed);
                selectPieceToMove(numberOfDiceUsed);
                break;
            case 2:
                movePiece(randNumOne, currentPieceToMove);
                console.log("dice 1 used");
                numberOfDiceUsed--;
                console.log("numberOfDiceUsed: " + numberOfDiceUsed);
                selectPieceToMove(numberOfDiceUsed);
                break;
            case 1:
                movePiece(randNumTwo, currentPieceToMove);
                console.log("dice 2 used");
                numberOfDiceUsed--;
                console.log("numberOfDiceUsed: " + numberOfDiceUsed);
                selectPieceToMove(numberOfDiceUsed);
                break;
            case 0:
                break;

        }
    });
}

function movePiece(diceValue, currentPieceToMove) {
    console.log("this piece was selected " + currentPieceToMove.color + ' ' +
        currentPieceToMove.columnNumber + ' ' + diceValue);
    let columnNumber;
    switch (currentPieceToMove.color) {
        case "white":
            columnNumber = currentPieceToMove.columnNumber.substr(7);
            whites[columnNumber]--;
            whites[Number(columnNumber) + Number(diceValue)]++;
            reRenderPieces(whites, blacks);
             break;
        case "black":
            columnNumber = currentPieceToMove.columnNumber.substr(7);
            blacks[columnNumber]--;
            blacks[Number(columnNumber) - Number(diceValue)]++;
            reRenderPieces(whites, blacks);
            break;
    }
}

function clearTable() {
    tableDiv.remove();
}

function clearMain() {
    mainDiv.remove();
}

function clickStart() {
    // clearMain();
    startGame();
    drawTable();
    initialState();
    createDiceButton();
}

function main() {
    clickStart();
}

main();