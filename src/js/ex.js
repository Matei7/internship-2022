import "../css/styles.scss";

//ex1
$(document).ready(function(){
    $("textarea").css("border", "1px solid red").add("p").css("border", "1px solid red");
});

//ex2
$(document).ready(function(){
    $("textarea").add("p").add("span").css("background-color", "red");
});

//ex3
$(document).ready(function(){
    $("body").append($("<p>some text</p>"));
});

//ex4 ??

//ex5
