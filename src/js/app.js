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

console.log(addElements());