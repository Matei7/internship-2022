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

// ex 8
$('<div>', {
    class: 'ex8Div',
}).appendTo('body');

$('.ex8Div').append("<p id='ex8p'>jQuery Exercises</p>");
$('.ex8Div').append("<button id='button4'>Click to see the effect</button>");

$('#button4').click(function() {
    $('#ex8p').after("<b><i>With solution.</i></b>");
});

// ex 9
$('<div>', {
    class: 'ex9Div',
}).appendTo('body');

$('.ex9Div').append("<p id='ex9p'>jQuery Exercises</p>");
$('.ex9Div').append("<button id='button5'>Click to see the effect</button>");

$('#button5').click(function() {
    $('#ex9p').after(document.createTextNode("with solution."));
});

// ex 10
$('<div>', {
    class: 'ex10Div',
}).appendTo('body');

$('.ex10Div').append("<span>with solution</span>");
$('.ex10Div').append("<p id='ex10p'>jQuery Exercises</p>");
$('.ex10Div').append("<button id='button6'>Click to see the effect</button>");

$('#button6').click(function() {
    $('#ex10p').after($("span"));
});

// ex 17
$('<div>', {
    class: 'ex17Div',
}).appendTo('body');

$('.ex17Div').append("<div id='div17'>This is a division</div>");
$('.ex17Div').append("<span id='span17'>This is a span</span>");
$('.ex17Div').append("<p id='ex17p'>This is a paragraph</p>");
$('.ex17Div').append("<button id='button7'>Click to see the effect</button>");

$('#button7').click(function() {
    let elementCount = $("*").css("border", "3px solid blue").length;
    $( ".ex17Div" ).prepend( "<h2>" + elementCount + " elements found</h3>" );
});

// ex 18
$('<div>', {
    class: 'ex18Div',
}).appendTo('body');

$('.ex18Div').append("<div id='div18'>This is a division</div>");
$('.ex18Div').append("<span id='span18'>This is a span</span>");
$('.ex18Div').append("<p id='ex18p'>This is a paragraph</p>");
$('.ex18Div').append("<button id='button8'>Click to see the effect</button>");

$('#button8').click(function() {
    let elementCount = $(".ex18Div").find("*").css("border", "3px solid blue").length;
    $( ".ex18Div" ).prepend( "<h2>" + elementCount + " elements found</h3>" );
});

// ex 19
$('<div>', {
    class: 'ex19Div',
}).appendTo('body');

$('.ex19Div').append("<p id='ex19p'>This is a paragraph</p>");
$('.ex19Div').append("<button id='button9'>Click to see the effect</button>");

$('#button9').click(function() {
    $('#ex19p').animate({
       width: "70%",
       opacity: 0.4,
       marginLeft: "0.6in",
       fontSize: "2em",
       borderWidth: "10px"
    }, 2000);
});

// ex 20
$('<div>', {
    class: 'ex20Div',
}).appendTo('body');
$('.ex20Div').append("<button id='buttonLeft'>&lt;</button>");
$('.ex20Div').append("<button id='buttonRight'>&gt;</button>");

$('body').append("<div class='ex20DivIn'></div>");
$('.ex20DivIn').append("<div class='ex20DivInSquare'></div>");

$("#buttonLeft").click(function () {
    $('.ex20DivInSquare').animate({"left": "-=30px"}, "slow");
});

$("#buttonRight").click(function () {
    $('.ex20DivInSquare').animate({"left": "+=30px"}, "slow");
});

// ex 21
$('<div>', {
    class: 'ex21Div',
}).appendTo('body');
$('.ex21Div').append("<button id='button21'>Run</button>");
$('.ex21Div').append("<div class='div21'></div> <div class='div21'></div> <div class='div21'></div> <div class='div21'></div>");

$("#button21").click(function () {
    $( ".div21:first" ).animate({
        left: 100
    }, {
        duration: 1000,
        step: function( now ){
            $( ".div21:gt(0)" ).css( "left", now );
        }
    });
});

// ex 22
$('<div>', {
    class: 'ex22Div',
}).appendTo('body');
$('.ex22Div').append("<div class='div22' id='div22_1'></div> <div class='div22' id='div22_2'></div> <div class='div22' id='div22_3'></div>");
$('.ex22Div').append("<button id='button22'>Click to see the effect</button>");

$("#button22").click(function () {
    $(".div22:animated").toggleClass("colored");
});

function animateIt() {
    $("#div22_1, #div22_2").slideToggle("slow", animateIt);
}
animateIt();

// ex 23
$('<div>', {
    class: 'ex23Div',
}).appendTo('body');
$('.ex23Div').append("<p class='p23'>JavaScript</p> <p class='p23'>jQuery</p");
$('.ex23Div').append("<button id='button23'>Click to see the effect</button>");

$("#button23").click(function () {
    $('.p23').append(document.createTextNode(" Exercises"));
});

// ex 24
$('<div>', {
    class: 'ex24Div',
}).appendTo('body');
$('.ex24Div').append("<strong class='strong24'> Exercises</strong> <p class='p24'>JavaScript</p> <p class='p24'>jQuery</p");
$('.ex24Div').append("<button id='button24'>Click to see the changes</button>");

$("#button24").click(function () {
    $('.p24').append($(".strong24"));
});

// ex 25
$('<div>', {
    class: 'ex25Div',
}).appendTo('body');
$('.ex25Div').append("<p class='p25'>JavaScript</p> <p class='p25'>jQuery</p");
$('.ex25Div').append("<button id='button25'>Click to see the changes</button>");

$("#button25").click(function () {
    $('.p25').append(document.createTextNode(" Exercises"));
});

