//import $ from "jquery"
let highlightedPiece = null;
let dragSrcEl = null;
let rows = 8;
let columns = 8;
let matrixTable1 = [];
let matrixTable2 = [];
initializeMatrix2(8, 8);
let piecesPositions = {};
let moveRandomPieceInterval;
let moveRandomPieceIntervalTimeout = 10000;
let loggedIn = false;
let email = null;
let noOfRemainingShipCellsToBeShotAtPlayer1 =  17;
let noOfRemainingShipCellsToBeShotAtPlayer2 =  17;

const newPElement = document.createElement('p');
const appElement = document.getElementById('app');
appElement.appendChild(newPElement);
var count = 0;
function displayCountdown()
{
    if(count != 3)
    {
        appElement.children[1].innerText = 3 - count;
        count++;
    }
    else
    {
        appElement.removeChild(newPElement);
        clearInterval(countdown);
    }
}
const countdown = setInterval(displayCountdown, 1000);

const newGameButton = document.createElement('button');
newGameButton.setAttribute('type', "button");
newGameButton.innerText = "New Game";
newGameButton.id="newgamebutton";
appElement.appendChild(newGameButton);

function createDivElementInElement(className, parentElement)
{
    const newDivElement = document.createElement('div');
    newDivElement.classList.add(className);
    parentElement.appendChild(newDivElement);
    return newDivElement;
}

function movePiece()
{
    let sizeOfPiece = getSizeOfPiece(highlightedPiece);
    let pieceIndex = getPieceIndex(highlightedPiece);
    if(sizeOfPiece + parseInt(this.dataset.column) - 1 >= columns)
    {
        return false;
    }
    for(let i = 0; i < sizeOfPiece; i++)
    {
        if(matrixTable2[this.dataset.row][parseInt(this.dataset.column)+i] != 0 && matrixTable2[this.dataset.row][parseInt(this.dataset.column)+i] != pieceIndex)
        {
            return false;
        }
    }
    let parent = highlightedPiece.parentElement;
    if(parent.dataset !== undefined && parent.dataset.row !== undefined && parent.dataset.column !== undefined)
    {
        for(let i = 0; i < sizeOfPiece; i++)
        {
            matrixTable2[parent.dataset.row][parseInt(parent.dataset.column)+i] = 0;
        }
    }
    for(let i = 0; i < sizeOfPiece; i++)
    {
        matrixTable2[this.dataset.row][parseInt(this.dataset.column)+i] = pieceIndex;
    }
    highlightedPiece.parentElement.removeChild(highlightedPiece);
    this.appendChild(highlightedPiece);
    highlightedPiece.style.setProperty('filter', 'unset');
    highlightedPiece.dataset.highlight = "no";
    piecesPositions[pieceIndex] = {key: pieceIndex, row : this.dataset.row, column : this.dataset.column};
    //localStorage.setItem("positions", JSON.stringify(piecesPositions));
    saveGameEventHandler();
    highlightedPiece = null;
    restartTimerForMoveRandomPiece();
    return true;
}

function createDivElementsInElement(numberOfDivElements, className, parentElement)
{
    let newDivElements = [];
    for (let i = 0; i < numberOfDivElements; i++)
    {
        newDivElements[i] = document.createElement('div');
        newDivElements[i].classList.add(className);
        parentElement.appendChild(newDivElements[i]);
        newDivElements[i].dataset.row = parseInt(i / 8);
        newDivElements[i].dataset.column = i % 8;
        newDivElements[i].style.setProperty("position", "relative");
        if(className == 'cellClass2') {
            newDivElements[i].addEventListener("click", movePiece);
            newDivElements[i].addEventListener('dragover', handleDragOver);
            newDivElements[i].addEventListener('drop', handleDrop);
        }
    }
    return newDivElements;
}

function generateTable(tableClassName, cellsClassName, parentElement, numberOfCells)
{
    const divTable = createDivElementInElement(tableClassName, parentElement);
    let divCells = createDivElementsInElement(numberOfCells, cellsClassName, divTable);
    return divTable;
}

const divTable1 = generateTable('tableClass', 'cellClass', appElement, 64);

