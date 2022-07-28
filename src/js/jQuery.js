import "../css/jQuery.scss";
import $ from "jquery";

    // Exercitiul 1

$("body").append("<div id = 'Ex1'></div>")
$("#Ex1").append("<h2>Exercitiul 1</h2>");
$("#Ex1").append("<textarea placeholder='jQuery' cols = '30' rows='5'></textarea>");
$("#Ex1").append("<textarea placeholder='JavaScript' cols = '30' rows='5'></textarea>");
$("#Ex1").append("<p>jQuery</p>");
$("#Ex1").append("<p>JavaScript</p>");
$("#Ex1").append("<button id='button1'>Click to check the effect</button>");

$("#button1").click(function(){
    $("#Ex1 p").css("border","2px solid red");
    $("#Ex1 textarea").css("border","2px solid red");
});

    // Exercitiul 2

$('<div>',{
    id:'Ex2',
}).appendTo("body");
$("#Ex2").append("<h2>Exercitiul 2</h2>")
$("#Ex2").append("<textarea placeholder='Tutorial' cols = '30' rows='5'></textarea>");
$("#Ex2").append("<p>jQuery</p>");
$("#Ex2").append("<p>Exercises</p>");
$("#Ex2").append("<button id='button2'>Click to check the effect</button>");

$("#button2").click(function(){
    $("#Ex2 p").css("background-color","red");
    $("#Ex2 textarea").css("background-color","red");
});

    // Exercitiul 3

$('<div>',{
    id:'Ex3',
}).appendTo("body");
$("#Ex3").append("<h2>Exercitiul 3</h2>")
$("#Ex3").append("<p>jQuery</p>");
$("#Ex3").append("<p>Exercises</p>");


    // Exercitiul 4

$('<div>',{
    id:'Ex4',
}).appendTo("body");

$("#Ex4").append("<h2>Exercitiul 4</h2>")
$("#Ex4").append("<h4 style='margin-left: 30px;font-size: large;color:#c03199'><strong>Before</strong> <code>addBack()</code> " +
    "<span style='margin-left: 610px;color:#c03199'><strong>After</strong> <code>addBack()</code></span></h4>");
$("#Ex4").append("<div id = 'before-addBack'></div>")
$("#before-addBack").append("<p>JavaScript</p>");
$("#before-addBack").append("<p>jQuery</p>");
$("#Ex4").append("<div id = 'after-addBack'></div>")
$("#after-addBack").append("<p>JavaScript</p>");
$("#after-addBack").append("<p>jQuery</p>");

$("#before-addBack").find("p").addClass("background");
$( "#after-addBack" ).find( "p" ).addBack().addClass( "background" );


    // Exercitiul 5

$('<div>',{
    id:'Ex5',
}).appendTo("body");
$("#Ex5").append("<h2>Exercitiul 5</h2>")
$("#Ex5").append("<p>PHP</p>");
$("#Ex5").append("<p>Java</p>");
$("#Ex5").append("<p>Python</p>");

$("p").last().addClass("w3r_font_color");

    // Exercitiul 6

$('<div>',{
    id:'Ex6',
}).appendTo("body");
$("#Ex6").append("<h2>Exercitiul 6</h2>")
$("#Ex6").append("<p>PHP</p>");
$("#Ex6").append("<p>Java</p>");
$("#Ex6").append("<p>Python</p>");

$("p").last().addClass("w3r_font_color w3r_background");

    // Exercitiul 7

$('<div>',{
    id:'Ex7',
}).appendTo("body");
$("#Ex7").append("<h2>Exercitiul 7</h2>");
$("#Ex7").append("<p class=\"w3r_bg_orange\">The best way we learn anything is by practice and exercise questions.</p>");
$("#Ex7").append("<button id='button3'>Click to check the effect</button>");

$("#button3").click(function(){
   $("#Ex7 p").addClass(function (index,currentClass){
       let addedClass;
       if(currentClass === "w3r_bg_orange"){
           addedClass = "w3r_bg_red";
       }
       return addedClass;
    });
});

    // Exercitiul 8

