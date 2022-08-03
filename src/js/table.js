import "../css/style-table.scss";
import $ from "jquery";

let mainDiv, top, tableDiv, gameInfoDIV, piecesOutDiv, whitePiecesTakenOut, blackPiecesTakenOut, gameInfoText;
let startBtn, rollBtn;
let blacksOut = 0, whitesOut = 0;
let whiteTurn = false;
let whites, blacks;
const WHITE = "white";
const BLACK = "black";

let diceDiv, divElement;
let dice1, dice2;
let dices = [];

let selectedPieceColor, pieceColor;
let startIndex, endIndex;

function renderGame() {
    mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", "main");
    document.body.appendChild(mainDiv);

    top = document.createElement('div');
    top.classList.add("top");
    mainDiv.appendChild(top);

    gameInfoDIV = document.createElement('div');
    gameInfoDIV.classList.add("game-info");
    mainDiv.appendChild(gameInfoDIV);

    piecesOutDiv = document.createElement('div');
    piecesOutDiv.classList.add("pieces-out");
    gameInfoDIV.appendChild(piecesOutDiv);

    whitePiecesTakenOut = document.createElement('p');
    whitePiecesTakenOut.classList.add("white-pieces-taken");
    piecesOutDiv.appendChild(whitePiecesTakenOut);
    whitePiecesTakenOut.textContent = "Whites out: " + whitesOut;

    blackPiecesTakenOut = document.createElement('p');
    blackPiecesTakenOut.classList.add("black-pieces-taken");
    piecesOutDiv.appendChild(blackPiecesTakenOut);
    blackPiecesTakenOut.textContent = "Blacks out: " + blacksOut;

    gameInfoText = document.createElement('p');
    gameInfoText.classList.add("game-info-text");
    gameInfoDIV.appendChild(gameInfoText);
    // gameInfoText.textContent = "ROLL THE DICE TO START!\nFIRST TO MOVE: WHITE";

    startBtn = document.createElement("button");
    startBtn.classList.add("start-button");
    startBtn.innerHTML = "Start new game";
    top.appendChild(startBtn);
    startBtn.addEventListener('click', clickStart);

    diceDiv = document.createElement('div');
    diceDiv.classList.add('dice-container');
    top.appendChild(diceDiv);

    rollBtn = document.createElement("button");
    rollBtn.classList.add("roll-button");
    rollBtn.innerHTML = "Roll dice!";
    diceDiv.appendChild(rollBtn);

    rollBtn.addEventListener("click", rollDice);

    drawTable();
    for (let i = 0; i < 24; i++) {
        divElement = document.createElement('div');
        divElement.classList.add('div-set');
        divElement.setAttribute("id", "set-" + i);
        document.getElementById("column-" + i).appendChild(divElement);

        if (i > 11) {
            divElement.style.bottom = '0';
            divElement.style.position = 'absolute';
            divElement.style.flexDirection = 'column-reverse';
            divElement.style.height = '400px';
            divElement.style.width = '100px';
        }
    }
    // reRenderPieces(whites, blacks);
}

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
    for (let index = 0; index < numberOfPieces; index++) {
        const circleDiv = document.createElement("div");
        circleDiv.classList.add(color + "-pieces");
        circleDiv.setAttribute("id", color + "-piece-" + index);
        document.getElementById("set-" + columnIndex).appendChild(circleDiv);
    }
}

function initialState() {
    whites = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, 0];
    blacks = [0, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];

    whites.forEach((nr, index) => drawPiece(nr, index, WHITE));
    blacks.forEach((nr, index) => drawPiece(nr, index, BLACK));
}

// function reRenderPieces(whites, blacks) {
//     clearTable();
//     drawTable();
//     whites.forEach((nr, index) => drawPiece(nr, index, WHITE));
//     blacks.forEach((nr, index) => drawPiece(nr, index, BLACK));
// }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function drawDices() {
    clearMain();
    renderGame();
    initialState();
    for (let index = 1; index <= dices.length; index++) {
        let currentDiceToDraw = document.createElement('div');
        currentDiceToDraw.classList.add('dice-' + index);
        console.log('dice-' + index);
        diceDiv.appendChild(currentDiceToDraw);
        for (let i = 1; i <= 6; i++) {
            let eachDiv = document.createElement('div');
            eachDiv.classList.add('dice-face', 'dice-face-' + i);
            eachDiv.innerHTML = i.toString();
            currentDiceToDraw.appendChild(eachDiv);
        }
    }

    for (let index = 1; index <= dices.length; index++) {
        let currentClass = '';
        let currentDice = document.querySelector('.dice-' + index);
        let showCurrentClass = 'show-' + dices[index - 1];
        if (currentClass) {
            currentDice.classList.remove(currentClass);
        }
        currentDice.classList.add(showCurrentClass);
        currentClass = showCurrentClass;
    }
}

