//  Part I
//  1. Get the main content container
let mainContent = document.getElementById('main');
//  2. Get first post title
let firstPostTitle = document.querySelector('.post .entry-title').innerText;
//  3. Get first post content
let firstPostContent = document.querySelector('.post .entry-content').innerText;
//  4. Get all post titles
let allPostTitle = [];
for (let element of document.querySelectorAll('.post .entry-title')){
    allPostTitle.push(element.innerText);
}
//  5. Change the value for the first title
document.querySelector('.post .entry-title a').innerText = 'Just Title 1'
//  6. Change the URL for the first title link
let firstTitleLink = document.getElementById("gg");
firstTitleLink.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
//  7. Change the background color for the body
document.body.style.setProperty('background-color', '#1991C5');
//  8. Add a new class to the articles then add styles
document.querySelectorAll('article').forEach(element =>
    {
        element.classList.add('my_style_post');
        element.style.setProperty('color', '#1A485C');
        element.style.setProperty('padding', '15px');
    })

//  Part II
//  1.  Select the parent element for the first post title
document.querySelector('.post .entry-title').parentElement;
//  2.  Select the first post and log the siblings
console.log("Fratii primului post: ");
let theKidsOfPost = document.querySelector('.post').parentElement.children;
for(let i = 0; i < theKidsOfPost.length; ++i){
    console.log(theKidsOfPost[i]);
}
//  3.  Select the #main container and log the children
console.log("Copii lui main container: ")
let kidsOfMain = document.querySelector('#main').children;
for (let i = 0; i < kidsOfMain.length; ++i){
    console.log(kidsOfMain[i])
}
// Bonus Set the entry content with the current date and time and update it every x (as parameter) seconds
