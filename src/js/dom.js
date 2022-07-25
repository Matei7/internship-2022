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

function partIMethod() {
    const container = document.getElementById('main');
    console.log(container);

    const firstPostTitle = document.getElementById('gg');
    console.log("First post title: " + firstPostTitle.textContent);

    const firstPostContent = document.querySelector('.entry-content p').textContent;
    console.log("First post content: " + firstPostContent);

    const allPostTitles = document.querySelectorAll('.entry-title a');
    allPostTitles.forEach(function (entryPost) {
        console.log(entryPost.textContent);
    });

    document.querySelector('.entry-title a').innerText = 'New Title';

    document.querySelector('.entry-title a').href = 'index.html';

    document.body.style.backgroundColor = 'lightgreen';

    allPosts = document.querySelectorAll('article');
    let inc = 1;


    allPosts.forEach(function (entryPost) {

        entryPost.className += 'secondClass';
        entryPost.style.fontFamily = 'Arial';

        //Initial credeam ca trebuie adaugat un element nou
        const newParagraph = document.createElement('p');
        newParagraph.style.color = 'darkorange';
        newParagraph.style.fontWeight = 'bolder';
        newParagraph.style.fontSize = '20px';
        newParagraph.innerText = 'New Paragraph ' + inc;

        inc++;

        entryPost.appendChild(newParagraph);
    })

}

function partIIMethod(){
    //1.
    const firstPostParent = document.querySelector('.entry-title').parentElement;
    console.log(firstPostParent);

    //2.
    const firstPostSibling = document.querySelector('article').nextElementSibling;
    const nextPostSibling = firstPostSibling.nextElementSibling;
    console.log(firstPostSibling.innerText);
    console.log(nextPostSibling.innerText);

    //3.
    console.log("Body's children: ");
    const main = document.getElementById('main');
    for(let i = 0; i < main.children.length; i++){
        console.log(main.children[i].tagName);
    }

}

function getDateTime(x){
    const today = new Date();

    let date = today.getDay() + "-" + today.getMonth() + "-" + today.getFullYear();

    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const newParagraph = document.createElement('p');
    newParagraph.innerText = date + " " + time;
    document.body.appendChild(newParagraph);

    window.setInterval('refresh()', x);

}

function refresh() {
    window.location.reload();
}

console.log(getDateTime(3000));
console.log(partIMethod());
console.log(partIIMethod());