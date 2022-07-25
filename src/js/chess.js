
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function main(){
    let doc = document;
    let time = 5;
    doc.getElementById('counter').style.setProperty("font-size","35px");
    doc.getElementById('counter').style.setProperty("color","#aee8bf");
    while(time >= 0){
        time -= 1;
        doc.querySelector('.counter').innerHTML = time + 1 +' ';
        sleep(1000);
    }
}
console.log("running main " + main())