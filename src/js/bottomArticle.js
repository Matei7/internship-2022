const betMultiplierVector = [0.5, 1, 2, 4, 8];
const betVector = [1, 5, 10, 50, 100,];
const spinsVector = [1, 5, 10, 20, 50];

import { linesLogic } from "./middleArticle";
import { spinCounts } from "./middleArticle";

export function bottomArticle() {

    //<----------------------------------------------------Article---------------------------------------------------->

    const bottomArticle = document.createElement("article");
    bottomArticle.classList += "bottomArticle";
    document.querySelector('#app').appendChild(bottomArticle);

    //<----------------------------------------------------Balance Window---------------------------------------------------->

    const balanceDiv = document.createElement("div");
    balanceDiv.classList += "balanceDiv";
    bottomArticle.appendChild(balanceDiv);

    const balanceWindow = document.createElement('p');
    balanceWindow.classList += "balance";
    balanceWindow.innerText = "Balance: " + localStorage.getItem('balance') + "$";
    if ((!localStorage.getItem('balance')) || (localStorage.getItem('balance') === null))
        localStorage.setItem('balance', '500');
    balanceDiv.appendChild(balanceWindow);

    //<----------------------------------------------------Bet Window---------------------------------------------------->

    const betDiv = document.createElement("div");
    betDiv.classList += "betDiv";
    bottomArticle.appendChild(betDiv);
    let selectionButton = createButton(1);
    betDiv.appendChild(selectionButton);
    if (localStorage.getItem('bet') === null)
        selectionButton.innerText = "Bet";
    else
        document.querySelector('#betButton1').innerText = localStorage.getItem('firstBetValue');
    betDiv.append(createList(1, 1));
    betFunctionality(1);

    //<----------------------------------------------------Bet Multiplier Window---------------------------------------------------->

    const betMultiplierDiv = document.createElement("div");
    betMultiplierDiv.classList += "betMultiplierDiv";
    bottomArticle.appendChild(betMultiplierDiv);
    let selectionMulButton = createButton(2);
    betMultiplierDiv.appendChild(selectionMulButton);
    if (localStorage.getItem('mul') === null)
        selectionMulButton.innerText = "Mul";
    else
        document.querySelector('#betButton2').innerText = "x1";
    betMultiplierDiv.append(createList(2, 2));
    betFunctionality(2);

    //<----------------------------------------------------Auto Spins---------------------------------------------------->
    const spinsNumberDiv = document.createElement("div");
    spinsNumberDiv.classList += "spinsNumberDiv";
    bottomArticle.appendChild(spinsNumberDiv);
    let selectionSpins = createButton(3);
    spinsNumberDiv.appendChild(selectionSpins);
    if (localStorage.getItem('spins') === null)
        selectionSpins.innerText = "Spins";
    else
        document.querySelector('#betButton3').innerText = "S:1";
    spinsNumberDiv.append(createList(3, 3));
    betFunctionality(3);


    //<----------------------------------------------------Coin Insertion Image---------------------------------------------------->
    const coinInsertionDiv = document.createElement("div");
    coinInsertionDiv.classList += "coinInsertionDiv";
    bottomArticle.appendChild(coinInsertionDiv);
    const coinInsertionImg = document.createElement("img");
    coinInsertionImg.classList += "coinInsertionImg";
    coinInsertionImg.src = "C:\\Projects\\new\\internship-2022\\public\\images\\insert.png";
    coinInsertionDiv.appendChild(coinInsertionImg);

    //<----------------------------------------------------Small Coin Image---------------------------------------------------->
    const smallCoinDiv = document.createElement("div");
    smallCoinDiv.classList += "smallCoinDiv";
    bottomArticle.appendChild(smallCoinDiv);
    const smallCoinImg = document.createElement("img");
    smallCoinImg.classList += "smallCoinImg";
    smallCoinImg.dataset.value = '20';
    smallCoinImg.src = "C:\\Projects\\new\\internship-2022\\public\\images\\20Coin.png";
    smallCoinDiv.appendChild(smallCoinImg);

    //<----------------------------------------------------Big Coin Image---------------------------------------------------->
    const bigCoinDiv = document.createElement("div");
    bigCoinDiv.classList += "bigCoinDiv";
    bottomArticle.appendChild(bigCoinDiv);
    const bigCoinImg = document.createElement("img");
    bigCoinImg.classList += "bigCoinImg";
    bigCoinImg.dataset.value = '50';
    bigCoinImg.src = "C:\\Projects\\new\\internship-2022\\public\\images\\50Coin.png";
    bigCoinDiv.appendChild(bigCoinImg);

    droppable();
}

//<----------------------------------------------------Create Buttons For Bottom Article---------------------------------------------------->

function createButton(number) {

    const selectionButton = document.createElement("button");
    selectionButton.classList += "betButton";
    selectionButton.id = "betButton" + number;

    return selectionButton;
}

//<----------------------------------------------------Create Lists For Bottom Article---------------------------------------------------->

function createList(number, option) {

    const list = document.createElement("ul");
    list.classList += "list";
    list.id = "list" + number;

    for (let i = 0; i < 5; i++) {
        const listItem = document.createElement("li");
        listItem.classList += "option";
        list.appendChild(listItem);

        const textField = document.createElement("a");
        textField.href = "#";
        if (option === 1) {
            textField.innerText = betVector[i] + "$";
        } else if (option === 2) {
            textField.innerText = "x" + betMultiplierVector[i];
        } else {
            textField.innerText = "S:" + spinsVector[i];
        }
        listItem.appendChild(textField);
    }

    return list;
}

