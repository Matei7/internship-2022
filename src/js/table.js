import "../css/style-table.scss";

let mainDiv = document.createElement("div");
document.body.appendChild(mainDiv);

const top = document.createElement('div');
mainDiv.appendChild(top);

function createMain() {
    mainDiv = document.createElement("div");
    document.body.appendChild(mainDiv);
}

function drawTable() {
    const tableDiv = document.createElement("div");
    tableDiv.classList.add("tableBoard");
    mainDiv.appendChild(tableDiv);
    mainDiv.classList.add("main");

    // first set of five
    const firstTriangleDiv = document.createElement("div");
    firstTriangleDiv.classList.add("setOfFiveFirst");
    tableDiv.appendChild(firstTriangleDiv);

    for(let i = 0; i < 6; i++ ) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("triangle-arrowUpOdd");
        triangleDiv.setAttribute("id","triangleOdd_"+i);
        firstTriangleDiv.appendChild(triangleDiv);
    }
    // second set of five
    const secondTriangleDiv = document.createElement("div");
    secondTriangleDiv.classList.add("setOfFiveSecond");
    tableDiv.appendChild(secondTriangleDiv);

    for(let i = 0; i < 6; i++ ) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("triangle-arrowUpEven");
        triangleDiv.setAttribute("id","triangleEven_"+i);
        secondTriangleDiv.appendChild(triangleDiv);
    }

    // upside down third set of triangles
    const thirdTriangleDiv = document.createElement("div");
    thirdTriangleDiv.classList.add("setOfFiveThird");
    tableDiv.appendChild(thirdTriangleDiv);

    for(let i = 0; i < 6; i++ ) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("triangle-arrowDownOdd");
        triangleDiv.setAttribute("id","triangleDownOdd_"+i);
        thirdTriangleDiv.appendChild(triangleDiv);
    }

    // upside down fourth set of triangles
    const fourthTriangleDiv = document.createElement("div");
    fourthTriangleDiv.classList.add("setOfFiveFourth");
    tableDiv.appendChild(fourthTriangleDiv);

    for(let i = 0; i < 6; i++ ) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("triangle-arrowDownEven");
        triangleDiv.setAttribute("id","triangleDownEven_" + i);
        fourthTriangleDiv.appendChild(triangleDiv);
    }
}

function initialState() {
    // primele 5 din casa
    const firstFiveWhiteDiv = document.createElement("div")
    firstFiveWhiteDiv.classList.add("first-five-white");
    document.getElementById("triangleDownEven_0").appendChild(firstFiveWhiteDiv);

    const firstFiveBlackDiv = document.createElement("div")
    firstFiveBlackDiv.classList.add("first-five-black");
    document.getElementById("triangleEven_0").appendChild(firstFiveBlackDiv);

    for(let i = 0; i < 5; i++) {
        const circleWhiteDiv = document.createElement("div");
        circleWhiteDiv.classList.add("white-circles");
        circleWhiteDiv.setAttribute("id", "circleWhite_" + i);
        firstFiveWhiteDiv.appendChild(circleWhiteDiv);

        const circleBlackDiv = document.createElement('div');
        circleBlackDiv.classList.add("black-circles");
        circleBlackDiv.setAttribute("id", "circleBlack_" + i);
        firstFiveBlackDiv.appendChild(circleBlackDiv);
    }

    // cele 2 piese din casa
    const twoPiecesWhiteDiv = document.createElement("div")
    twoPiecesWhiteDiv.classList.add("two-white");
    document.getElementById("triangleEven_5").appendChild(twoPiecesWhiteDiv);

    const twoPiecesBlackDiv = document.createElement("div")
    twoPiecesBlackDiv.classList.add("two-black");
    document.getElementById("triangleDownEven_5").appendChild(twoPiecesBlackDiv);

    for(let i = 0; i < 2; i++) {
        const circleWhiteDiv = document.createElement("div");
        circleWhiteDiv.classList.add("white-circles");
        circleWhiteDiv.setAttribute("id", "circleWhite_" + i);
        twoPiecesWhiteDiv.appendChild(circleWhiteDiv);

        const circleBlackDiv = document.createElement('div');
        circleBlackDiv.classList.add("black-circles");
        circleBlackDiv.setAttribute("id", "circleBlack_" + i);
        twoPiecesBlackDiv.appendChild(circleBlackDiv);
    }

    // cele 5 din afara casei
    const outerFivePiecesWhiteDiv = document.createElement("div")
    outerFivePiecesWhiteDiv.classList.add("five-white");
    document.getElementById("triangleOdd_0").appendChild(outerFivePiecesWhiteDiv);

    const outerFivePiecesBlackDiv = document.createElement("div")
    outerFivePiecesBlackDiv.classList.add("five-black");
    document.getElementById("triangleDownOdd_0").appendChild(outerFivePiecesBlackDiv);

    for(let i = 0; i < 5; i++) {
        const circleWhiteDiv = document.createElement("div");
        circleWhiteDiv.classList.add("white-circles");
        circleWhiteDiv.setAttribute("id", "circleWhite_" + i);
        outerFivePiecesWhiteDiv.appendChild(circleWhiteDiv);

        const circleBlackDiv = document.createElement('div');
        circleBlackDiv.classList.add("black-circles");
        circleBlackDiv.setAttribute("id", "circleBlack_" + i);
        outerFivePiecesBlackDiv.appendChild(circleBlackDiv);
    }

    // cele 3 din afara casei
    const outerThreePiecesWhiteDiv = document.createElement("div")
    outerThreePiecesWhiteDiv.classList.add("three-white");
    document.getElementById("triangleDownOdd_4").appendChild(outerThreePiecesWhiteDiv);

    const outerThreePiecesBlackDiv = document.createElement("div")
    outerThreePiecesBlackDiv.classList.add("three-black");
    document.getElementById("triangleOdd_4").appendChild(outerThreePiecesBlackDiv);

    for(let i = 0; i < 3; i++) {
        const circleWhiteDiv = document.createElement("div");
        circleWhiteDiv.classList.add("white-circles");
        circleWhiteDiv.setAttribute("id", "circleWhite_" + i);
        outerThreePiecesWhiteDiv.appendChild(circleWhiteDiv);

        const circleBlackDiv = document.createElement('div');
        circleBlackDiv.classList.add("black-circles");
        circleBlackDiv.setAttribute("id", "circleBlack_" + i);
        outerThreePiecesBlackDiv.appendChild(circleBlackDiv);
    }
}

function startGame() {
    const startButton = document.createElement("button");
    startButton.classList.add("start-button");
    startButton.innerHTML = "Start new game";
    mainDiv.appendChild(startButton);
    startButton.addEventListener('click', clickStart);
}

// function rollDice() {
//
// }

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
}

main();