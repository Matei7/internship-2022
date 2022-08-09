import "../css/styles.scss";

import { middleArticle, createImages, buttonEvent, logoutFunction } from "./middleArticle";
import { bottomArticle } from "./bottomArticle";

function addElements() {

    let mail = localStorage.getItem('email');
    if(mail === '' || mail === null){
        window.location.replace("../public/login.html");
    }
    middleArticle();
    bottomArticle();
    createImages();
    buttonEvent();
    logoutFunction();
}

console.log(addElements());