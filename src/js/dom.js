//  Part I
//  1. Get the main content container
let doc = document;
doc.getElementById('main');
//  2. Get first post title
doc.querySelector('.post .entry-title');
//  3. Get first post content
doc.querySelector('.post .entry-content');
//  4. Get all post titles
doc.querySelectorAll('.post .entry-title');
//  5. Change the value for the first title
doc.querySelector('.post .entry-title a').innerHTML = 'Changed Title 1';
//  6. Change the URL for the first title link
doc.querySelector('.post .entry-title a').href = '#article-link-1-edited';
//  7. Change the background color for the body
doc.body.style.setProperty('background-color','#ff0000');
//  8. Add a new class to the articles then add styles
doc.querySelectorAll('article').forEach(el =>
    {
        el.classList.add("styled-post");
        el.style.setProperty('font-size', '30px');
        el.style.setProperty('color', '#00ffff');
    })
//  Part II
//  1.  Select the parent element for the first post title
doc.querySelector('.post .entry-title').parentElement;
//  2.  Select the first post and log the siblings
let kidsPost = doc.querySelector('.post').parentElement.children;
console.log('Logging siblings of first post element:\n');
for (let i = 1; i < kidsPost.length; i++) {
    console.log(kidsPost[i]);
}
//  3.  Select the #main container and log the children
let kidsMain = doc.querySelector('#main').children;
console.log('Logging children of main container:\n');
for (let i = 0; i < kidsMain.length; i++) {
    console.log(kidsMain[i]);
}
// Bonus Set the entry content with the current date and time and update it every x (as parameter) seconds
let myClock = doc.createElement('div');
myClock.setAttribute('id','clock');
myClock.style.setProperty("font-size","35px");
myClock.style.setProperty('color', '#0000ff');
doc.getElementById('main').appendChild(myClock);

let writeTime = (interval) => setInterval( () => {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        h = checkTime(h);
        m = checkTime(m);
        s = checkTime(s);
        doc.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
}
, interval);

function checkTime(i) {
    if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
    return i;
}
writeTime(2000);