function highlightPiece(e)
{
    if(highlightedPiece != this)
    {
        e.stopPropagation();
        this.style.setProperty('filter', 'saturate(300%)');
        this.dataset.highlight = "highlight";
        if (highlightedPiece != null) {
            highlightedPiece.style.setProperty('filter', 'unset');
            highlightedPiece.dataset.highlight = "no";
        }
        highlightedPiece = this;
    }
}

function handleDragStart(e)
{
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
}
function handleDragEnd()
{
    this.style.opacity = '1';
}
function handleDragOver(e) {
    e.preventDefault();
    return false;
}
function getSizeOfPiece(piece)
{
    let className = piece.classList[0];
    switch (className)
    {
        case "piece0" : return 2;
        case "piece1" : return 3;
        case "piece2" : return 3;
        case "piece3" : return 4;
        case "piece4" : return 5;
        default : return 0;
    }
}
function getPieceIndex(piece)
{
    let className = piece.classList[0];
    switch (className)
    {
        case "piece0" : return 1;
        case "piece1" : return 2;
        case "piece2" : return 3;
        case "piece3" : return 4;
        case "piece4" : return 5;
        default : return 0;
    }
}
function handleDrop(e)
{
    e.stopPropagation();

    if (dragSrcEl !== this)
    {
        let sizeOfPiece = getSizeOfPiece(dragSrcEl);
        let pieceIndex = getPieceIndex(dragSrcEl);
        if(sizeOfPiece + parseInt(this.dataset.column) - 1 >= columns)
        {
            return false;
        }
        for(let i = 0; i < sizeOfPiece; i++)
        {
            if(matrixTable2[this.dataset.row][parseInt(this.dataset.column)+i] != 0 && matrixTable2[this.dataset.row][parseInt(this.dataset.column)+i] != pieceIndex)
            {
                return false;
            }
        }
        let parent = dragSrcEl.parentElement;
        this.appendChild(dragSrcEl);
        if(parent.dataset !== undefined && parent.dataset.row !== undefined && parent.dataset.column !== undefined)
        {
            for(let i = 0; i < sizeOfPiece; i++)
            {
                matrixTable2[parent.dataset.row][parseInt(parent.dataset.column)+i] = 0;
            }
        }
        for(let i = 0; i < sizeOfPiece; i++)
        {
            matrixTable2[this.dataset.row][parseInt(this.dataset.column)+i] = pieceIndex;
        }
        piecesPositions[pieceIndex] = {key: pieceIndex, row : this.dataset.row, column : this.dataset.column};
        //localStorage.setItem("positions", JSON.stringify(piecesPositions));
        saveGameEventHandler();
        restartTimerForMoveRandomPiece();
    }
    return false;
}

function generatePieces(numberOfPieces, piecesClassName, pieceId, parentElement, loadGame)
{
    const piecesElement = createDivElementInElement(piecesClassName, parentElement);
    let pieceElements = [];
    for(let i = 0; i < numberOfPieces; i++)
    {
        let newPieceId = pieceId + i;
        pieceElements[i] = createDivElementInElement(newPieceId, piecesElement);
        const image = document.createElement('img');
        let value = '../images/' + pieceId + i + '.gif';
        image.setAttribute(
            'src',
            value,
        );
        pieceElements[i].addEventListener("click", highlightPiece);
        pieceElements[i].draggable = "true";
        pieceElements[i].addEventListener("dragstart", handleDragStart);
        pieceElements[i].addEventListener("dragend", handleDragEnd);
        pieceElements[i].dataset.rotation = "horizontal";
        pieceElements[i].appendChild(image);
    }
    moveRandomPieceInterval = setInterval(moveRandomPiece, moveRandomPieceIntervalTimeout);
    email = localStorage.getItem("email");
    if(email != null)
    {
        $('#email').val(email);
        loggedIn = true;
        if(loadGame == true)
        {
            loadGameEventHandler();
        }
    }
    return pieceElements;
}

const divTable2 = generateTable('tableClass2', 'cellClass2', appElement, 64);

function getShipClassByKey(key)
{
    switch (key)
    {
        case 1: return "piece0";
        case 2: return "piece1";
        case 3: return "piece2";
        case 4: return "piece3";
        case 5: return "piece4";
    }
}