function rollDice() {
    whiteTurn = !whiteTurn;
    dice1 = getRandomInt(1, 7);
    dice2 = getRandomInt(1, 7);
    dices = [];
    if (dice1 !== dice2) {
        dices.push(dice1);
        dices.push(dice2);
        console.log(dices);
    } else {
        for (let index = 0; index < 4; index++) {
            dices.push(dice1);
        }
        console.log(dices);
    }
    drawDices();
    movePiece();
}

// move piece and also get indexes: start and end
function movePiece() {
    let pieces = document.querySelectorAll('[class$="pieces"]');
    let columns = document.querySelectorAll('[class="div-set"]');

    let draggedPiece = null;

    for (let i = 0; i < pieces.length; i++) {
        let piece = pieces[i];

        piece.addEventListener('dragstart', function () {
            draggedPiece = piece;

            // get index start
            let selectedColumn = $(this).closest('[class$="triangles"]').get(0);
            let selectedColumnId = $(selectedColumn).attr("id");
            startIndex = Number(selectedColumnId.substr(7));

            // get color of selected piece
            selectedPieceColor = $(this).get(0);
            pieceColor = $(selectedPieceColor).attr("class");
            setTimeout(function () {
                piece.style.display = 'none';
            }, 0);
            console.log("Start index = " + startIndex);
            console.log("Whites before =" + whites);
            console.trace();
            return startIndex;
        });

        piece.addEventListener('dragend', function () {
            // get index end
            let selectedColumn = $(this).closest('[class$="triangles"]').get(0);
            let selectedColumnId = $(selectedColumn).attr("id");
            endIndex = Number(selectedColumnId.substr(7));
            setTimeout(function () {
                piece.style.display = 'block';
                draggedPiece = null;
            }, 0);
            whites[startIndex]--;
            whites[Number(endIndex)]++;
            console.log("End index = " + endIndex);
            console.log("Whites =" + whites);
            return endIndex;
        });

        for (let j = 0; j < columns.length; j++) {
            const column = columns[j];
            column.addEventListener('dragover', function (e) { e.preventDefault(); });

            column.addEventListener('dragenter', function (e) { e.preventDefault(); });

            column.addEventListener('drop', function () { this.append(draggedPiece); });
        }
    }
}

function toggleColorToMove() {
    if (!whiteTurn) {
        $('.white-pieces').addClass("disable-div");
        gameInfoText.textContent = "Current turn: BLACK";
    } else {
        $('.black-pieces').addClass("disable-div");
        gameInfoText.textContent = "Current turn: WHITE";
    }
}

