const betMultiplierVector = [0.5, 1, 2, 4, 8];
const betVector = [1, 5, 10, 50, 100,];

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

}

//<----------------------------------------------------Create Buttons For Middle Article---------------------------------------------------->

function createButton(number) {

    const selectionButton = document.createElement("button");
    selectionButton.classList += "betButton";
    selectionButton.id = "betButton" + number;

    return selectionButton;
}

//<----------------------------------------------------Create Lists For Middle Article---------------------------------------------------->

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
        } else {
            textField.innerText = "x" + betMultiplierVector[i];
        }
        listItem.appendChild(textField);
    }

    return list;
}

function betFunctionality(option) {

    let btn, dropdown, optionLinks;

    if (option === 1) {
        btn = document.querySelector("#betButton1");
        dropdown = document.querySelector("#list1");
        optionLinks = document.querySelectorAll("#list1 .option a");
    } else {
        btn = document.querySelector("#betButton2");
        dropdown = document.querySelector("#list2");
        optionLinks = document.querySelectorAll("#list2 .option a");
    }

    console.log(optionLinks);

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
            if (option === 2){
                betMultiplier();
                localStorage.setItem('mul', btn.innerText);
            }

            if (option === 1)
                localStorage.setItem('firstBetValue', document.querySelector("#betButton1").innerText);
        }, false);
    }
}

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