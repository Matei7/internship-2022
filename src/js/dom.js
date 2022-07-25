//  Part I
//  1. Get the main content container
//  2. Get first post title
//  3. Get first post content
//  4. Get all post titles
//  5. Change the value for the first title
//  6. Change the URL for the first title link
//  7. Change the background color for the body
//  8. Add a new class to the articles then add styles

// Bonus Set the entry content with the current date and time and update it every x (as parameter) seconds

// Part I
function getMainContent() {
    let mainContainer = document.getElementById("main");
    console.log(mainContainer);
}

function getFirstPostTitle() {
    let firstPostTitle = document.getElementById("gg").textContent;
    console.log(firstPostTitle);
}

function getFirstPost() {
    let firstPostContent = document.getElementById("main").firstElementChild;
    console.log(firstPostContent.nextElementSibling.textContent);
}

function getAllPostTitles() {
    let allPostTitles = document.getElementsByClassName("post");
    for (const element in allPostTitles) {
        console.log(allPostTitles.item(element).firstElementChild.textContent);
    }
    // console.log(allPostTitles.item(0).firstElementChild.textContent);
    // console.log(allPostTitles.item(1).firstElementChild.textContent);
    // console.log(allPostTitles.item(2).firstElementChild.textContent);
}

function changeValueOfFirstTitle() {
    let firstPostTitle = document.getElementById("gg");
    firstPostTitle.innerHTML = "Article Title 1 changed...";
    console.log(firstPostTitle.textContent);
}

function changeFirstUrlLink() {
    document.getElementById("gg").href = "https://www.w3schools.com/jsref/prop_anchor_href.asp";
    console.log("Changed link for the first title.")
}

function changeColorOfBody() {
    document.body.style.backgroundColor = "#B1D4E0";
    console.log("Changed color of body");
}

function addedNewClass() {
    const newClassArray = [...document.querySelectorAll('.post')];
    for (const element of newClassArray) {
        element.classList.add('styledClass');
    }
}

//  Part II
//  1.  Select the parent element for the first post title
//  2.  Select the first post and log the siblings
//  3.  Select the #main container and log the children

function parentElement() {
    let firstChild = document.getElementById("main").firstElementChild;
    let firstContent = firstChild.nextElementSibling;
    console.log(firstContent.firstElementChild.parentElement.nodeName);
}

function firstPostSiblings() {
    const newClassArray = [...document.querySelectorAll('.post')];
    for (const element of newClassArray) {
        console.log("Siblings: " + element);
    }
}

function getAllMainChildren() {
    let parent = document.getElementById('main');
    let children = parent.children;
    for (const element of children) {
        console.log(element);
    }
}

function dateAndTime(x) {
    let entryContentParent = document.getElementsByClassName("entry-content");
    for (let i = 0; i < entryContentParent.length; i++) {
        setInterval(function () {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;
            entryContentParent.item(i).firstElementChild.innerHTML = dateTime;
        }, x);
    }
}

function main() {
    getMainContent();
    getFirstPostTitle();
    getFirstPost();
    getAllPostTitles();
    changeValueOfFirstTitle();
    changeFirstUrlLink();
    changeColorOfBody();
    addedNewClass();

    parentElement();
    firstPostSiblings();
    getAllMainChildren();

    // bonus
    dateAndTime(1000);
}

main();