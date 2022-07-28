import "../css/style-jQuery.scss";
import $ from "jquery";

// ex 1
$('<div>', {
    class: 'ex1Div',
}).appendTo('body');

$('<div>', {
    class: 'paragraphDiv1',
}).appendTo('body');

$('.ex1Div').append("<textarea class='ex1TextArea'>jQuery</textarea>");
$('.ex1Div').append("<textarea class='ex1TextArea'>JavScript</textarea>");

$('.paragraphDiv1').append("<p id='ex1P1'>jQuery</p>");
$('.paragraphDiv1').append("<p id='ex1P2'>JavaScript</p>");
$('.paragraphDiv1').append("<button id=\"button1\">Click to see the effect</button>");

$("#button1").click(function () {
    $(".ex1TextArea").css("border", "2px solid red");
    $("#ex1P1").css("border", "2px solid red");
    $("#ex1P2").css("border", "2px solid red");
})

// ex 2
$('<div>', {
    class: 'ex2Div',
}).appendTo('body');

$('<textarea>', {
    class: 'textArea2',
}).appendTo('.ex2Div');

$('.textArea2').val("TutoRIAL");

$('<p>', {
    class: 'p2',
    id : 'p2_1'
}).appendTo('.ex2Div');

$('<p>', {
    class: 'p2',
    id : 'p2_2'
}).appendTo('.ex2Div');

$('#p2_1').text("jQuery");
$('#p2_2').text("Exercises");
$('.ex2Div').append("<button id='button2'>Click to see the effect</button>");

$("#button2").click(function () {
    $(".textArea2").css("background-color", "red").add(".p2").css("background-color", "red");
})

// ex3
$('<div>', {
    class: 'ex3Div',
}).appendTo('body');

$('<p>', {
    id : 'p3'
}).appendTo('.ex3Div');

$('#p3').text("jQuery");
$('#p3').add("<span>Exercises</span>").appendTo(".ex3Div");

// ex4
$('<div>', {
    class: 'ex4Div',
}).appendTo('body');

$('.ex4Div').append("<div class='left'></div>");
$('.ex4Div').append("<div class='right'></div>");

$('.left').append("<p class='leftP'></p>");
$('.right').append("<p class='rightP'></p>");

$('.leftP').append("<p class='ex4p'><strong>Before <code>addBack()</code></strong></p>");
$('.rightP').append("<p class='ex4p'><strong>After <code>addBack()</code></strong></p>");

$('.leftP').append("<div class='leftAddBack'></div>");
$('.rightP').append("<div class='rightAddBack'></div>");

$('.leftAddBack').append("<p class='ex4p'>JavaScript</p>");
$('.leftAddBack').append("<p class='ex4p'>jQuery</p>");

$('.rightAddBack').append("<p class='ex4p'>JavaScript</p>");
$('.rightAddBack').append("<p class='ex4p'>jQuery</p>");

$( "div.left, div.right" ).find( "div, div > p" ).addClass( "border" );
$( "div.leftAddBack" ).find( "p" ).addClass( "background" );
$( "div.rightAddBack" ).find( "p" ).addBack().addClass( "background" );

// ex5
$('<div>', {
    class: 'ex5Div',
}).appendTo('body');

$('.ex5Div').append("<p class='ex5p'>PHP</p>");
$('.ex5Div').append("<p class='ex5p'>Java</p>");
$('.ex5Div').append("<p id='last' class='ex5p'>Python</p>");

$('#last').addClass("w3r_font_color w3r_background");

// ex7
$('<div>', {
    class: 'ex7Div',
}).appendTo('body');

$('.ex7Div').append("<p id='ex7p' class='w3r_bg_orange'>The best way we learn anything is by practice and exercise questions.</p>");
$('#ex7p').addClass("w3r_bg_orange");
$('.ex7Div').append("<button id='button3'>Click to see the effect</button>");
$('#button3').click(function () {
    $('#ex7p').addClass(function (index, currentClass) {
        let addedClass;
        if(currentClass === "w3r_bg_orange") {
            addedClass = "w3r_bg_red";
        }
        return addedClass;
    });
});

