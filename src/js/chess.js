let highlightedPiece = null;
let dragSrcEl = null;
let rows = 8;
let columns = 8;
let matrixTable2 = [];
initializeMatrix2(8, 8);
let piecesPositions = {};

const newPElement = document.createElement('p');
const appElement = document.getElementById('app');
appElement.appendChild(newPElement);
var count = 0;
function displayCountdown()
{
    if(count != 5)
    {
        appElement.children[1].innerText = 5 - count;
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
    localStorage.setItem("positions", JSON.stringify(piecesPositions));
    highlightedPiece = null;
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
        newDivElements[i].addEventListener("click", movePiece);
        newDivElements[i].addEventListener('dragover', handleDragOver);
        newDivElements[i].addEventListener('drop', handleDrop);
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
        localStorage.setItem("positions", JSON.stringify(piecesPositions));
    }
    return false;
}

function generatePieces(numberOfPieces, piecesClassName, pieceId, parentElement)
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
    generatePieces(5, 'piecesClass', 'piece', divTable2);
    let parsed = JSON.parse(localStorage.getItem("positions"));
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
    }
    //localStorage.clear();
}
setTimeout(callGeneratePieces, 2000);

function generateNewGame()
{
    localStorage.clear();
    for(let i = 0; i < piecesPositions.length; i++)
    {
        piecesPositions[i] = null;
    }
    while(appElement.children.length > 1)
    {
        appElement.removeChild(appElement.children[1]);
    }
    initializeMatrix2(8, 8);
    appElement.appendChild(newGameButton);
    highlightedPiece = null;
    dragSrcEl = null;
    const divTable1 = generateTable('tableClass', 'cellClass', appElement, 64);
    const divTable2 = generateTable('tableClass2', 'cellClass2', appElement, 64);
    generatePieces(5, 'piecesClass', 'piece', divTable2);
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

