const slotImages = [];
let lastSet = [];

import { saveLastData } from "./ajax";

//<----------------------------------------------------Main Creation Function---------------------------------------------------->

export function middleArticle() {
    const articleLayout = document.createElement("article");
    articleLayout.classList += "middleArticle";
    document.querySelector('#app').appendChild(articleLayout);

    const gridInterface = document.createElement("div");
    gridInterface.classList += "flexLayout";
    document.querySelector('.middleArticle').appendChild(gridInterface);

    const spinButtonDiv = document.createElement("div");
    spinButtonDiv.classList += "spinDiv";
    document.querySelector('.middleArticle').appendChild(spinButtonDiv);

    const spinButton = document.createElement("button");
    spinButton.classList += "spinButton";
    spinButton.innerText = "SPIN!";
    document.querySelector('.spinDiv').appendChild(spinButton);

    popupReload();
}

//<----------------------------------------------------Add image in array---------------------------------------------------->

function addImage(url, floatValue) {
    let divImage = document.createElement("div");
    divImage.classList += "divImg";
    let number = slotImages.length + 1;
    divImage.id = "div" + number;
    divImage.dataset.value = floatValue;
    const sevenSlotImage = document.createElement("img");
    sevenSlotImage.classList += "slotImages";
    sevenSlotImage.src = "C:\\Projects\\new\\internship-2022\\public\\images\\" + url;
    divImage.appendChild(sevenSlotImage);

    if (number < 10)
        document.querySelector(".flexLayout").appendChild(divImage);

    slotImages.push(divImage);
}

//<----------------------------------------------------Create Images---------------------------------------------------->

export function createImages() {

    for (let i = 0; i < 90; i++) {
        addImage("7-512.webp", 10);
        addImage("Grapes-512.webp", 2.5);
        addImage("Bananas-512.webp", 2.2);
        addImage("Watermelon-512.webp", 3);
        addImage("casino_token-512.webp", 1);
        addImage("Cherry-512.webp", 5);
        addImage("LEMON-512.webp", 2);
        addImage("power-stars-f1.png", 4);
        addImage("strawberry-512.webp", 1.5);
    }
}

//<----------------------------------------------------Clear all images from grid---------------------------------------------------->

function removeAllFields() {
    const gridInterface = document.querySelector('.flexLayout');
    while (gridInterface.firstChild)
        gridInterface.removeChild(gridInterface.firstChild);
}

//<----------------------------------------------------Button events for spin---------------------------------------------------->

