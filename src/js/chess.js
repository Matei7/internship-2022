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

function createDivElementInElement(className, parentElement)
{
    const newDivElement = document.createElement('div');
    newDivElement.classList.add(className);
    parentElement.appendChild(newDivElement);
    return newDivElement;
}

function createDivElementsInElement(numberOfDivElements, className, parentElement)
{
    let newDivElements = [];
    for (let i = 0; i < numberOfDivElements; i++) {
        newDivElements[i] = document.createElement('div');
        newDivElements[i].classList.add(className);
        parentElement.appendChild(newDivElements[i]);
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

function generatePieces(numberOfPieces, piecesClassName, pieceId, parentElement)
{
    const piecesElement = createDivElementInElement(piecesClassName, parentElement);
    let pieceElements = [];
    for(let i = 0; i < numberOfPieces; i++)
    {
        let newPieceId = pieceId + i;
        pieceElements[i] = createDivElementInElement(newPieceId, piecesElement);
    }

}

generatePieces(5, 'piecesClass', 'piece', divTable1);
const divTable2 = generateTable('tableClass2', 'cellClass2', appElement, 64);
