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

const mainContentContainer = document.getElementById( 'main' );
console.log(mainContentContainer);

const entryTitleElements = document.getElementsByClassName('entry-title');
console.log(entryTitleElements[0].innerText);

const entryContentElements = document.getElementsByClassName('entry-content');
console.log(entryContentElements[0].innerText);

for (let i = 0; i < entryTitleElements.length; i++)
{
    console.log(entryTitleElements[i].innerText);
}

entryTitleElements[0].children[0].innerText = "Article Title 1 Changed";
console.log(entryTitleElements[0].children[0].innerText);

entryTitleElements[0].children[0].href = "#article-link-changed";
console.log(entryTitleElements[0].children[0].href);

document.body.style.backgroundColor = "#ccffff";

const articleElements = document.getElementsByTagName('article');
for(let i = 0; i < articleElements.length; i++)
{
    articleElements[i].classList.add('articleClass');
    articleElements[i].style.setProperty('color', '#009900');
    articleElements[i].style.setProperty('font-family', 'Arial, Helvetica, sans-serif');
}

const postElements = document.getElementsByClassName('post');
console.log(postElements[0].parentElement);

for(let i = 0; i < postElements.length-1; i++)
{
    console.log(postElements[i].nextElementSibling);
}

console.log(mainContentContainer.children);

function displayTime()
{
    entryContentElements[0].children[0].innerText = new Date().toLocaleString();
}
setInterval(displayTime, 1000);