//let pieceElements = generatePieces(5, 'piecesClass', 'piece', divTable2);
function callGeneratePieces()
{
    generatePieces(5, 'piecesClass', 'piece', divTable2, true);
    /*let parsed = JSON.parse(localStorage.getItem("positions"));
    if(parsed != null) {
        piecesPositions = Object.values(parsed);
        for (let i = 0; i < piecesPositions.length; i++) {
            if(piecesPositions[i] != null) {
                console.log(piecesPositions[i]);
                let className = getShipClassByKey(piecesPositions[i].key);
                let elem = document.getElementsByClassName(className)[0];
                elem.dispatchEvent(new Event('click'));
                let rowElem = piecesPositions[i].row;
                let colElem = piecesPositions[i].column;
                let divElem = $(`.cellClass2[data-row="${rowElem}"][data-column="${colElem}"]`)[0];
                divElem.dispatchEvent(new Event('click'));
            }
        }
    }*/
    generateMatrixTable1();
    //localStorage.clear();
}
setTimeout(callGeneratePieces, 3000);

function generateNewGame()
{
    for(let i = 0; i < piecesPositions.length; i++)
    {
        piecesPositions[i] = null;
    }
    while(appElement.children.length > 1)
    {
        appElement.removeChild(appElement.children[1]);
    }
    piecesPositions = {};
    initializeMatrix2(8, 8);
    appElement.appendChild(newGameButton);
    $("#newgamebutton").after($('<input/>').attr({ type: 'text', id: 'email', name: 'email', placeholder: 'Email' }));
    $("#email").after($('<button/>').prop({ type: 'button', innerHTML: 'Register', id: 'registerbutton' }));
    //$("#registerbutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Save Game', id: 'savegamebutton' }));
    //$("#savegamebutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Load Game', id: 'loadgamebutton' }));
    $("#registerbutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Log in', id: 'loginbutton' }));
    $("#loginbutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Load game', id: 'loadgamebutton' }));
    $("#loadgamebutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Start game', id: 'startgamebutton' }));
    $("#startgamebutton").click(startShooting);
    highlightedPiece = null;
    dragSrcEl = null;
    const divTable1 = generateTable('tableClass', 'cellClass', appElement, 64);
    const divTable2 = generateTable('tableClass2', 'cellClass2', appElement, 64);
    generatePieces(5, 'piecesClass', 'piece', divTable2, false);
    generateMatrixTable1();
    email = localStorage.getItem("email");
    if(email != null)
    {
        $('#email').val(email);
        loggedIn = true;
    }
    addMovingHandlersRemoveShootingHandlers();
}

newGameButton.addEventListener("click", generateNewGame);

function initializeMatrix2(numberOfRows, numberOfCols)
{
    for(let i = 0; i < numberOfRows; i++)
    {
        matrixTable2[i] = [];
        for(let j = 0; j < numberOfCols; j++)
        {
            matrixTable2[i][j] = 0;
        }
    }
}

function initializeMatrix1(numberOfRows, numberOfCols)
{
    for(let i = 0; i < numberOfRows; i++)
    {
        matrixTable1[i] = [];
        for(let j = 0; j < numberOfCols; j++)
        {
            matrixTable1[i][j] = 0;
        }
    }
}

function rotate(piece)
{
    if(piece != null)
    {
        if (piece.dataset.rotation == "horizontal")
        {
            piece.dataset.rotation = 'vertical';
            piece.children[0].style.setProperty('transform', 'rotate(90deg)');
        }
        else
        {
            piece.dataset.rotation = 'horizontal';
            piece.children[0].style.setProperty('transform', 'rotate(0deg)');
        }
    }
}

function movePieceByKeyboardHelper(row, col)
{
    let highlightedPieceParent = $(highlightedPiece).parent();
    let rowVal = parseInt(highlightedPieceParent.attr("data-row"));
    let colVal = parseInt(highlightedPieceParent.attr("data-column"));
    rowVal += row;
    colVal += col;
    let divElem = $(`.cellClass2[data-row="${rowVal}"][data-column="${colVal}"]`);
    divElem.click();
    restartTimerForMoveRandomPiece();
}

function movePieceByKeyboard(direction)
{
    if(highlightedPiece != null) {
        if(highlightedPiece.parentElement.classList == "piecesClass"){
            document.getElementsByClassName("cellClass2")[0].dispatchEvent(new Event('click'));
            return;
        }
        switch (direction) {
            case "up" : {movePieceByKeyboardHelper(-1, 0); return;}
            case "left" : {movePieceByKeyboardHelper(0, -1); return;}
            case "down" : {movePieceByKeyboardHelper(1, 0); return;}
            case "right" : {movePieceByKeyboardHelper(0, 1); return;}
        }
    }
}

function handleKeyboard(e)
{
    const keyname = e.key;
    let className = null;
    switch (keyname)
    {
        case '1' : {className = "piece0"; break;}
        case '2' : {className = "piece1"; break;}
        case '3' : {className = "piece2"; break;}
        case '4' : {className = "piece3"; break;}
        case '5' : {className = "piece4"; break;}
        case 'r' : {rotate(highlightedPiece); return;}
        case 'w' : {movePieceByKeyboard("up"); return;}
        case 'a' : {movePieceByKeyboard("left"); return;}
        case 's' : {movePieceByKeyboard("down"); return;}
        case 'd' : {movePieceByKeyboard("right"); return;}
        default : return;
    }
    let piece = document.getElementsByClassName(className);
    piece[0].dispatchEvent(new Event('click'));
}
document.addEventListener('keydown', handleKeyboard);

$("#newgamebutton").after($('<input/>').attr({ type: 'text', id: 'email', name: 'email', placeholder: 'Email' }));
$("#email").after($('<button/>').prop({ type: 'button', innerHTML: 'Register', id: 'registerbutton' }));
function registerEventHandler()
{
    $.ajax({
        method: "POST",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/user",
        data: { email: $("#email").val() }
    }).done(function( msg ) {
        localStorage.setItem("email", $("#email").val());
        alert( "Registered: " + msg );
    });
}
$("#registerbutton").click(registerEventHandler);

//$("#registerbutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Save Game', id: 'savegamebutton' }));
function saveGameEventHandler()
{
    if($("#email").val() != "" && loggedIn) {
        $.ajax({
            method: "POST",
            url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data/",
            data: {
                "email": $("#email").val(),
                "key": "battleships",
                "data": {
                    "piecesPositions": piecesPositions,
                    "matrixTable1" : matrixTable1,
                    "matrixTable2" : matrixTable2,
                    "noOfRemainingShipCellsToBeShotAtPlayer1" : noOfRemainingShipCellsToBeShotAtPlayer1,
                    "noOfRemainingShipCellsToBeShotAtPlayer2" : noOfRemainingShipCellsToBeShotAtPlayer2
                },
                "timestamp": "hei"
            }
        }).fail(function (msg) {

        })
    }
}
//$("#savegamebutton").click(saveGameEventHandler);

//$("#savegamebutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Load Game', id: 'loadgamebutton' }));

function checkIfGameStarted()
{
    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < columns; j++)
        {
            if(matrixTable1[i][j] == 100 || matrixTable1[i][j] == 200)
            {
                return true;
            }
        }
    }
    return false;
}

function loadGameEventHandler()
{
    if($("#email").val() != "" && loggedIn) {
        let geturl = "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data/?email=" + $("#email").val() + "&key=battleships&timestamp=hei";
        $.ajax({
            method: "GET",
            url: geturl
        }).done(function (msg) {
            //let parsed = JSON.parse(msg)
            if (msg != null) {
                piecesPositions = {};
                let piecesPositionsTemp = Object.values(msg.data[0].value.piecesPositions);
                console.log(piecesPositionsTemp);
                for (let i = 0; i < piecesPositionsTemp.length; i++) {
                    if (piecesPositionsTemp[i] != null) {
                        console.log(piecesPositionsTemp[i]);
                        let className = getShipClassByKey(parseInt(piecesPositionsTemp[i].key));
                        let elem = document.getElementsByClassName(className)[0];
                        elem.dispatchEvent(new Event('click'));
                        let rowElem = piecesPositionsTemp[i].row;
                        let colElem = piecesPositionsTemp[i].column;
                        let divElem = $(`.cellClass2[data-row="${rowElem}"][data-column="${colElem}"]`)[0];
                        divElem.dispatchEvent(new Event('click'));
                    }
                }
                matrixTable1 = msg.data[0].value.matrixTable1;
                matrixTable2 = msg.data[0].value.matrixTable2;
                noOfRemainingShipCellsToBeShotAtPlayer1 = msg.data[0].value.noOfRemainingShipCellsToBeShotAtPlayer1;
                noOfRemainingShipCellsToBeShotAtPlayer2 = msg.data[0].value.noOfRemainingShipCellsToBeShotAtPlayer2;
                if (checkIfGameStarted())
                {
                    removeMovingHandlersAddShootingHandlers(64);
                    for(let i = 0; i < rows; i++)
                    {
                        for(let j = 0; j < 8; j++)
                        {
                            if(matrixTable1[i][j] == 100)
                            {
                                let shotCell = $(`.cellClass[data-row="${i}"][data-column="${j}"]`)[0];
                                const image = document.createElement('img');
                                image.id = "fireimg";
                                image.setAttribute(
                                    'src',
                                    '../images/fire.gif'
                                );
                                shotCell.appendChild(image);
                            }
                            if(matrixTable1[i][j] == 200)
                            {
                                let shotCell = $(`.cellClass[data-row="${i}"][data-column="${j}"]`)[0];
                                const image = document.createElement('img');
                                image.id = "missimg";
                                image.setAttribute(
                                    'src',
                                    '../images/miss.gif'
                                );
                                shotCell.appendChild(image);
                            }
                            if(matrixTable2[i][j] == 100)
                            {
                                let shotCell = $(`.cellClass2[data-row="${i}"][data-column="${j}"]`)[0];
                                const image = document.createElement('img');
                                image.id = "fireimg";
                                image.setAttribute(
                                    'src',
                                    '../images/fire.gif'
                                );
                                shotCell.appendChild(image);
                            }
                            if(matrixTable2[i][j] == 200)
                            {
                                let shotCell = $(`.cellClass2[data-row="${i}"][data-column="${j}"]`)[0];
                                const image = document.createElement('img');
                                image.id = "missimg";
                                image.setAttribute(
                                    'src',
                                    '../images/miss.gif'
                                );
                                shotCell.appendChild(image);
                            }
                        }
                    }
                }
            }
        });
    }
}
//$("#loadgamebutton").click(loadGameEventHandler);

function logInEventHandler()
{
    if($("#email").val() != "") {
        let geturl = "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data/?email=" + $("#email").val() + "&key=battleships&timestamp=hei";
        $.ajax({
            method: "GET",
            url: geturl
        }).done(function (msg) {
            loggedIn = true;
            localStorage.setItem("email", $("#email").val());
        }).fail(function (msg) {
            alert("Email not registered");
        });
    }
}

$("#registerbutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Log in', id: 'loginbutton' }));
$("#loginbutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Load game', id: 'loadgamebutton' }));
$("#loginbutton").click(logInEventHandler);
$("#loadgamebutton").click(loadGameEventHandler);


function canPieceMoveToCell(pieceToCheck, rowToCheck, colToCheck)
{
    let sizeOfPiece = getSizeOfPiece(pieceToCheck);
    let pieceIndex = getPieceIndex(pieceToCheck);
    if(sizeOfPiece + parseInt(colToCheck) - 1 >= columns)
    {
        return false;
    }
    for(let i = 0; i < sizeOfPiece; i++)
    {
        if(matrixTable2[rowToCheck][parseInt(colToCheck)+i] != 0 && matrixTable2[rowToCheck][parseInt(colToCheck)+i] != pieceIndex)
        {
            return false;
        }
    }
    return true;
}
function moveRandomPiece()
{
    let piecesClassChildren = $(".piecesClass > *");
    if(piecesClassChildren.length == 0)
    {
        clearInterval(moveRandomPieceInterval);
    }
    else {
        let ok = 0;
        let randomPieceIndex = Math.floor(Math.random() * piecesClassChildren.length);
        let randomPiece = piecesClassChildren[randomPieceIndex];
        while (!ok) {
            let randomRow = Math.floor(Math.random() * 8);
            let randomCol = Math.floor(Math.random() * 8);
            ok = canPieceMoveToCell(randomPiece, randomRow, randomCol);
            if (ok) {
                randomPiece.dispatchEvent(new Event('click'));
                let divElem = $(`.cellClass2[data-row="${randomRow}"][data-column="${randomCol}"]`);
                divElem.click();
            }
        }
    }
    //console.log(x);
}

function restartTimerForMoveRandomPiece()
{
    clearInterval(moveRandomPieceInterval);
    moveRandomPieceInterval = setInterval(moveRandomPiece, moveRandomPieceIntervalTimeout);
}

function canPieceMoveToCellPlayer1(sizeOfPiece, rowToCheck, colToCheck)
{
    if(sizeOfPiece + parseInt(colToCheck) - 1 >= columns)
    {
        return false;
    }
    for(let i = 0; i < sizeOfPiece; i++)
    {
        if(matrixTable1[rowToCheck][parseInt(colToCheck)+i] != 0)
        {
            return false;
        }
    }
    return true;
}

function generateMatrixTable1()
{
    initializeMatrix1(8, 8);
    let piecesSizesPlayer1 = [2, 3, 3, 4, 5];
    for(let i = 0; i < 5; i++) {
        let ok = 0;
        while (!ok) {
            let randomRow = Math.floor(Math.random() * 8);
            let randomCol = Math.floor(Math.random() * 8);
            ok = canPieceMoveToCellPlayer1(piecesSizesPlayer1[i], randomRow, randomCol);
            if (ok) {
                for(let j = 0; j < piecesSizesPlayer1[i]; j++)
                {
                    matrixTable1[randomRow][randomCol+j] = i+1;
                }
            }
        }
    }
}
console.log(matrixTable1);

$('#email').change( function () {loggedIn = false;} );

$("#loadgamebutton").after($('<button/>').prop({ type: 'button', innerHTML: 'Start game', id: 'startgamebutton' }));
$("#startgamebutton").click(startShooting);

function shootAtPlayer2()
{
    let shotRow = Math.floor(Math.random() * 8);
    let shotCol = Math.floor(Math.random() * 8);
    while(matrixTable2[shotRow][shotCol] == 100 || matrixTable2[shotRow][shotCol] == 200)
    {
        shotRow = Math.floor(Math.random() * 8);
        shotCol = Math.floor(Math.random() * 8);
    }
    let shotCell = $(`.cellClass2[data-row="${shotRow}"][data-column="${shotCol}"]`)[0];
    if(matrixTable2[shotRow][shotCol] != 0 && matrixTable2[shotRow][shotCol] != 100 && matrixTable2[shotRow][shotCol] != 200)
    {
        matrixTable2[shotRow][shotCol] = 100;
        const image = document.createElement('img');
        image.id = "fireimg";
        image.setAttribute(
            'src',
            '../images/fire.gif'
        );
        shotCell.appendChild(image);
        noOfRemainingShipCellsToBeShotAtPlayer2--;
        saveGameEventHandler();
        if(noOfRemainingShipCellsToBeShotAtPlayer2 == 0)
        {
            let divElementsPlayer1 = $(".cellClass");
            for (let i = 0; i < 64; i++)
            {
                divElementsPlayer1[i].removeEventListener("click", shootAtPlayer1);
            }
            alert("YOU LOSE!");
        }
    }
    else
    {
        if(matrixTable2[shotRow][shotCol] == 0)
        {
            matrixTable2[shotRow][shotCol] = 200;
            const image = document.createElement('img');
            image.id = "missimg";
            image.setAttribute(
                'src',
                '../images/miss.gif'
            );
            shotCell.appendChild(image);
            saveGameEventHandler();
        }
    }
}

function shootAtPlayer1()
{
    let shotRow = this.dataset.row;
    let shotCol = this.dataset.column;
    if(matrixTable1[shotRow][shotCol] != 0 && matrixTable1[shotRow][shotCol] != 100 && matrixTable1[shotRow][shotCol] != 200)
    {
        matrixTable1[shotRow][shotCol] = 100;
        const image = document.createElement('img');
        image.id = "fireimg";
        image.setAttribute(
            'src',
            '../images/fire.gif'
        );
        this.appendChild(image);
        noOfRemainingShipCellsToBeShotAtPlayer1--;
        if(noOfRemainingShipCellsToBeShotAtPlayer1 > 0)
        {
            shootAtPlayer2();
        }
        else
        {
            let divElementsPlayer1 = $(".cellClass");
            for (let i = 0; i < 64; i++)
            {
                divElementsPlayer1[i].removeEventListener("click", shootAtPlayer1);
            }
            alert("YOU WIN!");
        }
    }
    else
    {
        if(matrixTable1[shotRow][shotCol] == 0)
        {
            matrixTable1[shotRow][shotCol] = 200;
            const image = document.createElement('img');
            image.id = "missimg";
            image.setAttribute(
                'src',
                '../images/miss.gif'
            );
            this.appendChild(image);
            shootAtPlayer2();
        }
    }
}

function removeMovingHandlersAddShootingHandlers(numberOfCells)
{
    let divElementsPlayer1 = $(".cellClass");
    let divElementsPlayer2 = $(".cellClass2");
    for (let i = 0; i < numberOfCells; i++)
    {
        divElementsPlayer2[i].removeEventListener("click", movePiece);
        divElementsPlayer2[i].removeEventListener('dragover', handleDragOver);
        divElementsPlayer2[i].removeEventListener('drop', handleDrop);
        divElementsPlayer1[i].addEventListener("click", shootAtPlayer1);
    }
    let pieceElements = [];
    pieceElements[0] = $('.piece0')[0];
    pieceElements[1] = $('.piece1')[0];
    pieceElements[2] = $('.piece2')[0];
    pieceElements[3] = $('.piece3')[0];
    pieceElements[4] = $('.piece4')[0];
    for(let i = 0; i < 5; i++)
    {
        pieceElements[i].removeEventListener("click", highlightPiece);
        pieceElements[i].draggable = "false";
        pieceElements[i].removeEventListener("dragstart", handleDragStart);
        pieceElements[i].removeEventListener("dragend", handleDragEnd);
        //pieceElements[i].dataset.rotation = "horizontal";
    }
}

function addMovingHandlersRemoveShootingHandlers(numberOfCells)
{
    let divElementsPlayer1 = $(".cellClass");
    let divElementsPlayer2 = $(".cellClass2");
    for (let i = 0; i < numberOfCells; i++)
    {
        divElementsPlayer2[i].addEventListener("click", movePiece);
        divElementsPlayer2[i].addEventListener('dragover', handleDragOver);
        divElementsPlayer2[i].addEventListener('drop', handleDrop);
        divElementsPlayer1[i].removeEventListener("click", shootAtPlayer1);
    }
    let pieceElements = [];
    pieceElements[0] = $('.piece0')[0];
    pieceElements[1] = $('.piece1')[0];
    pieceElements[2] = $('.piece2')[0];
    pieceElements[3] = $('.piece3')[0];
    pieceElements[4] = $('.piece4')[0];
    for(let i = 0; i < 5; i++)
    {
        pieceElements[i].addEventListener("click", highlightPiece);
        pieceElements[i].draggable = "true";
        pieceElements[i].addEventListener("dragstart", handleDragStart);
        pieceElements[i].addEventListener("dragend", handleDragEnd);
        //pieceElements[i].dataset.rotation = "horizontal";
    }
}

function startShooting()
{
    let piecesNo = getNonZeroMatrix2Elements();
    if(piecesNo == 17)
    {
        alert("Shoot at computer's ships!");
        removeMovingHandlersAddShootingHandlers(64);
    }
    else
    {
        if(piecesNo < 17)
        {
            alert("Please add all the ships before starting!");
        }
        else
        {
            alert("Game already started :D");
        }
    }
}

function getNonZeroMatrix2Elements()
{
    let piecesNo = 0;
    for(let i = 0; i < rows; i++)
    {
        for(let j = 0; j < columns; j++)
        {
            if(matrixTable2[i][j] != 0)
            {
                piecesNo++;
            }
        }
    }
    return piecesNo;
}