let highlightedPiece;

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
    }
}
setInterval(displayCountdown, 1000);

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
    highlightedPiece.parentElement.removeChild(highlightedPiece);
    this.appendChild(highlightedPiece);
}

function createDivElementsInElement(numberOfDivElements, className, parentElement)
{
    let newDivElements = [];
    for (let i = 0; i < numberOfDivElements; i++) {
        newDivElements[i] = document.createElement('div');
        newDivElements[i].classList.add(className);
        parentElement.appendChild(newDivElements[i]);
        newDivElements[i].dataset.row = parseInt(i / 8);
        newDivElements[i].dataset.column = i % 8;
        newDivElements[i].addEventListener("click", movePiece);
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

function highlightPiece()
{
    this.style.setProperty('filter', 'saturate(300%)');
    this.dataset.highlight = "highlight";
    highlightedPiece = this;
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
        let value = '../images/' + pieceId + i + '.png';
        image.setAttribute(
            'src',
            value,
        );
        pieceElements[i].addEventListener("click", highlightPiece);
        pieceElements[i].appendChild(image);
    }
    return pieceElements;
}

const divTable2 = generateTable('tableClass2', 'cellClass2', appElement, 64);
let pieceElements = generatePieces(5, 'piecesClass', 'piece', divTable2);
/*function callGeneratePieces()
{
    generatePieces(5, 'piecesClass', 'piece', divTable2);
}
setTimeout(callGeneratePieces, 1000);*/

function generateNewGame()
{
    const divTable1 = generateTable('tableClass', 'cellClass', appElement, 64);
    const divTable2 = generateTable('tableClass2', 'cellClass2', appElement, 64);
    generatePieces(5, 'piecesClass', 'piece', divTable2);
}

newGameButton.addEventListener("click", generateNewGame);

