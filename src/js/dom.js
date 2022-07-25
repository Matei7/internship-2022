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
console.log("fsdf")

function exPartI(){

    //  1. Get the main content container
    const mainContainer = document.getElementById("main");
    console.log("The main content container:")
    console.log(mainContainer);

    //  2. Get first post title
    const firstPostTitle = document.getElementById("gg").innerHTML;
    console.log("First post title:")
    console.log(firstPostTitle);

    //  3. Get first post content
    const firstPostContent = document.getElementsByTagName('p')[0].innerHTML;
    console.log("First post content:");
    console.log(firstPostContent);

    //  4. Get all post titles
    const allPostTitles = document.getElementsByTagName('a');
    let i;
    console.log("All post titles:");
    for(i=0;i<allPostTitles.length;i++) {
        console.log(allPostTitles[i].innerHTML);
    }

    //  5. Change the value for the first title
    const changeFirstTitle = document.getElementById("gg").innerHTML = "Article Title 1 Changed";
    console.log("The new first title is: ");
    console.log(changeFirstTitle);

    //  6. Change the URL for the first title link
    const changeTheURL = document.getElementsByTagName("a")[0].setAttribute("href", "#article-link-1-changed");
    console.log("New URL for the first title is: ");
    console.log(changeTheURL);

    //  7. Change the background color for the body
    const body = document.body.style.backgroundColor = "thistle";
    console.log(body);

    //  8. Add a new class to the articles then add styles
    const element =[...document.querySelectorAll(".post")];
    let j;
    for(j = 0;j < element.length; j++) {
        element[j].classList.add("new-class");
    }
}

function main(){
    exPartI();
}

main()