//<----------------------------------------------------Bet Buttons Functionality---------------------------------------------------->

function betFunctionality(option) {

    let btn, dropdown, optionLinks;

    if (option === 1) {
        btn = document.querySelector("#betButton1");
        dropdown = document.querySelector("#list1");
        optionLinks = document.querySelectorAll("#list1 .option a");
    } else if (option === 2) {
        btn = document.querySelector("#betButton2");
        dropdown = document.querySelector("#list2");
        optionLinks = document.querySelectorAll("#list2 .option a");
    } else {
        btn = document.querySelector("#betButton3");
        dropdown = document.querySelector("#list3");
        optionLinks = document.querySelectorAll("#list3 .option a");
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        dropdown.classList.toggle("open");
    });

    for (let i = 0; i < optionLinks.length; i++) {
        optionLinks[i].addEventListener("mousedown", (event) => {
            event.preventDefault();

            dropdown.classList.remove("open");

            btn.innerText = optionLinks[i].innerText;
            const activeLink = document.querySelector(".option .active");

            if (activeLink) {
                activeLink.classList.remove("active");
            }

            optionLinks[i].classList.add("active");
            if (option === 2) {
                betMultiplier();
                localStorage.setItem('mul', btn.innerText);
            } else if (option === 1)
                localStorage.setItem('firstBetValue', document.querySelector("#betButton1").innerText);
            else if (option === 3) {
                localStorage.setItem('spins', document.querySelector("#betButton3").innerText);
                let spinsChosen = parseFloat(localStorage.getItem('spins').match(/[+-]?\d+(\.\d+)?/g));
                // let currentBetValue = parseFloat(document.querySelector("#betButton1").innerText.replace(/\D+$/g, ""));
                // let balance = parseFloat(localStorage.getItem('balance'));
                // if(currentBetValue * spinsChosen < balance)
                recursiveSpins(0, spinsChosen);
            }


        }, false);
    }
}

//<----------------------------------------------------Recursive FUnction---------------------------------------------------->

function recursiveSpins(currentSpin, maximum) {

    if (currentSpin >= maximum)
        return;

    let promise = new Promise(function (resolve, reject) {
        linesLogic();
        spinCounts();
        setTimeout(() => {
            resolve();
        }, 1000);
    });

    promise.then(() => {
        setTimeout(() => { recursiveSpins(parseFloat(currentSpin) + 1, maximum); }, 1000);
    });
}

//<----------------------------------------------------Multiplier Functionality---------------------------------------------------->

function betMultiplier() {
    let multiplier = document.querySelector("#betButton2").innerText;
    let numberSelector = multiplier.match(/[+-]?\d+(\.\d+)?/g);

    let betValues = document.querySelectorAll("#list1 .option a");
    for (let i = 0; i < betVector.length; i++) {
        let betNumber = parseFloat(betVector[i]) * parseFloat(numberSelector);

        betValues[i].innerText = betNumber + "$";
    }

    let buttonValue = localStorage.getItem('firstBetValue');
    if (buttonValue.localeCompare("Bet") !== 0) {
        let pureNumber = buttonValue.replace(/\D+$/g, "");
        pureNumber *= parseFloat(numberSelector);
        document.querySelector("#betButton1").innerText = pureNumber + "$";
        localStorage.setItem('bet', pureNumber + "$");
    }
}

//<----------------------------------------------------Drag and Drop---------------------------------------------------->

function handleDragStart(e) {
    this.style.opacity = '0';
    localStorage.setItem('currentCoin', this.dataset.value);
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}

function handleDragEnter(e) {
    this.classList.add('over');
}


function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDragOver(e) {
    e.preventDefault();
}

function droppable() {
    let coins = document.querySelectorAll("div .smallCoinImg, div .bigCoinImg");
    coins.forEach(function (coin) {
        coin.addEventListener('dragstart', handleDragStart);
        coin.addEventListener('dragend', handleDragEnd);
    })

    let slot = document.querySelector("div .coinInsertionImg");
    slot.addEventListener('dragenter', handleDragEnter);
    slot.addEventListener('dragleave', handleDragLeave);
    slot.addEventListener('dragover', handleDragOver);
    slot.addEventListener('drop', function (event) {
        event.preventDefault();

        let spinButtonAudio = new Audio("..\\public\\sounds\\coinInsert.mp3");
        spinButtonAudio.play();

        if (event.target.classList.contains('over')) {
            let balance = localStorage.getItem('balance');
            let currentCoinValue = localStorage.getItem('currentCoin');

            balance = parseFloat(balance) + parseFloat(currentCoinValue);
            localStorage.setItem('balance', balance);
            document.querySelector("p.balance").innerText = "Balance: " + balance + '$';

            if (parseFloat(localStorage.getItem('balance')) <= 0) {
                document.querySelector(".flexLayout").classList.add("show");
                localStorage.setItem("popup", "visible");
            } else {
                if (localStorage.getItem("popup") === "visible") {
                    document.querySelector(".flexLayout").classList.remove("show");
                    document.querySelector(".flexLayout").classList.add("hide");
                    localStorage.setItem("popup", "hidden");
                    setTimeout(() => {
                        document.querySelector(".flexLayout").classList.remove("hide");
                    }, 1000);
                    localStorage.setItem("popup", "hidden");
                }
            }

            this.classList.remove('over');
        }
    });
}