import "../css/styles.scss";

import {middleArticle} from "./middleArticle";
import {createImages} from "./middleArticle";
import {buttonEvent} from "./middleArticle";
import {bottomArticle} from "./bottomArticle";

function addElements() {
    
    middleArticle();
    bottomArticle();
    createImages();
    buttonEvent();
    //hideGridLayout();
    
}

function hideGridLayout(){
    let balance = localStorage.getItem('balance');

    if(balance === '0'){
        document.querySelector(".gridLayout").classList.toggle("glide");
    }
}

console.log(addElements());