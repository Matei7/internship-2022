import "../css/styles.scss";

import { middleArticle, createImages, buttonEvent, logoutFunction } from "./middleArticle";
import { bottomArticle } from "./bottomArticle";

function addElements() {

    middleArticle();
    bottomArticle();
    createImages();
    buttonEvent();
    logoutFunction();
}

console.log(addElements());