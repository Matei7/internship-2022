import "../css/style-table.scss";

let mainDiv = document.createElement("div");
let top = document.createElement('div');

function createMain() {
    mainDiv = document.createElement("div");
    mainDiv.setAttribute("id", "main");
    document.body.appendChild(mainDiv);

    top = document.createElement('div');
    top.classList.add("top");
    mainDiv.appendChild(top);
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
        console.log(columnIndex);
        divElement.style.bottom = '0';
        divElement.style.position = 'absolute';
        divElement.style.bottom = '0';
    }
}

function initialState() {
    let whites = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, 0];
    let blacks = [0, 0, 0, 0, 0, 5, 0, 3, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];
    const white = "white";
    const black = "black";

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

function createDiceButton() {
    const diceDiv = document.createElement('div');
    diceDiv.classList.add('dice-container');
    top.appendChild(diceDiv);

    const dice1 = document.createElement('div');
    dice1.classList.add('dice', 'dice-one');
    dice1.setAttribute("id", "dice1");
    diceDiv.appendChild(dice1);

    const diceOneSideOne = document.createElement('div');
    diceOneSideOne.classList.add('side', 'one');
    diceOneSideOne.setAttribute("id", "dice-one-side-one");
    dice1.appendChild(diceOneSideOne);

    const diceOneDotOne_1 = document.createElement('div');
    diceOneDotOne_1.classList.add('dot', 'one-1');
    diceOneSideOne.appendChild(diceOneDotOne_1);

    const diceOneSideTwo = document.createElement('div');
    diceOneSideTwo.classList.add("side", "two");
    diceOneSideTwo.setAttribute("id", "dice-one-side-two");
    dice1.appendChild(diceOneSideTwo);

    const diceOneDotTwo_1 = document.createElement('div');
    diceOneDotTwo_1.classList.add("dot", "two-1");
    diceOneSideTwo.appendChild(diceOneDotTwo_1);

    const diceOneDotTwo_2 = document.createElement('div');
    diceOneDotTwo_2.classList.add("dot", "two-2");
    diceOneSideTwo.appendChild(diceOneDotTwo_2);

    const diceOneSideThree = document.createElement('div');
    diceOneSideThree.classList.add("side", "three");
    diceOneSideThree.setAttribute("id", "dice-one-side-three");
    dice1.appendChild(diceOneSideThree);

    const diceOneDotThree_1 = document.createElement('div');
    diceOneDotThree_1.classList.add("dot", "three-1");
    diceOneSideThree.appendChild(diceOneDotThree_1);

    const diceOneDotThree_2 = document.createElement('div');
    diceOneDotThree_2.classList.add("dot", "three-2");
    diceOneSideThree.appendChild(diceOneDotThree_2);

    const diceOneDotThree_3 = document.createElement('div');
    diceOneDotThree_3.classList.add("dot", "three-3");
    diceOneSideThree.appendChild(diceOneDotThree_3);

    const diceOneSideFour = document.createElement('div');
    diceOneSideFour.classList.add("side", "four");
    diceOneSideFour.setAttribute("id", "dice-one-side-four");
    dice1.appendChild(diceOneSideFour);

    const diceOneDotFour_1 = document.createElement('div');
    diceOneDotFour_1.classList.add("dot", "four-1");
    diceOneSideFour.appendChild(diceOneDotFour_1);

    const diceOneDotFour_2 = document.createElement('div');
    diceOneDotFour_2.classList.add("dot", "four-2");
    diceOneSideFour.appendChild(diceOneDotFour_2);

    const diceOneDotFour_3 = document.createElement('div');
    diceOneDotFour_3.classList.add("dot", "four-3");
    diceOneSideFour.appendChild(diceOneDotFour_3);

    const diceOneDotFour_4 = document.createElement('div');
    diceOneDotFour_4.classList.add("dot", "four-4");
    diceOneSideFour.appendChild(diceOneDotFour_4);

    const diceOneSideFive = document.createElement('div');
    diceOneSideFive.classList.add("side", "five");
    diceOneSideFive.setAttribute("id", "dice-one-side-five");
    dice1.appendChild(diceOneSideFive);

    const diceOneDotFive_1 = document.createElement('div');
    diceOneDotFive_1.classList.add("dot", "five-1");
    diceOneSideFive.appendChild(diceOneDotFive_1);

    const diceOneDotFive_2 = document.createElement('div');
    diceOneDotFive_2.classList.add("dot", "five-2");
    diceOneSideFive.appendChild(diceOneDotFive_2);

    const diceOneDotFive_3 = document.createElement('div');
    diceOneDotFive_3.classList.add("dot", "five-3");
    diceOneSideFive.appendChild(diceOneDotFive_3);

    const diceOneDotFive_4 = document.createElement('div');
    diceOneDotFive_4.classList.add("dot", "five-4");
    diceOneSideFive.appendChild(diceOneDotFive_4);

    const diceOneDotFive_5 = document.createElement('div');
    diceOneDotFive_5.classList.add("dot", "five-5");
    diceOneSideFive.appendChild(diceOneDotFive_5);

    const diceOneSideSix = document.createElement('div');
    diceOneSideSix.classList.add("side", "six");
    diceOneSideSix.setAttribute("id", "dice-one-side-six");
    dice1.appendChild(diceOneSideSix);

    const diceOneDotSix_1 = document.createElement('div');
    diceOneDotSix_1.classList.add("dot", "six-1");
    diceOneSideSix.appendChild(diceOneDotSix_1);

    const diceOneDotSix_2 = document.createElement('div');
    diceOneDotSix_2.classList.add("dot", "six-2");
    diceOneSideSix.appendChild(diceOneDotSix_2);

    const diceOneDotSix_3 = document.createElement('div');
    diceOneDotSix_3.classList.add("dot", "six-3");
    diceOneSideSix.appendChild(diceOneDotSix_3);

    const diceOneDotSix_4 = document.createElement('div');
    diceOneDotSix_4.classList.add("dot", "six-4");
    diceOneSideSix.appendChild(diceOneDotSix_4);

    const diceOneDotSix_5 = document.createElement('div');
    diceOneDotSix_5.classList.add("dot", "six-5");
    diceOneSideSix.appendChild(diceOneDotSix_5);

    const diceOneDotSix_6 = document.createElement('div');
    diceOneDotSix_6.classList.add("dot", "six-6");
    diceOneSideSix.appendChild(diceOneDotSix_6);

    /////////////////////////////////////////////////////////////////
    const dice2 = document.createElement('div');
    dice2.classList.add('dice', 'dice-two');
    dice2.setAttribute("id", "dice2");
    diceDiv.appendChild(dice2);

    const diceTwoSideOne = document.createElement('div');
    diceTwoSideOne.classList.add('side', 'one');
    diceTwoSideOne.setAttribute("id", "dice-two-side-one");
    dice2.appendChild(diceTwoSideOne);

    const diceTwoDotOne = document.createElement('div');
    diceTwoDotOne.classList.add('dot', 'one-1');
    diceTwoSideOne.appendChild(diceTwoDotOne);

    const diceTwoSideTwo = document.createElement('div');
    diceTwoSideTwo.classList.add("side", "two");
    diceTwoSideTwo.setAttribute("id", "dice-two-side-two");
    dice2.appendChild(diceTwoSideTwo);

    const diceTwoDotTwo_1 = document.createElement('div');
    diceTwoDotTwo_1.classList.add("dot", "two-1");
    diceTwoSideTwo.appendChild(diceTwoDotTwo_1);

    const diceTwoDotTwo_2 = document.createElement('div');
    diceTwoDotTwo_2.classList.add("dot", "two-2");
    diceTwoSideTwo.appendChild(diceTwoDotTwo_2);

    const diceTwoSideThree = document.createElement('div');
    diceTwoSideThree.classList.add("side", "three");
    diceTwoSideThree.setAttribute("id", "dice-two-side-three");
    dice2.appendChild(diceTwoSideThree);

    const diceTwoDotThree_1 = document.createElement('div');
    diceTwoDotThree_1.classList.add("dot", "three-1");
    diceTwoSideThree.appendChild(diceTwoDotThree_1);

    const diceTwoDotThree_2 = document.createElement('div');
    diceTwoDotThree_2.classList.add("dot", "three-2");
    diceTwoSideThree.appendChild(diceTwoDotThree_2);

    const diceTwoDotThree_3 = document.createElement('div');
    diceTwoDotThree_3.classList.add("dot", "three-3");
    diceTwoSideThree.appendChild(diceTwoDotThree_3);

    const diceTwoSideFour = document.createElement('div');
    diceTwoSideFour.classList.add("side", "four");
    diceTwoSideFour.setAttribute("id", "dice-two-side-four");
    dice2.appendChild(diceTwoSideFour);

    const diceTwoDotFour_1 = document.createElement('div');
    diceTwoDotFour_1.classList.add("dot", "four-1");
    diceTwoSideFour.appendChild(diceTwoDotFour_1);

    const diceTwoDotFour_2 = document.createElement('div');
    diceTwoDotFour_2.classList.add("dot", "four-2");
    diceTwoSideFour.appendChild(diceTwoDotFour_2);

    const diceTwoDotFour_3 = document.createElement('div');
    diceTwoDotFour_3.classList.add("dot", "four-3");
    diceTwoSideFour.appendChild(diceTwoDotFour_3);

    const diceTwoDotFour_4 = document.createElement('div');
    diceTwoDotFour_4.classList.add("dot", "four-4");
    diceTwoSideFour.appendChild(diceTwoDotFour_4);

    const diceTwoSideFive = document.createElement('div');
    diceTwoSideFive.classList.add("side", "five");
    diceTwoSideFive.setAttribute("id", "dice-two-side-five");
    dice2.appendChild(diceTwoSideFive);

    const diceTwoDotFive_1 = document.createElement('div');
    diceTwoDotFive_1.classList.add("dot", "five-1");
    diceTwoSideFive.appendChild(diceTwoDotFive_1);

    const diceTwoDotFive_2 = document.createElement('div');
    diceTwoDotFive_2.classList.add("dot", "five-2");
    diceTwoSideFive.appendChild(diceTwoDotFive_2);

    const diceTwoDotFive_3 = document.createElement('div');
    diceTwoDotFive_3.classList.add("dot", "five-3");
    diceTwoSideFive.appendChild(diceTwoDotFive_3);

    const diceTwoDotFive_4 = document.createElement('div');
    diceTwoDotFive_4.classList.add("dot", "five-4");
    diceTwoSideFive.appendChild(diceTwoDotFive_4);

    const diceTwoDotFive_5 = document.createElement('div');
    diceTwoDotFive_5.classList.add("dot", "five-5");
    diceTwoSideFive.appendChild(diceTwoDotFive_5);

    const diceTwoSideSix = document.createElement('div');
    diceTwoSideSix.classList.add("side", "six");
    diceTwoSideSix.setAttribute("id", "dice-two-side-six");
    dice2.appendChild(diceTwoSideSix);

    const diceTwoDotSix_1 = document.createElement('div');
    diceTwoDotSix_1.classList.add("dot", "six-1");
    diceTwoSideSix.appendChild(diceTwoDotSix_1);

    const diceTwoDotSix_2 = document.createElement('div');
    diceTwoDotSix_2.classList.add("dot", "six-2");
    diceTwoSideSix.appendChild(diceTwoDotSix_2);

    const diceTwoDotSix_3 = document.createElement('div');
    diceTwoDotSix_3.classList.add("dot", "six-3");
    diceTwoSideSix.appendChild(diceTwoDotSix_3);

    const diceTwoDotSix_4 = document.createElement('div');
    diceTwoDotSix_4.classList.add("dot", "six-4");
    diceTwoSideSix.appendChild(diceTwoDotSix_4);

    const diceTwoDotSix_5 = document.createElement('div');
    diceTwoDotSix_5.classList.add("dot", "six-5");
    diceTwoSideSix.appendChild(diceTwoDotSix_5);

    const diceTwoDotSix_6 = document.createElement('div');
    diceTwoDotSix_6.classList.add("dot", "six-6");
    diceTwoSideSix.appendChild(diceTwoDotSix_6);

    const diceButtonDiv = document.createElement('div');
    diceButtonDiv.classList.add('roll');
    diceButtonDiv.setAttribute("id", "roll");
    diceDiv.appendChild(diceButtonDiv);

    const diceBtn = document.createElement('button');
    diceBtn.classList.add("roll-button");
    diceBtn.setAttribute("id", "roll-button");
    diceBtn.innerHTML = "Roll dice!";
    diceButtonDiv.appendChild(diceBtn);

    console.log(document.getElementById('roll-button'));

    let elDiceOne = document.getElementById('dice1');
    let elDiceTwo = document.getElementById('dice2');
    let elComeOut = document.getElementById('roll-button');

    elComeOut.onclick = function () {
        rollDice();
    };

    function rollDice() {

        let diceOne = Math.floor((Math.random() * 6) + 1);
        let diceTwo = Math.floor((Math.random() * 6) + 1);

        console.log(diceOne + ' ' + diceTwo);
        console.log(elDiceOne + ' ' + elDiceTwo);

        for (let i = 1; i <= 6; i++) {
            elDiceOne.classList.remove('show-' + i);
            if (diceOne === i) {
                elDiceOne.classList.add('show-' + i);
            }
        }

        for (let k = 1; k <= 6; k++) {
            elDiceTwo.classList.remove('show-' + k);
            if (diceTwo === k) {
                elDiceTwo.classList.add('show-' + k);
            }
        }
    }
}

function clearTable() {
    mainDiv.remove();
}

function clickStart() {
    clearTable();
    createMain();
    startGame();
    createDiceButton();
    drawTable();
    initialState();
}

function main() {
    createMain();
    startGame();
    createDiceButton();
    // roll();
}

main();