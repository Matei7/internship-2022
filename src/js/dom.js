//  Part I
//  1. Get the main content container
//  2. Get first post title
//  3. Get first post content
//  4. Get all post titles
//  5. Change the value for the first title
//  6. Change the URL for the first title link
//  7. Change the background color for the body
//  8. Add a new class to the articles then add styles

//  Part II
//  1.  Select the parent element for the first post title
//  2.  Select the first post and log the siblings
//  3.  Select the #main container and log the children

// Bonus Set the entry content with the current date and time and update it every x (as parameter) seconds

// 1.1
let mainContent = document.getElementById('main');
console.log(mainContent)

// 1.2
let firstPostTitle = document.querySelector(".post .entry-title a").innerText;
console.log(firstPostTitle)

//1.3
let firstPostContent = document.querySelector(".post .entry-content").innerText;
console.log(firstPostContent);

//1.4
let allPostTitle = [];
for (let element of document.querySelectorAll( '.post .entry-title')) {
    allPostTitle.push(element.innerText);
}
console.log(allPostTitle);

//1.5
document.querySelector(".post .entry-title a").innerText = "modified article";

//1.6
let firstPostlink =document.getElementById("gg");
firstPostlink.setAttribute("href", "https://stackoverflow.com/questions/4365246/how-to-change-href-of-a-tag-on-button-click-through-javascript")

//1.7
document.body.style.backgroundColor = "#C4BFBD";

//1.8
for (let element of document.querySelectorAll("article")){
    element.classList.add("newStyle");
    element.style.color = "red";
}

//2.1
let parentElement = document.querySelector(".post .entry-title").parentElement
console.log(parentElement)

//2.2
let siblings = []
let firstPost = document.querySelector(".post")
let nextSibling = firstPost.nextElementSibling;

while(nextSibling) {
    siblings.push(nextSibling)
    nextSibling = nextSibling.nextElementSibling;
}
console.log(siblings)

//2.3
let mainChildren = mainContent.children
console.log(mainChildren)

//bonus
setInterval(function() {
    let milliseconds = new Date().getTime();
    let dateObject = new Date(milliseconds);
    let humanDateFormat = dateObject.toLocaleString();
    document.querySelector(".post .entry-content").innerText = humanDateFormat;
}, 1000)