$('<div>',{
    id:'Ex8',
}).appendTo("body");
$("#Ex8").append("<h2>Exercitiul 8</h2>");
$("#Ex8").append("<p>jQuery Exercises</p>");
$("#Ex8").append("<button id='button4'>Click to check the effect</button>");

$("#button4").click(function(){
    $("#Ex8 p").after("<b style='margin-left: 20px;'><i>With solution.</i></b>");
});

    // Exercitiul 9

$('<div>',{
    id:'Ex9',
}).appendTo("body");
$("#Ex9").append("<h2>Exercitiul 9</h2>");
$("#Ex9").append("<p>jQuery Exercises</p>");
$("#Ex9").append("<button id='button5'>Click to check the effect</button>");

$("#button5").click(function(){
    $("#Ex9 p").after(document.createTextNode("with solution."));
});

    // Exercitiul 10

$('<div>',{
    id:'Ex10',
}).appendTo("body");
$("#Ex10").append("<h2>Exercitiul 10</h2>");
$("#Ex10").append("<span>with solution</span>");
$("#Ex10").append("<p>jQuery Exercises</p>");
$("#Ex10").append("<button id='button6'>Click to check the effect</button>");

$("#button6").click(function(){
    $("#Ex10 p").after($(" #Ex10 span"));
});

//     // Exercitiul 11
//
// $('<div>',{
//     id:'Ex11',
// }).appendTo("body");
// $("#Ex11").append("<h2>Exercitiul 11</h2>");
// $("#Ex11").append("<span>with solution</span>");
// $("#Ex11").append("<p>jQuery Exercises</p>");
// $("#Ex11").append("<button id='button7'>Click to check the effect</button>");
//
// $("#button7").click(function(){
//
// });

    //Exercitiul 17

$('<div>',{
    id:'Ex17',
}).appendTo("body");
$("#Ex17").append("<h2>Exercitiul 17</h2>");
$("#Ex17").append("<p>This is division</p>");
$("#Ex17").append("<p>This is division</p>");
$("#Ex17").append("<p>This is division</p>");
$("#Ex17").append("<button id='button7'>Click to check the effect</button>");

$("#button7").click(function(){
    let element = $("*").length;
    $("#Ex17").css("border","2px solid blue")
    $("#Ex17").prepend("<h3 style='margin-left: 20px;'>" + element + "elements found</h3>")
});

    //Exercitiul 18

$('<div>',{
    id:'Ex18',
}).appendTo("body");
$("#Ex18").append("<h2>Exercitiul 18</h2>");
$("#Ex18").append("<span>This is a span</span>");
$("#Ex18").append("<p>This is a Paragraph</p>");
$("#Ex18").append("<button id='button8'>Click to check the effect</button>");

$("#button8").click(function(){
    let element = $( "#Ex18" ).find( "*" ).css( "border", "2px solid blue" ).length;
    $( "#Ex18" ).prepend( "" + element + " element(s) found" );
});


    //Exercitiul 19

$('<div>',{
    id:'Ex19',
}).appendTo("body");
$("#Ex19").append("<h2>Exercitiul 19</h2>");
$("#Ex19").append("<p>jQuery</p>");
$("#Ex19").append("<button id='button9'>Click to check the effect</button>");

$("#button9").click(function(){
    $( "#Ex19 p" ).animate({
        width: "70%",
        opacity: 0.4,
        marginLeft: "1.6px",
        fontSize: "1.3em",
        borderWidth: "10px"
    }, 1500 );
});

    //Exercitiul 20

$('<div>',{
    id:'Ex20',
}).appendTo("body");
$("#Ex20").append("<h2>Exercitiul 20</h2>");
$("#Ex20").append("<button id='left'>&lt;</button>");
$("#Ex20").append("<button id='right'>&gt;</button>");
$("#Ex20").append("<div class='block'></div>");

$( "#right" ).click(function() {
    $( ".block" ).animate({ "left": "+=50px" }, "slow" );
});

$( "#left" ).click(function(){
    $( ".block" ).animate({ "left": "-=50px" }, "slow" );
});

