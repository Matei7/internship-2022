import "../css/styles.scss";

import {middleArticle} from "./middleArticle";
import {createImages} from "./middleArticle";
import {buttonEvent} from "./middleArticle";
import {bottomArticle} from "./bottomArticle";
import {createUser} from "./ajax";

function addElements() {
    
    //createUser("codrescu.razvan@gmail.com");

    middleArticle();
    bottomArticle();
    createImages();
    buttonEvent();
    
}

console.log(addElements());