// ex 26
$('<div>', {
    class: 'ex26Div',
}).appendTo('body');
$('.ex26Div').append("<p class='p26'>JavaScript</p> <span class='span26'> jQuery</span");
$('.ex26Div').append("<button id='button26'>Click to see the changes</button>");

$("#button26").click(function () {
    $('.span26').appendTo('.p26');
});

// ex 27
$('<div>', {
    class: 'ex27Div',
}).appendTo('body');
$('.ex27Div').append("<input id='check1' type='checkbox' checked='checked'>");
$('.ex27Div').append("<label for='check1'>Check me</label>");
$( "input" )
    .change(function() {
        let $input = $( this );
        console.log(".attr( 'checked' )");
        console.log(".prop( 'checked' ): " +$input.prop( "checked" ));
        console.log(".is( ':checked' ): " + $input.is( ":checked" ));
    })
    .change();

// ex 28
$('<div>', {
    class: 'ex28Div',
}).appendTo('body');
$('.ex28Div').append("<p class='p28'>jQuery Exercises, Practice, <em title=\"Real life jQuery or all.\">Solution</em>.</p>");
$('.ex28Div').append("<p id='p28'></p>");
$('.ex28Div').append("<button id='button28'>Click to see the effect</button>");

$('#button28').click(function(){
    let title = $( "em" ).attr( "title" );
    $("#p28").text( title );});

// ex 29
$('<div>', {
    class: 'ex29Div',
}).appendTo('body');
$('.ex29Div').append("<p class='p29es'><a  href=\"w3resource.com\" hreflang=\"es\">href language  es</a></p>");
$('.ex29Div').append("<p class='p29de'><a  href=\"w3resource.com\" hreflang=\"de\">href language  de</a></p>");
$('.ex29Div').append("<p class='p29en'><a  href=\"w3resource.com\" hreflang=\"en\">href language  en</a></p>");
$('.ex29Div').append("<button  id='button29'>Click to see the effect</button>");

$('#button29').click(function(){
    $( "a[hreflang|='de']" ).css( "border", "2px dotted black" );
});

// ex 30
$('<div>', {
    class: 'ex30Div',
}).appendTo('body');
$('.ex30Div').append("<p class='ex30p' name='tutorial-ex30php'>PHP</p>");
$('.ex30Div').append("<p class='ex30p' name='ex30java'>Java</p>");
$('.ex30Div').append("<p class='ex30p' name='ex30python-tutorial'>Python</p>");
$('.ex30Div').append("<button  id='button30'>Click to see the effect</button>");
$('#button30').click(function(){
    $( ".ex30p[name*='tutorial']" ).css( "background", "yellow" );
});

// ex 31
$('<div>', {
    class: 'ex31Div',
}).appendTo('body');
$('.ex31Div').append("<p class='ex31p' name='tutorial-php'>PHP</p>");
$('.ex31Div').append("<p class='ex31p' name='java tutorial'>Java</p>");
$('.ex31Div').append("<p class='ex31p' name='python-tutorial'>Python</p>");
$('.ex31Div').append("<button  id='button31'>Click to see the effect</button>");
$('#button31').click(function(){
    $( ".ex31p[name~='tutorial']" ).css( "background", "yellow" );
});

// ex 32
$('<div>', {
    class: 'ex32Div',
}).appendTo('body');
$('.ex32Div').append("<p class='ex32p' name='tutorial-php'>PHP</p>");
$('.ex32Div').append("<p class='ex32p' name='JAVAtutorial'>Java</p>");
$('.ex32Div').append("<p class='ex32p' name='python-tutorial'>Python</p>");
$('.ex32Div').append("<button  id='button32'>Click to see the effect</button>");
$('#button32').click(function(){
    $( ".ex32p[name$='tutorial']" ).css( "background", "yellow" );
});

// ex 33
$('<div>', {
    class: 'ex33Div',
}).appendTo('body');
$('.ex33Div').append("<lable><input class='input33' type='radio' name='color' value='Red'> <span>name?</span></lable>");
$('.ex33Div').append("<lable><input class='input33' type='radio' name='color' value='Green'> <span>value?</span></lable>");
$('.ex33Div').append("<lable><input class='input33' type='radio' name='color' value='Blue'> <span>value?</span></lable>");
$('.ex33Div').append("<button  id='button33'>Click to see the effect</button>");
$('#button33').click(function(){
    $( ".input33[value='Red']" ).next().text("Red");
    $( ".input33[value='Blue']" ).next().text("Blue");
});

// ex 34
$('<div>', {
    class: 'ex34Div',
}).appendTo('body');
$('.ex34Div').append("<input class='input34' type='radio' name='color' value='Red'> <span>Red</span>");
$('.ex34Div').append("<input class='input34' type='radio' value='Cold Fusion'> <span>Sky</span>");
$('.ex34Div').append("<input class='input34' type='radio' name='accept' value='evil Plans'> <span>Sea</span>");
$('.ex34Div').append("<button  id='button34'>Click to see the effect</button>");
$('#button34').click(function(){
    $( ".input34[name!='color']" ).next().append("<b>Not a color</b>");
});

// ex 35
$('<div>', {
    class: 'ex35Div',
}).appendTo('body');
$('.ex35Div').append("<input class='input35' name='PHP'>");
$('.ex35Div').append("<input class='input35' name='Python'>");
$('.ex35Div').append("<input class='input35' name='Redis'>");
$('.ex35Div').append("<button  id='button35'>Click to see the effect</button>");
$('#button35').click(function(){
    $( ".input35[name^='P']" ).val("Bla bla");
});