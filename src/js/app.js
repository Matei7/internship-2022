import "../css/styles.scss";

function addButtons() {
    for (let i = 0; i < 200; i++) {
        const newButton = document.createElement("button");
        newButton.style.borderRadius = '50%';
        newButton.style.width = "100%";
        newButton.style.height = "100%";
        newButton.style.opacity = "0.5";
        let pressed = 0;
        newButton.addEventListener("click", function () {
            if (pressed === 0) {
                pressed = 1;
                newButton.style.backgroundColor = 'red';
            }
        });
        document.querySelector(".buttonGrid").appendChild(newButton);
    }
}

const slotImages = [];

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

function createImages() {


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

function middleArticle(){
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

function bottomArticle(){
    const bottomArticle = document.createElement("article");
    bottomArticle.classList += "bottomArticle";
    document.querySelector('#app').appendChild(bottomArticle);

    const balanceDiv = document.createElement("div");
    balanceDiv.classList += "balanceDiv";
    bottomArticle.appendChild(balanceDiv);

    const balanceWindow = document.createElement('p');
    balanceWindow.classList += "balance";
    balanceWindow.innerText = "Balance: 500$";
    balanceDiv.appendChild(balanceWindow);
}

function addElements() {
    
    middleArticle();
    bottomArticle();
    
}

function removeAllFields() {
    const gridInterface = document.querySelector('.gridLayout');
    while (gridInterface.firstChild)
        gridInterface.removeChild(gridInterface.firstChild);
}

function buttonEvent() {
    const spinButton = document.querySelector('.spinButton');
    spinButton.addEventListener('click', () => {
        removeAllFields();

        slotImages.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 9; i++) {

            let currentImage = slotImages[i];
            document.querySelector(".gridLayout").appendChild(currentImage);
        }
    });

    document.addEventListener('keyup', (event) => {
        if ((event.code === 'Space') || (event.code === ' ')) {
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
            const spinButton = document.querySelector(".spinButton");
            spinButton.style.boxShadow = "10px 10px 5px grey";
            spinButton.style.color = "red";
        }
    });
}


console.log(addElements());
console.log(createImages());
console.log(buttonEvent());