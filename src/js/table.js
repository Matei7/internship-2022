import "../css/style-table.scss";
import $ from "jquery";

let mainDiv, top, tableDiv, gameInfoDIV, piecesOutDiv, whitePiecesTakenOut, blackPiecesTakenOut, gameInfoText,
    topButtons;
let startBtn, rollBtn;
let blacksOut = 0, whitesOut = 0;
let whiteTurn = false;
let whites, blacks;
const WHITE = "white";
const BLACK = "black";
let emailInput, signInBtn, loadGameBtn, saveStateBtn;
let userLoggedIn = false;
let diceDiv, divElement;
let dice1, dice2;
let dices = [];
let whiteFlag = false;

let selectedPieceColor, pieceColor;
let selectedColumnToReEnter, endIndex, startIndex;

function renderGame() {
    mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", "main");
    document.body.appendChild(mainDiv);

    top = document.createElement('div');
    top.classList.add("top");
    mainDiv.appendChild(top);

    topButtons = document.createElement('div');
    topButtons.classList.add("top-buttons");
    mainDiv.appendChild(topButtons);

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

    emailInput = document.createElement('input');
    emailInput.classList.add("email-input");
    emailInput.setAttribute("id", "email");
    emailInput.placeholder = "Email";
    emailInput.setAttribute("type", "text");
    topButtons.appendChild(emailInput);

    signInBtn = document.createElement("button");
    signInBtn.classList.add("log-button");
    signInBtn.innerHTML = "Sign in";
    topButtons.appendChild(signInBtn);
    signInBtn.addEventListener("click", signInUser);

    loadGameBtn = document.createElement("button");
    loadGameBtn.classList.add("load-button");
    loadGameBtn.innerHTML = "Load game";
    topButtons.appendChild(loadGameBtn);
    loadGameBtn.addEventListener("click", loadGame);

    saveStateBtn = document.createElement("button");
    saveStateBtn.classList.add("save-state-button");
    saveStateBtn.innerHTML = "Save state";
    topButtons.appendChild(saveStateBtn);
    saveStateBtn.addEventListener("click", saveStateOfGame);

    drawTable();
}

function signInUser() {
    let url = "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/user";
    let emailObject = {email: $('.email-input').val()}
    $.ajax({
        method: "POST",
        url: url,
        data: emailObject,
        success: !userLoggedIn
    }).done(function () {
        alert("Data saved: " + emailObject.email);
    });
    userLoggedIn = true;
    localStorage.setItem('myCat', 'Tom');
}

function saveStateOfGame() {
    let url = "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data";
    $.ajax({
        method: "POST",
        url: url,
        data: {
            "email": $('.email-input').val(),
            "key": "table",
            timestamp: "table-game",
            data: {
                "whites": whites,
                "blacks": blacks,
                "whiteTurn": whiteTurn,
                "blacksOut": blacksOut,
                "whitesOut": whitesOut,
            }
        }
    }).done(function () {
        alert("Data saved...");
    });
}

function loadGame() {
    let url = "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data";
    $.ajax({
        method: "GET",
        url: url,
        data: {
            "email": $('.email-input').val(),
            "key": "table",
            timestamp: "table-game"
        }
    }).done(function (response) {
        console.log(response.data);
        renderPiecesFromServer(response);
    });
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
}

function drawPiece(numberOfPieces, columnIndex, color) {
    for (let index = 0; index < numberOfPieces; index++) {
        const circleDiv = document.createElement("div");
        circleDiv.classList.add(color + "-pieces");
        circleDiv.setAttribute("id", color + "-piece-" + index);
        document.getElementById("set-" + columnIndex).appendChild(circleDiv);
    }
}

function renderPieces() {
    whites.forEach((nr, index) => drawPiece(nr, index, WHITE));
    blacks.forEach((nr, index) => drawPiece(nr, index, BLACK));
}

