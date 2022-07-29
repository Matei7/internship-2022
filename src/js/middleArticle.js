const slotImages = [];
const lastSet = [];

export function middleArticle(){
    const articleLayout = document.createElement("article");
    articleLayout.classList += "middleArticle";
    document.querySelector('#app').appendChild(articleLayout);

    const girdInterface = document.createElement("div");
    girdInterface.classList += "gridLayout";
    document.querySelector('.middleArticle').appendChild(girdInterface);

    const spinButtonDiv = document.createElement("div");
    spinButtonDiv.classList += "spinDiv";
    document.querySelector('.middleArticle').appendChild(spinButtonDiv);

    const spinButton = document.createElement("button");
    spinButton.classList += "spinButton";
    spinButton.innerText = "SPIN!";
    document.querySelector('.spinDiv').appendChild(spinButton);
}

function addImage(url) {
    let divImage = document.createElement("div");
    divImage.classList += "divImg";
    let number = slotImages.length + 1;
    divImage.id = "div" + number;
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
        addImage("7-512.webp");
        addImage("Grapes-512.webp");
        addImage("Bananas-512.webp");
        addImage("Watermelon-512.webp");
        addImage("casino_token-512.webp");
        addImage("Cherry-512.webp");
        addImage("LEMON-512.webp");
        addImage("power-stars-f1.png");
        addImage("strawberry-512.webp");
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
        removeAllFields();

        slotImages.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 9; i++) {

            let currentImage = slotImages[i];
            document.querySelector(".gridLayout").appendChild(currentImage);
        }

        spinCounts();
    });

    document.addEventListener('keyup', (event) => {
        if ((event.code === 'Space') || (event.code === ' ')) {
            event.preventDefault();
            event.stopPropagation();
            removeAllFields();

            slotImages.sort(() => Math.random() - 0.5);
            for (let i = 0; i < 9; i++) {

                let currentImage = slotImages[i];
                document.querySelector(".gridLayout").appendChild(currentImage);
            }

            const spinButton = document.querySelector(".spinButton");
            spinButton.style.boxShadow = "none";
            spinButton.style.color = "black";
        }
    });

    document.addEventListener('keydown', (event) => {
        if ((event.code === 'Space') || (event.code === ' ')) {
            event.preventDefault();
            event.stopPropagation();
            const spinButton = document.querySelector(".spinButton");
            spinButton.style.boxShadow = "10px 10px 5px grey";
            spinButton.style.color = "red";
            spinCounts();
        }
    });
}

function spinCounts(){
    let balance = parseFloat(localStorage.getItem('balance'));
    let currentBet = parseFloat(document.querySelector('#betButton1').innerText);
    if(balance >= currentBet){
        balance -= parseFloat(currentBet);
        localStorage.setItem('balance', balance);
        document.querySelector('.balanceDiv p').innerText = "Balance: " + balance + "$";
    }
}