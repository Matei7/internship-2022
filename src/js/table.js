import "../css/style-table.scss";

function drawTable() {
    // main div in body
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("main");
    document.body.appendChild(mainDiv);

    const tableDiv = document.createElement("div");
    tableDiv.classList.add("tableBoard");
    mainDiv.appendChild(tableDiv);

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

    // upside down third set of triangles
    const fourthTriangleDiv = document.createElement("div");
    fourthTriangleDiv.classList.add("setOfFiveFourth");
    tableDiv.appendChild(fourthTriangleDiv);

    for(let i = 0; i < 6; i++ ) {
        const triangleDiv = document.createElement("div");
        triangleDiv.classList.add("triangle-arrowDownEven");
        triangleDiv.setAttribute("id","triangleDownEven_"+i);
        fourthTriangleDiv.appendChild(triangleDiv);
    }
}

function main() {
    drawTable();
}

main();