import $ from "jquery";

export function createUser(mail) {
    $.ajax({
        method: "POST",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/user",
        data: { email: mail }
    }).done(function (msg) {
        alert("Data Saved: " + msg);
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
            }
        }
    }).done(function (msg) {
        alert("Data Saved: " + msg);
    });
}

export function getLastData(mail, username) {
    return $.ajax({
        method: "GET",
        url: "https://vlad-matei.thrive-dev.bitstoneint.com/wp-json/chess-api/v1/data/",
        data: { email: mail, key: username }
    }).done(function (msg) {
        alert("Data Saved: " + msg);
    });
}