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

const newDivElement = document.createElement('div');
newDivElement.classList.add('tableClass');
appElement.appendChild(newDivElement);

let newCellElements = [];
for(let i = 0; i < 64; i++)
{
    newCellElements[i] = document.createElement('div');
    newCellElements[i].classList.add('cellClass');
    newDivElement.appendChild(newCellElements[i]);
}

let newPiecesElements = [];
for(let i = 0; i < 64; i++)
{
    newPiecesElements[i] = document.createElement('div');
    newPiecesElements[i].classList.add('pieceClass');
    newDivElement.appendChild(newPiecesElements[i]);
}

