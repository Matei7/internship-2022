const slotImages = [];
const lastSet = [];

export function middleArticle() {
    const articleLayout = document.createElement("article");
    articleLayout.classList += "middleArticle";
    document.querySelector('#app').appendChild(articleLayout);

    const gridInterface = document.createElement("div");
    gridInterface.classList += "gridLayout";
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
        document.querySelector(".gridLayout").appendChild(divImage);

    slotImages.push(divImage);
}

export function createImages() {


    for (let i = 0; i < 81; i++) {
        addImage("7-512.webp", 2);
        addImage("Grapes-512.webp", 1.6);
        addImage("Bananas-512.webp", 1.1);
        addImage("Watermelon-512.webp", 1.5);
        addImage("casino_token-512.webp", 1);
        addImage("Cherry-512.webp", 1.3);
        addImage("LEMON-512.webp", 1.2);
        addImage("power-stars-f1.png", 1.7);
        addImage("strawberry-512.webp", 1.4);
    }
}

function removeAllFields() {
    const gridInterface = document.querySelector('.gridLayout');
    while (gridInterface.firstChild)
        gridInterface.removeChild(gridInterface.firstChild);
}

export function buttonEvent() {
    const spinButton = document.querySelector('.spinButton');
    spinButton.addEventListener('click', () => {
        let bettingSum = document.querySelector('#betButton1').innerText.replace(/\D+$/g, "");
        if (parseFloat(localStorage.getItem('balance')) >= parseFloat(bettingSum)) {
            removeAllFields();

            slotImages.sort(() => Math.random() - 0.5);
            for (let i = 0; i < 9; i++) {
                let currentImage = slotImages[i];
                document.querySelector(".gridLayout").appendChild(currentImage);

                if((i + 1) % 3 === 0){
                    let childrenVector = document.querySelector(".gridLayout").childNodes;
                    if((currentImage.dataset.value === childrenVector[i - 1].dataset.value) && (currentImage.dataset.value === childrenVector[i - 2].dataset.value)){
                        
                        let multiplier = parseFloat(currentImage.dataset.value) * 3.0;
                        childrenVector[i - 2].querySelector(".slotImages").classList.add("blink");
                        childrenVector[i - 1].querySelector(".slotImages").classList.add("blink");
                        childrenVector[i].querySelector(".slotImages").classList.add("blink");

                        let currentBetValue = parseFloat(document.querySelector("#betButton1").innerText.replace(/\D+$/g, ""));
                        let balance = parseFloat(localStorage.getItem("balance"));
                        balance += currentBetValue * multiplier;
                        localStorage.setItem("balance", balance);

                        document.querySelector(".balance").innerText = "Balance: " + balance + "$";
                    }
                }
            }

            spinCounts();
        }
    });

    document.addEventListener('keyup', (event) => {
        let bettingSum = document.querySelector('#betButton1').innerText.replace(/\D+$/g, "");
        if (parseFloat(localStorage.getItem('balance')) >= parseFloat(bettingSum)) {
            if ((event.code === 'Space') || (event.code === ' ')) {
                event.preventDefault();
                event.stopPropagation();
                removeAllFields();

                slotImages.sort(() => Math.random() - 0.5);
                for (let i = 0; i < 9; i++) {
                    let currentImage = slotImages[i];
                    document.querySelector(".gridLayout").appendChild(currentImage);

                    if((i + 1) % 3 === 0){
                        let childrenVector = document.querySelector(".gridLayout").childNodes;
                        if((currentImage.dataset.value === childrenVector[i - 1].dataset.value) && (currentImage.dataset.value === childrenVector[i - 2].dataset.value)){
                            
                            let multiplier = parseFloat(currentImage.dataset.value) * 3.0;
                            childrenVector[i - 2].querySelector(".slotImages").classList.add("blink");
                            childrenVector[i - 1].querySelector(".slotImages").classList.add("blink");
                            childrenVector[i].querySelector(".slotImages").classList.add("blink");

                            let currentBetValue = parseFloat(document.querySelector("#betButton1").innerText.replace(/\D+$/g, ""));
                            let balance = parseFloat(localStorage.getItem("balance"));
                            balance += currentBetValue * multiplier;
                            localStorage.setItem("balance", balance);

                            document.querySelector(".balance").innerText = "Balance: " + balance + "$";
                        }
                    }
                }

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

function spinCounts() {
    let balance = parseFloat(localStorage.getItem('balance'));
    let currentBet = parseFloat(document.querySelector('#betButton1').innerText);
    if (balance >= currentBet) {
        balance -= parseFloat(currentBet);
        localStorage.setItem('balance', balance);
        document.querySelector('.balanceDiv p').innerText = "Balance: " + balance + "$";
    }

    popupReload();
}

function popupReload() {
    if (parseFloat(localStorage.getItem('balance')) <= 0) {
            document.querySelector(".gridLayout").classList.add("show");
            localStorage.setItem("popup", "visible");
    } else {
        if (localStorage.getItem("popup") === "visible") {
            document.querySelector(".gridLayout").classList.remove("show");
            document.querySelector(".gridLayout").classList.add("hide");
            setTimeout( () => {
                document.querySelector(".gridLayout").classList.remove("hide");
            }, 1000);
            localStorage.setItem("popup", "hidden");
        }
    }
}