// function selectPieceToMove(numberOfDiceUsed) {
//     let currentPieceToMove;
//     toggleColorToMove();
//     $(".div-set").click(function () {
//         let myClass = $(this).closest('[class$="triangles"]');
//         let divColor = $(this).children().get(0);
//         let color = $(divColor).attr("class");
//         if (color.substr(0, 5) === "white") {
//             currentPieceToMove = {color: "white", columnNumber: myClass.get(0).id}
//         } else {
//             currentPieceToMove = {color: "black", columnNumber: myClass.get(0).id}
//         }
//
//         startIndex = currentPieceToMove.columnNumber.substr(7);
//
//         if (currentPieceToMove.color === "white") {
//             if (whitesOut >= 1) {
//                 gameInfoText.textContent = "\nChoose where to insert your piece back in game";
//                 reEnterPiece(currentPieceToMove.color);
//             } else if (blacks[Number(startIndex) + Number(randNumOne)] === 0 && numberOfDiceUsed > 1) {
//                 switch (numberOfDiceUsed) {
//                     case 4:
//                         movePiece(randNumOne, currentPieceToMove);
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         selectPieceToMove(numberOfDiceUsed);
//                         break;
//                     case 3:
//                         movePiece(randNumOne, currentPieceToMove);
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         selectPieceToMove(numberOfDiceUsed);
//                         break;
//                     case 2:
//                         movePiece(randNumOne, currentPieceToMove);
//                         console.log("dice 1 used");
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         selectPieceToMove(numberOfDiceUsed);
//                         break;
//                 }
//             } else if (blacks[Number(startIndex) + Number(randNumTwo)] === 0) {
//                 switch (numberOfDiceUsed) {
//                     case 1:
//                         movePiece(randNumTwo, currentPieceToMove);
//                         console.log("dice 2 used");
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         selectPieceToMove(numberOfDiceUsed);
//                         gameInfoText.textContent += "\nROLL DICE TO TURN BLACK";
//                         break;
//                     case 0:
//                         break;
//                 }
//             } else if (blacks[Number(startIndex) + Number(randNumOne)] === 1) {
//                 switch (numberOfDiceUsed) {
//                     case 2:
//                         movePiece(randNumOne, currentPieceToMove);
//                         console.log("dice 1 used");
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         console.log("luata o piesa");
//                         blacks[Number(startIndex) + Number(randNumOne)]--;
//                         reRenderPieces(whites, blacks);
//                         blacksOut++;
//                         blackPiecesTakenOut.textContent = "Blacks out: " + blacksOut;
//                         selectPieceToMove(numberOfDiceUsed);
//                         break;
//                 }
//             } else {
//                 switch (numberOfDiceUsed) {
//                     case 1:
//                         movePiece(randNumTwo, currentPieceToMove);
//                         console.log("dice 1 used");
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         console.log("luata inca o piesa");
//                         blacks[Number(startIndex) + Number(randNumTwo)]--;
//                         reRenderPieces(whites, blacks);
//                         blacksOut++;
//                         blackPiecesTakenOut.textContent = "Blacks out: " + blacksOut;
//                         selectPieceToMove(numberOfDiceUsed);
//                         break;
//                 }
//             }
//         }
//
//
//         if (currentPieceToMove.color === "black") {
//             if (blacksOut >= 1) {
//                 gameInfoText.textContent = "\nChoose where to insert your piece back in game";
//                 reEnterPiece(currentPieceToMove.color);
//
//             } else if (whites[Number(startIndex) - Number(randNumOne)] === 0 && numberOfDiceUsed > 1) {
//                 switch (numberOfDiceUsed) {
//                     case 4:
//                         movePiece(randNumOne, currentPieceToMove);
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         selectPieceToMove(numberOfDiceUsed);
//                         break;
//                     case 3:
//                         movePiece(randNumOne, currentPieceToMove);
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         selectPieceToMove(numberOfDiceUsed);
//                         break;
//                     case 2:
//                         movePiece(randNumOne, currentPieceToMove);
//                         console.log("e nebun");
//                         console.log("dice 1 used");
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         selectPieceToMove(numberOfDiceUsed);
//                         break;
//                 }
//             } else if (whites[Number(startIndex) - Number(randNumTwo)] === 0) {
//                 console.log("here " + numberOfDiceUsed);
//                 switch (numberOfDiceUsed) {
//                     case 1:
//                         movePiece(randNumTwo, currentPieceToMove);
//                         console.log("dice 2 used");
//                         numberOfDiceUsed--;
//                         console.log("numberOfDiceAvailable: " + numberOfDiceUsed);
//                         selectPieceToMove(numberOfDiceUsed);
//                         gameInfoText.textContent += "\nROLL DICE TO TURN WHITE";
//                         break;
//                     case 0:
//                         break;
//                 }
//             }
//         }
//     });
// }

// function reEnterPiece(color) {
//     if (color === "black") {
//         console.log("choose where to reEnter the piece");
//         $('[class$="triangles"]').click(function () {
//             let selectedColumn = $(this).children().get(0);
//             let selectedColumnId = $(selectedColumn).attr("id");
//             startIndex = selectedColumnId.substr(4);
//             console.log(startIndex);
//             if (startIndex > 18 && whites[startIndex] === 0) {
//                 console.log("plm");
//                 if ((24 - randNumOne).toString() === startIndex) {
//                     console.log("reenter 1");
//                     blacks[24 - randNumOne]++;
//                     blacksOut--;
//                     blackPiecesTakenOut.textContent = "Blacks out: " + blacksOut;
//                     reRenderPieces(whites, blacks);
//                 } else if (whites[24 - randNumTwo] === 0 && (24 - randNumTwo).toString() === startIndex) {
//                     console.log("reenter 2");
//                     blacks[24 - randNumTwo]++;
//                     blacksOut--;
//                     blackPiecesTakenOut.textContent = "Blacks out: " + blacksOut;
//                     reRenderPieces(whites, blacks);
//                 }
//             } else {
//                 gameInfoText.textContent = "Please choose a place in the opponent home...";
//             }
//         });
//     }
// }


// function movePiece(diceValue, currentPieceToMove) {
//     switch (currentPieceToMove.color) {
//         case "white":
//             startIndex = currentPieceToMove.columnNumber.substr(7);
//             if (blacks[Number(startIndex) + Number(diceValue)] > 1) {
//                 break;
//             } else {
//                 whites[startIndex]--;
//                 whites[Number(startIndex) + Number(diceValue)]++;
//                 reRenderPieces(whites, blacks);
//                 break;
//             }
//         case "black":
//             startIndex = currentPieceToMove.columnNumber.substr(7);
//             blacks[startIndex]--;
//             blacks[Number(startIndex) - Number(diceValue)]++;
//             reRenderPieces(whites, blacks);
//             break;
//     }
// }

function clearDices() {
    diceDiv.remove();
}

function clearTable() {
    tableDiv.remove();
}

function clearMain() {
    mainDiv.remove();
}

function clickStart() {
    clearMain();
    renderGame();
    initialState();
    // movePiece();

}


function main() {
    renderGame();
    // while(true) {
    //     rollDice();
    // }
}

main();