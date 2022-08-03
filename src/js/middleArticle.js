const slotImages = [];
let lastSet = [];
let lastSetSrc = [];
let urlArray = ["..\\public\\images\\7-512.webp", "..\\public\\images\\Cherry-512.webp", "..\\public\\images\\power-stars-f1.png",
    "..\\public\\images\\Watermelon-512.webp", "..\\public\\images\\Grapes-512.webp", "..\\public\\images\\Bananas-512.webp",
    "..\\public\\images\\LEMON-512.webp", "..\\public\\images\\strawberry-512.webp", "..\\public\\images\\casino_token-512.webp"];

let urlArrayBlank = ["..\\public\\images\\animation.gif", "..\\public\\images\\casino-interlaken.gif", "..\\public\\images\\deuce-ace-twitch.gif", "..\\public\\images\\sloth-dance.gif"];

import { getLastData, saveLastData } from "./ajax";

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

export function addImage(url, floatValue) {
    let divImage = document.createElement("div");
    divImage.classList += "divImg";
    let number = slotImages.length + 1;
    divImage.id = "div" + number;
    divImage.dataset.value = floatValue;
    const sevenSlotImage = document.createElement("img");
    sevenSlotImage.classList += "slotImages";
    sevenSlotImage.src = url;
    divImage.appendChild(sevenSlotImage);

    if (number < 10)
        document.querySelector(".flexLayout").appendChild(divImage);

    slotImages.push(divImage);
}

function appendImage(divImage, url, i) {
    const sevenSlotImage = document.createElement("img");
    sevenSlotImage.classList += "slotImages";
    //sevenSlotImage.classList += " slotImages-" + i;
    sevenSlotImage.src = url;
    divImage.appendChild(sevenSlotImage);
}

function specialCreation(url) {
    let divImage = document.createElement("div");
    //divImage.classList += "blankdivImg";
    divImage.classList += "divImg";

    //for (let i = 1; i < 5; i++) {
    appendImage(divImage, url[2], 0);
    //}

    document.querySelector(".flexLayout").appendChild(divImage);

}

function spinSlots() {

    let currentClass = '';
    let divSlots = document.querySelectorAll(".blankdivImg");
    divSlots.forEach((divSlot) => {
        let promise = new Promise((resolve) => {
            setTimeout(() => { resolve(); }, 3000);
            setInterval(() => {
                inc++;
                let showClass = 'slotImages-' + inc;
                if (currentClass) {
                    divSlot.classList.remove(currentClass);
                }
                divSlot.classList.add(showClass);
                currentClass = showClass;
                if (inc === 4)
                    inc = 0;
            }, 100);
        });
    })
    let inc = 0;
}

//<----------------------------------------------------Create Images---------------------------------------------------->

export function createImages() {

    let promise = new Promise((resolve) => {
        getLastData("codrescu.razvan@gmail.com", "razvan");
        setTimeout(() => { resolve(); }, 3000);
    });

    promise.then(() => {
        for (let i = 0; i < 72; i++) {
            addImage("..\\public\\images\\7-512.webp", 10);
            for (let j = 0; j < 2; j++) {
                addImage("..\\public\\images\\Cherry-512.webp", 5);
                addImage("..\\public\\images\\power-stars-f1.png", 4);
                addImage("..\\public\\images\\Watermelon-512.webp", 3);
                addImage("..\\public\\images\\Grapes-512.webp", 2.5);
            }
            for (let j = 0; j < 3; j++) {
                addImage("..\\public\\images\\Bananas-512.webp", 2.2);
                addImage("..\\public\\images\\LEMON-512.webp", 2);
                addImage("..\\public\\images\\strawberry-512.webp", 1.5);
                addImage("..\\public\\images\\casino_token-512.webp", 1);
            }
        }

        console.log(slotImages.length);
    });
}

//<----------------------------------------------------Clear all images from grid---------------------------------------------------->

function removeAllFields() {
    const gridInterface = document.querySelector('.flexLayout');
    gridInterface.innerHTML = '';
    // while (gridInterface.firstChild)
    //     gridInterface.removeChild(gridInterface.firstChild);
}

//<----------------------------------------------------Insert some blank images while spinning---------------------------------------------------->

function spinningMoment() {
    let spinningAudio = new Audio("..\\public\\sounds\\linesSpinning.mp3");
    spinningAudio.play();

    removeAllFields();

    for (let i = 0; i < 9; i++) {
        specialCreation(urlArrayBlank);
    }

    //spinSlots();

    setTimeout(() => {
        linesLogic();
        spinCounts();
    }, 1900);
}

//<----------------------------------------------------Button events for spin---------------------------------------------------->

export function buttonEvent() {
    const spinButton = document.querySelector('.spinButton');
    spinButton.addEventListener('click', () => {
        let bettingSum = document.querySelector('#betButton1').innerText.replace(/\D+$/g, "");
        if (parseFloat(localStorage.getItem('balance')) >= parseFloat(bettingSum)) {
            spinningMoment();
        }
    });

    document.addEventListener('keyup', (event) => {
        let bettingSum = document.querySelector('#betButton1').innerText.replace(/\D+$/g, "");
        if (parseFloat(localStorage.getItem('balance')) >= parseFloat(bettingSum)) {
            if ((event.code === 'Space') || (event.code === ' ')) {
                event.preventDefault();
                event.stopPropagation();

                spinningMoment();

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

                let spinButtonAudio = new Audio("..\\public\\sounds\\spinPress.mp3");
                spinButtonAudio.play();

                const spinButton = document.querySelector(".spinButton");
                spinButton.style.boxShadow = "10px 10px 5px grey";
                spinButton.style.color = "red";
            }
        }
    });
}

//<----------------------------------------------------Lines Winning Logic---------------------------------------------------->

let winFlag = false;

export function linesLogic() {
    removeAllFields();

    slotImages.forEach(slotImage => {
        slotImage.querySelector(".slotImages").classList.remove("blink");
    });

    lastSet = [];
    lastSetSrc = [];

    slotImages.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 9; i++) {
        let currentImage = slotImages[i];

        lastSet.push(currentImage);
        lastSetSrc.push([currentImage.querySelector(".slotImages").src, currentImage.dataset.value]);
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
    for (let i = 0; i < 6; i++)
        semiDiagonalLogic(i);

    if (winFlag) {
        let spinButtonAudio = new Audio("..\\public\\sounds\\winningSound.mp3");
        spinButtonAudio.play();
        winFlag = false;
    } else {
        let spinButtonAudio = new Audio("..\\public\\sounds\\3lineStop.mp3");
        spinButtonAudio.play();
    }

    saveLastData("codrescu.razvan@gmail.com", "razvan", lastSetSrc, parseFloat(localStorage.getItem('balance')));
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

        winFlag = true;
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

    if ((i % 3 === 0) && i < 4 &&
        lastSet[i].dataset.value === lastSet[i + 1].dataset.value &&
        lastSet[i + 1].dataset.value === lastSet[i + 5].dataset.value) {
        recalculateBalanceMethod(i, i + 1, i + 5);
    }

    if ((i % 3 === 0) && i < 4 &&
        lastSet[i].dataset.value === lastSet[i + 4].dataset.value &&
        lastSet[i + 4].dataset.value === lastSet[i + 5].dataset.value) {
        recalculateBalanceMethod(i, i + 4, i + 5);
    }


}

function recalculateBalanceMethod(position1, position2, position3) {
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

    winFlag = true;
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
    saveLastData("codrescu.razvan@gmail.com", "razvan", lastSetSrc, parseFloat(localStorage.getItem('balance')));
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