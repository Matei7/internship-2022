import $ from "jquery";

import { addImage } from "./middleArticle";

export function createUser(mail) {
    $.ajax({
        method: "POST",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/user",
        data: { email: mail }
    }).done(function (msg) {
    });
}

export function getUser(mail) {
    $.ajax({
        method: "GET",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/user",
        data: { email: mail }
    }).done(function (msg) {
        localStorage.setItem('mailFound', "true");
    }).fail(function(msg) {
        alert("This mail address does not exist");
    });
}

export function saveLastData(mail, username, imageArray, balance) {
    $.ajax({
        method: "POST",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data/",
        data: {
            email: mail,
            key: username,
            data: {
                "lastArray": imageArray,
                "balance": balance
            },
            timestamp: "currentTime"
        }
    }).done(function (msg) {
    });
}

export function getLastData(mail, username) {
    let lastSetSrc = [];

    return $.ajax({
        method: "GET",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data/?email=" + mail + "&key=" + username + "&timestamp=currentTime",
        data: { email: mail, key: username}
    }).done(function (msg) {
        localStorage.setItem("balance", msg.data[0].value.balance.toString());
        lastSetSrc = msg.data[0].value.lastArray;
        for(let i = 0; i < 9; i++){
            addImage(lastSetSrc[i][0], lastSetSrc[i][1]);
            console.log(lastSetSrc[i][1]);
        }
    })
    .fail(function(msg) {
        console.log("Failure reason: " + msg);
    })
}