function renderPiecesFromServer(response) {
    whites = response.data[0].value.whites;
    blacks = response.data[0].value.blacks;
    whiteTurn = response.data[0].value.whiteTurn;
    blacksOut = response.data[0].value.blacksOut;
    whitesOut = response.data[0].value.whitesOut;
    whitePiecesTakenOut.textContent = "Whites out: " + whitesOut;
    blackPiecesTakenOut.textContent = "Blacks out: " + blacksOut;

    clearTable();
    drawTable();
    renderPieces();
    toggleColorToMove();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function checkIfAllInHome(color) {
    if (color === "white") {
        for (let i = 0; i < 18; i++) {
            if (whites[i] === 0) {
                whiteFlag = true;
            } else {
                whiteFlag = false;
                return;
            }
        }
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
    } else {
        for (let index = 0; index < 4; index++) {
            dices.push(dice1);
        }
    }
    whiteFlag = false;
    // checkIfAllInHome(WHITE);
    // if (whiteFlag === true) {
    //     console.log("all home");
    //     drawDices();
    //     takeOutPieces();
    // } else {
    //     drawDices();
    //     movePiece();
    // }
        drawDices();
        movePiece();
}

// function takeOutPieces() {
//     if (dices.length !== 0) {
//         if (whiteTurn === true) {
//             $('[class$="triangles"]').click(function () {
//                 let selectedColumn = $(this).children().get(0);
//                 let selectedColumnId = $(selectedColumn).attr("id");
//                 let selectColumnToTakeOut = selectedColumnId.substr(4);
//                 console.log(dices + " " + selectColumnToTakeOut);
//                 if (dices.includes(24 - selectColumnToTakeOut) === true) {
//                     console.log("wtf")
//                     whites[selectColumnToTakeOut]--;
//                     if (allAreEqual(dices) === true) {
//                         dices.pop();
//                     } else {
//                         dices = handleSimpleDice(dices, (24 - selectColumnToTakeOut));
//                     }
//                     clearTable();
//                     drawTable();
//                     renderPieces();
//                     $('.black-pieces').addClass("disable-div");
//                     takeOutPieces();
//                 } else {
//                     movePiece();
//                     console.log(selectColumnToTakeOut);
//                     // let takeOutFlag=false;
//                     // for(let d=0; d<dices.length;d++) {
//                     //     if((23 - selectColumnToTakeOut) <= dices[d]) {
//                     //         takeOutFlag = true;
//                     //     } else {
//                     //         takeOutFlag = false;
//                     //     }
//                     // }
//                     // for(let i = 18; i < 24; i++) {
//                     //     if(whites[i] >= 1 && takeOutFlag === true) {
//                     //         whites[i]--;
//                     //         break;
//                     //     }
//                     // }
//                     // if(takeOutFlag===true) {
//                     //     clearTable();
//                     //     drawTable();
//                     //     renderPieces();
//                     //     $('.black-pieces').addClass("disable-div");
//                     // }
//                     console.log(dices);
//                     // takeOutPieces();
//                 }
//             });
//             let allWhitesOut = false;
//             for(let i = 0; i < 24; i++) {
//                 if(whites[i] === 0) {
//                     allWhitesOut = true;
//                 } else {
//                     allWhitesOut = false;
//                 }
//             }
//             if(allWhitesOut) {
//                 clearTable();
//                 alert("WHITE WON!");
//             }
//         }
//     }
// }

function drawDices() {
    clearMain();
    renderGame();
    renderPieces();
    toggleColorToMove();
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

function handleSimpleDice(arr, value) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
}

function allAreEqual(array) {
    const result = array.every(element => {
        if (element === array[0]) {
            return true;
        }
    });
    return result;
}

function movePiece() {
    let pieces = document.querySelectorAll('[class$="pieces"]');
    let columns = document.querySelectorAll('[class="div-set"]');

    let draggedPiece = null;

    if (dices.length !== 0) {
        if (whiteTurn === true && whitesOut > 0) {
            $('.white-pieces').addClass("disable-div");
            $('[class$="triangles"]').click(function () {
                let selectedColumn = $(this).children().get(0);
                let selectedColumnId = $(selectedColumn).attr("id");
                selectedColumnToReEnter = selectedColumnId.substr(4);

                let selectedColumnToReEnterTemp = +selectedColumnToReEnter + 1;
                if (selectedColumnToReEnter < 6 && blacks[selectedColumnToReEnter] <= 1) {
                    if (dices.includes(selectedColumnToReEnterTemp) === true) {
                        whites[selectedColumnToReEnter]++;
                        whitesOut--;
                        if (blacks[selectedColumnToReEnter] === 1) {
                            blacks[selectedColumnToReEnter]--;
                            blacksOut++;
                        }
                        if (allAreEqual(dices) === true) {
                            dices.pop();
                        } else {
                            dices = handleSimpleDice(dices, (endIndex - selectedColumnToReEnter));
                        }
                        clearTable();
                        drawTable();
                        renderPieces();
                        $('.white-pieces').addClass("disable-div");
                        $('.black-pieces').addClass("disable-div");
                    } else {
                        alert("Please insert your piece in the opponent house");
                    }
                }
            });
        } else if (whiteTurn === false && blacksOut > 0) {
            $('.black-pieces').addClass("disable-div");
            $('[class$="triangles"]').click(function () {
                let selectedColumn = $(this).children().get(0);
                let selectedColumnId = $(selectedColumn).attr("id");
                selectedColumnToReEnter = selectedColumnId.substr(4);
                console.log(selectedColumnToReEnter);
                if (selectedColumnToReEnter < 24 && selectedColumnToReEnter > 17 && whites[selectedColumnToReEnter] <= 1) {
                    if (dices.includes(24 - selectedColumnToReEnter) === true) {
                        blacks[selectedColumnToReEnter]++;
                        blacksOut--;
                        if (whites[selectedColumnToReEnter] === 1) {
                            whites[selectedColumnToReEnter]--;
                            whitesOut++;
                        }
                        if (allAreEqual(dices) === true) {
                            dices.pop();
                        } else {
                            dices = handleSimpleDice(dices, (selectedColumnToReEnter - endIndex));
                        }
                        clearTable();
                        drawTable();
                        renderPieces();
                        $('.white-pieces').addClass("disable-div");
                        $('.black-pieces').addClass("disable-div");
                    } else {
                        alert("Please insert your piece in the opponent house");
                    }
                }
            });
        } else {
            for (let i = 0; i < pieces.length; i++) {
                let piece = pieces[i];
                piece.addEventListener('dragstart', function () {
                    draggedPiece = piece;
                    let selectedColumn = $(this).closest('[class$="triangles"]').get(0);
                    let selectedColumnId = $(selectedColumn).attr("id");
                    startIndex = Number(selectedColumnId.substr(7));

                    selectedPieceColor = $(this).get(0);
                    pieceColor = $(selectedPieceColor).attr("class").substr(0, 5);
                    setTimeout(function () {
                        piece.style.display = 'none';
                    }, 0);
                });

                piece.addEventListener('dragend', function () {
                    setTimeout(function () {
                        piece.style.display = 'block';
                        draggedPiece = null;
                    }, 0);
                    console.log("in drag end" + startIndex + ' ' + endIndex);
                    if (pieceColor === "white" && startIndex < endIndex && dices.includes(endIndex - startIndex) === true) {
                        whites[startIndex]--;
                        whites[endIndex]++;
                        if (allAreEqual(dices) === true) {
                            dices.pop();
                        } else {
                            dices = handleSimpleDice(dices, (endIndex - startIndex));
                        }
                    }

                    if (pieceColor === "black" && startIndex > endIndex && dices.includes(startIndex - endIndex) === true) {
                        blacks[startIndex]--;
                        blacks[endIndex]++;
                        if (allAreEqual(dices) === true) {
                            dices.pop();
                        } else {
                            dices = handleSimpleDice(dices, (startIndex - endIndex));
                        }
                    }
                    clearTable();
                    drawTable();
                    renderPieces();
                    toggleColorToMove();
                    // takeOutPieces();
                    movePiece();
                });

                for (let j = 0; j < columns.length; j++) {
                    const column = columns[j];
                    column.addEventListener('dragover', function (e) {
                        e.preventDefault();
                    });

                    column.addEventListener('dragenter', function (e) {
                        e.preventDefault();
                    });

                    column.addEventListener('drop', function () {
                        // get index end
                        let selectedColumn = $(this).closest('[class$="triangles"]').get(0);
                        let selectedColumnId = $(selectedColumn).attr("id");
                        endIndex = Number(selectedColumnId.substr(7));
                        console.log(dices.includes(endIndex - startIndex));
                        if (startIndex < endIndex && pieceColor === "white" && dices.includes(endIndex - startIndex) === true) {
                            if (blacks[endIndex] === 0) {
                                this.append(draggedPiece);
                            }
                            if (blacks[endIndex] === 1) {
                                blacks[endIndex]--;
                                blacksOut++;
                                this.append(draggedPiece);
                            }
                            // if (whites[endIndex]>=0) {
                            //     whites[endIndex]++;
                            //     this.append(draggedPiece);
                            // }
                        }
                        if (pieceColor === "black" && startIndex > endIndex && dices.includes(startIndex - endIndex) === true) {
                            if (whites[endIndex] === 0) {
                                this.append(draggedPiece);
                            }
                            if (whites[endIndex] === 1) {
                                whites[endIndex]--;
                                whitesOut++;
                                this.append(draggedPiece);
                            }
                        }
                    });
                }
            }
        }
    }
}

function toggleColorToMove() {
    console.log("in toggle");
    if (whiteTurn === false) {
        $('.white-pieces').addClass("disable-div");
        console.log("turn black")
        gameInfoText.innerHTML = "Current turn: BLACK";
    } else {
        $('.black-pieces').addClass("disable-div");
        console.log("turn white")
        gameInfoText.innerHTML = "Current turn: WHITE";
    }
}

function clearTable() {
    console.log("clearing table");
    tableDiv.remove();
}

function clearMain() {
    mainDiv.remove();
}

function clickStart() {
    clearMain();
    renderGame();
    whites = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, 0];
    blacks = [0, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];
    // whites = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 3, 2];
    // blacks = [5, 0, 2, 3, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    whitesOut = 0;
    blacksOut = 0;
    renderPieces();
    gameInfoText.innerHTML = "ROLL THE DICE TO START!\nFIRST TO MOVE: WHITE";
}

function main() {
    renderGame();
}

main();