export function buttonEvent() {
    const spinButton = document.querySelector('.spinButton');
    spinButton.addEventListener('click', () => {
        let bettingSum = document.querySelector('#betButton1').innerText.replace(/\D+$/g, "");
        if (parseFloat(localStorage.getItem('balance')) >= parseFloat(bettingSum)) {
            linesLogic();
            spinCounts();
        }
    });

    document.addEventListener('keyup', (event) => {
        let bettingSum = document.querySelector('#betButton1').innerText.replace(/\D+$/g, "");
        if (parseFloat(localStorage.getItem('balance')) >= parseFloat(bettingSum)) {
            if ((event.code === 'Space') || (event.code === ' ')) {
                event.preventDefault();
                event.stopPropagation();

                linesLogic();

                const spinButton = document.querySelector(".spinButton");
                spinButton.style.boxShadow = "none";
                spinButton.style.color = "black";
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        let bettingSum = document.querySelector('#betButton1').innerText.replace(/\D+$/g, "");
        if (parseFloat(localStorage.getItem('balance')) >= parseFloat(bettingSum)) {
            if ((event.code === 'Space') || (event.code === ' ')) {
                event.preventDefault();
                event.stopPropagation();
                const spinButton = document.querySelector(".spinButton");
                spinButton.style.boxShadow = "10px 10px 5px grey";
                spinButton.style.color = "red";
                spinCounts();
            }
        }
    });
}

//<----------------------------------------------------Lines Winning Logic---------------------------------------------------->

export function linesLogic() {
    removeAllFields();

    slotImages.forEach(slotImage => {
        slotImage.querySelector(".slotImages").classList.remove("blink");
    });

    lastSet = [];

    slotImages.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 9; i++) {
        let currentImage = slotImages[i];

        lastSet.push(currentImage);
        document.querySelector(".flexLayout").appendChild(currentImage);

        //Line Logic
        if ((i + 1) % 3 === 0) {
            if ((currentImage.dataset.value === lastSet[i - 1].dataset.value) && (currentImage.dataset.value === lastSet[i - 2].dataset.value)) {

                let multiplier = parseFloat(currentImage.dataset.value) * 3.0;
                lastSet[i - 2].querySelector(".slotImages").classList.add("blink");
                lastSet[i - 1].querySelector(".slotImages").classList.add("blink");
                lastSet[i].querySelector(".slotImages").classList.add("blink");

                let currentBetValue = parseFloat(document.querySelector("#betButton1").innerText.replace(/\D+$/g, ""));
                let balance = parseFloat(localStorage.getItem("balance"));
                balance += currentBetValue * multiplier;
                balance = Math.round(balance * 100) / 100;
                localStorage.setItem("balance", balance);

                document.querySelector(".balance").innerText = "Balance: " + balance + "$";
            }
        }
    }

    //Diagonal logic
    diagonalLogic(0, 4, 8);
    diagonalLogic(2, 4, 6);

    //Semi-diagonal logic
    for(let i = 0; i < 6; i++)
        semiDiagonalLogic(i);

    //saveLastData("codrescu.razvan@gmail.com", "razvan", lastSet, parseFloat(localStorage.getItem('balance')));
}

function diagonalLogic(position1, position2, position3) {
    if ((lastSet[position1].dataset.value === lastSet[position2].dataset.value) &&
        (lastSet[position2].dataset.value === lastSet[position3].dataset.value)) {
        let multiplier = parseFloat(lastSet[position1].dataset.value) * 2.5;

        lastSet[position1].querySelector(".slotImages").classList.add("blink");
        lastSet[position2].querySelector(".slotImages").classList.add("blink");
        lastSet[position3].querySelector(".slotImages").classList.add("blink");

        let currentBetValue = parseFloat(document.querySelector("#betButton1").innerText.replace(/\D+$/g, ""));
        let balance = parseFloat(localStorage.getItem("balance"));
        balance += currentBetValue * multiplier;
        balance = Math.round(balance * 100) / 100;
        localStorage.setItem("balance", balance);

        document.querySelector(".balance").innerText = "Balance: " + balance + "$";
    }
}

function semiDiagonalLogic(i) {
    if (i < 6 && (i % 3 !== 0) &&
    lastSet[i].dataset.value === lastSet[i + 1].dataset.value &&
    lastSet[i + 1].dataset.value === lastSet[i + 2].dataset.value) {
            recalculateBalanceMethod(i, i + 1, i + 2);
    }

    if (i < 5 && lastSet[i].dataset.value === lastSet[i + 2].dataset.value &&
        lastSet[i + 2].dataset.value === lastSet[i + 4].dataset.value) {
            recalculateBalanceMethod(i, i + 2, i + 4);
    }

    if((i % 3 === 0) && i < 4 &&
    lastSet[i].dataset.value === lastSet[i + 1].dataset.value && 
    lastSet[i + 1].dataset.value === lastSet[i + 5].dataset.value){
        recalculateBalanceMethod(i, i + 1, i + 5);
    }

    if((i % 3 === 0) && i < 4 &&
    lastSet[i].dataset.value === lastSet[i + 4].dataset.value && 
    lastSet[i + 4].dataset.value === lastSet[i + 5].dataset.value){
        recalculateBalanceMethod(i, i + 4, i + 5);
    }


}

function recalculateBalanceMethod(position1, position2, position3){
    let multiplier = parseFloat(lastSet[position1].dataset.value) * 2;

            lastSet[position1].querySelector(".slotImages").classList.add("blink");
            lastSet[position2].querySelector(".slotImages").classList.add("blink");
            lastSet[position3].querySelector(".slotImages").classList.add("blink");
    
            let currentBetValue = parseFloat(document.querySelector("#betButton1").innerText.replace(/\D+$/g, ""));
            let balance = parseFloat(localStorage.getItem("balance"));
            balance += currentBetValue * multiplier;
            balance = Math.round(balance * 100) / 100;
            localStorage.setItem("balance", balance);
    
            document.querySelector(".balance").innerText = "Balance: " + balance + "$";
}

//<----------------------------------------------------Balance and spinning logic---------------------------------------------------->

export function spinCounts() {
    let balance = parseFloat(localStorage.getItem('balance'));
    let currentBet = parseFloat(document.querySelector('#betButton1').innerText);
    if (balance >= currentBet) {
        balance -= parseFloat(currentBet);
        balance = Math.round(balance * 100) / 100;
        localStorage.setItem('balance', balance);
        document.querySelector('.balanceDiv p').innerText = "Balance: " + balance + "$";
    }

    popupReload();
    //saveLastData("codrescu.razvan@gmail.com", "razvan", lastSet, balance);
}

//<----------------------------------------------------No money logic---------------------------------------------------->

function popupReload() {
    if (parseFloat(localStorage.getItem('balance')) <= 0.5) {
        document.querySelector(".flexLayout").classList.add("show");
        localStorage.setItem("popup", "visible");
    } else {
        if (localStorage.getItem("popup") === "visible") {
            document.querySelector(".flexLayout").classList.remove("show");
            document.querySelector(".flexLayout").classList.add("hide");
            setTimeout(() => {
                document.querySelector(".flexLayout").classList.remove("hide");
            }, 1000);
            localStorage.setItem("popup", "hidden");
        }
    }
}