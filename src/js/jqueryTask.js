import "../css/jqueryTask.scss";
import $ from 'jquery';


// Ex1
$("body").append("<div id='ex1'></div>");
$("#ex1").append("<textarea>jQuery</textarea>");
$("#ex1").append("<textarea>JavaScript</textarea>");
$("#ex1").append("<p>jQuery</p>");
$("#ex1").append("<p>JavaScript</p>");
$("#ex1").append("<button id='button1'>Click to check the effect</button>");
$("#button1").click(function (){
    $("#ex1 textarea").css("border","5px solid black");
    $("#ex1 p").css("border", "5px solid red");
})
// Ex2
$("body").append("<div id='ex2'></div>");
$("#ex2").append("<textarea style='width: 162px;'>TutoRIAL</textarea>");
$("#ex2").append("<p>jQuery</p>");
$("#ex2").append("<span>Exercises</span>");
$("#ex2").append("<button id='button2'>Click to see the effect</button>")
$('#button2').click(function (){
    $("#ex2").children().filter("[id!='button2']").css( "background", "red");
})
// Ex3
$("body").append("<div id='ex3'></div>");
$("#ex3").append("<p>Some text Bla-bla bla</p>");
$("#ex3").append("<p>other text</p>");

// Ex4
$("body").append("<div id='ex4'></div>");
$('#ex4').append('<div class="left">\n' +
    '        <p><strong>Before <code>addBack()</code></strong></p>\n' +
    '        <div class="before-addback">\n' +
    '            <p>JavaScript</p>\n' +
    '            <p>jQuery</p>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="right">\n' +
    '        <p><strong>After <code>addBack()</code></strong></p>\n' +
    '        <div class="after-addback">\n' +
    '            <p>JavaScript</p>\n' +
    '            <p>jQuery</p>\n' +
    '        </div>\n' +
    '    </div>');


$("#ex4 div.left, div.right ").find("div, div > p").addClass("border");
$("#ex4 div.before-addback").find("p").addClass("background");
$("#ex4 div.after-addback").find("p").addBack().addClass("background");


// Ex5
$("body").append("<div id='ex5'></div>");
$("#ex5").append("<p>PHP</p>");
$("#ex5").append("<p>Java</p>");
$("#ex5").append("<p>Python</p>");
$("#ex5 p").last().addClass("w3r_font_color");


// Ex6
$("body").append("<div id='ex6'></div>");
$("#ex6").append("<p>PHP</p>");
$("#ex6").append("<p>Java</p>");
$("#ex6").append("<p>Python</p>");
$("#ex6 p").last().addClass("w3r_font_color w3r_background");

// Ex7
$("body").append("<div id='ex7'></div>");
$("#ex7").append("<p class=\"w3r_bg_orange\">The best way we learn anything is by practice and exercise questions.</p>");
$("#ex7").children().filter("[class!='']").addClass("w3r_bg_red");

// Ex8
$("body").append("<div id='ex8'></div>");
$("#ex8").append("<p> jQuery Exercises</p>");
$("#ex8").append("<p> jQuery Exercises</p>");
$("#ex8").children().after("<b><i>With solution.</i></b>");


//Ex9
$("body").append("<div id='ex9'></div>");
$("#ex9").append("<p> jQuery Exercises</p>");
$("#ex9").append("<p> jQuery Exercises</p>");
$("#ex9").children().after(document.createTextNode("With solution"));

//Ex10
$("body").append("<div id='ex10'></div>");
$("#ex10").append("<p> jQuery Exercises</p>");
$("#ex10").append("<p> jQuery Exercises</p>");
$("#ex10").children().after($("span"));

//Ex17
$("body").append("<div id='ex17'></div>");
$("#ex1").append("<div>This is division</div>");
$("#ex17").append("<span>This is a span</span>");
$("#ex17").append("<p>This is a Paragraph</p>");
let elementCount = $("*").length;
$( "#ex17" ).append( "<h2>" + elementCount + " elements found</h2>" );

// Ex18
$("body").append("<div id='ex18'></div>");
$("#ex18").append(' <div  id="iddiv"> \n' +
    '<span>This is a span</span>\n' +
    '  <p>This is a Paragraph</p>\n' +
    ' <button id="button18">Click to see the effect</button> \n' +
    '  </div>');
$("#button18").click(function (){
    let elementCount = $('#iddiv').find("*").length;
    $("#ex18").prepend("<h2>" + elementCount + " element(s) found </h2>");
})

// Ex19
$("body").append("<div id='ex19'></div>");
$("#ex19").append('<p id="pid">jQuery</p>');
$("#ex19").append('<button id="button19">Click to see the animation</button> ')
$('#button19').click(function (){
    $('#pid').animate({
        width: "70%",
        opacity: 0.4,
        marginLeft: "0.6in",
        fontSize: "3em",
        borderWidth: "10px"
    }, 2000);
});

// Ex20
$("body").append("<div id='ex20'></div>");
$("#ex20").append(
    '<button id="left"><</button>\n' +
    '<button id="right">></button>\n' +
    '<div class="block"></div>');
$("#left").click(()=> {$("#ex20 .block").animate({"left":"-=50"},500)});
$("#right").click(()=> {$("#ex20 .block").animate({"left":"+=50"},500)});

// Ex21
$("body").append("<div id='ex21'></div>");
$("#ex21").append(
    "<p><button id='run'>Click to Run </button></p>\n" +
    "<div class='block'></div>\n" +
    "<div class='block'></div>\n" +
    "<div class='block'></div>\n" +
    "<div class='block'></div>");
$("#ex21").click(function (){
    $('#ex21 .block:first').animate({
        left:100
    }, {
        duration: 2000,
        step: function (now, fx){
            $( "#ex21 .block:gt(0)" ).css( "left", now );
        }
    });

});

// Ex22
$("body").append("<div id='ex22'></div>");
$('#ex22').append(
    '<div id="div1"></div>\n' +
    '<div id="div2"></div>\n' +
    '<div id="div3"></div>\n' +
    '<button id="button22">Click to see the effect</button>');
$('#ex22').find("#button22").click(() =>{$( "div:animated" ).toggleClass( "colored" );});

function animateIt() {
    $('#ex22').find("#div1,#div2").slideToggle( "slow", animateIt );
}
animateIt();
// Ex23
$("body").append("<div id='ex23'></div>");
$('#ex23').append(
    '<p>JavaScript</p>\n' +
    '<p>jQuery</p>\n' +
    '<button id="button23">Click to see the changes</button>');
$('#ex23').find("#button23").click(()=>{$( "p" ).append( document.createTextNode( " Exercises" ) );});

// Ex24
$("body").append("<div id='ex24'></div>");
$('#ex24').append(
    '<strong> Exercises</strong>  \n' +
    '<p>JavaScript</p>\n' +
    '<p>jQuery</p>\n' +
    '<button id="button24">Click to see the changes</button>');
$('#ex24').find("#button24").click(()=>{$('#ex24').find( "p" ).append( $( "strong" ) );});

// Ex25
$("body").append("<div id='ex25'></div>");
$('#ex25').append(
    '<p>JavaScript</p>\n' +
    '<p>jQuery</p>\n' +
    '<button id="button25">Click to see the changes</button>');
$('#button25').click(()=>{$( "#ex25 p" ).append( document.createTextNode( " Exercises" ) );});

// Ex26
$("body").append("<div id='ex26'></div>");
$('#ex26').append(
    '<span> Exercises  </span>\n' +
    '<p  id="myid">jQuery</p>\n' +
    '<button id="button26">Click to see the effect</button>');
$("#button26").click(()=>{$('#ex26').find("span" ).appendTo("#ex26 #myid");});

// Ex27
$("body").append("<div id='ex27'></div>");
$('#ex27').append(
    '<input id="check1" type="checkbox" checked="checked">\n' +
    '<label for="check1">Check me</label>');
$('#ex27').find("input").change(function() {
    let $input = $( this );
    console.log(".attr( 'checked' )");
    console.log(".prop( 'checked' ): " + $input.prop( "checked" ))    ;
    console.log(".is( ':checked' ): " + $input.is( ":checked" ) );
}).change();

// Ex28
$("body").append("<div id='ex28'></div>");
$('#ex28').append(
    '<p>jQuery Exercises, Practice,  <em title="Real  life jQuery or  all.">Solution</em>.</p>\n' +
    '<p  id="id1"></p>\n' +
    '<button  id="button28">Click to see the effect</button>');
$('#button28').click(()=>{
    let title = $( "em" ).attr( "title" );
    $("#id1").text( title );})

// Ex29
$("body").append("<div id='ex29'></div>");
$('#ex29').append(
    '<p><a  href="w3resource.com" hreflang="es">href language  es</a></p>\n' +
    '<p><a  href="w3resource.com" hreflang="de">href language  de</a></p>\n' +
    '<p><a  href="w3resource.com" hreflang="en">href language  en</a></p>\n' +
    '<button  id="button29">Click to see the effect</button>');
$('#button29').click(()=>{$('#ex29').find( "a[hreflang|='de']" ).css( "border", "2px solid red" );});

// Ex30
$("body").append("<div id='ex30'></div>");
$('#ex30').append(
    '<div  name="tutorial-php">\n' +
    '<p>PHP</p>\n' +
    '</div>\n' +
    '<div  name="java-articles"<p>Java</p>\n' +
    '</div>\n' +
    '<div  name="python-tutorial-and-exercises">\n' +
    '<p>Python</p>\n' +
    '</div>\n' +
    '\n' +
    '<button  id="button30">Click to see the effect</button>');
$('#button30').click(()=>{
    $('#ex30').find("div[name*='tutorial']").css( "background", "yellow" );
});
// Ex31
$("body").append("<div id='ex31'></div>");
$('#ex31').append(
    '<div  name="tutorial-php">\n' +
    ' <p>PHP</p>\n' +
    '</div>\n' +
    '<div name="java  tutorial"<p>Java</p>\n' +
    '</div>\n' +
    '<div  name="python-tutorial-and-exercises">\n' +
    ' <p>Python</p>\n' +
    '</div>\n' +
    ' \n' +
    '<button  id="button31">Click to see the effect</button> ');
$('#button31').click(()=>{
    $('#ex31').find("div[name~='tutorial']").css( "background", "yellow" );});

// Ex32
$("body").append("<div id='ex32'></div>");
$('#ex32').append(
    '<div  name="tutorial-php">\n' +
    '<p>PHP</p>\n' +
    '</div>\n' +
    '<div  name="JAVAtutorial"<p>Java</p>\n' +
    '</div>\n' +
    '<div  name="python-tutorial">\n' +
    '  <p>Python</p>\n' +
    '    </div>\n' +
    '  <button  id="button32">Click to see the effect</button>');
$('#button32').click(()=>{
    $('#ex32').find("div[name$='tutorial']").css( "background", "yellow" );});

// Ex33
$("body").append("<div id='ex33'></div>");
$('#ex33').append(
    '<div>\n' +
    '<label>\n' +
    '<input type="radio" name="color"  value="Red">\n' +
    '<span>name?</span>\n' +
    '</label>\n' +
    '</div>\n' +
    '<div>\n' +
    '<label>\n' +
    '<input type="radio" name="color"  value="Green">\n' +
    '<span>value?</span>\n' +
    '</label>\n' +
    '</div>\n' +
    '<div>\n' +
    '<label>\n' +
    '<input type="radio" name="color"  value="Black">\n' +
    '<span>value?</span>\n' +
    '</label>\n' +
    '</div>\n' +
    '<button id="button33">Click to see the  effect</button>');

$('#button33').click(()=> {
    $("#ex33 input[value='Red']" ).next().text( " Red " );
});

// Ex34
$("body").append("<div id='ex34'></div>");
$('#ex34').append(
    '<div>\n' +
    '<input type="radio" name="color"  value="Red">\n' +
    '<span>Red</span>\n' +
    '</div>\n' +
    '<div>\n' +
    '<input type="radio" value="Cold Fusion">\n' +
    '<span>Sky</span>\n' +
    '</div>\n' +
    '<div>\n' +
    '<input type="radio" name="accept"  value="Evil Plans">\n' +
    '<span>Sea</span>\n' +
    '</div>\n' +
    '<button id="button34">Click to see the  effect</button>');
$('#button34').click(()=> {
    $("#ex34 input[name!='color']" ).next().append("<b>: not a color</b>");
});

// Ex35
$("body").append("<div id='ex35'></div>");
$('#ex35').append(
    '<input name="PHP">\n' +
    '   <input name="Python">\n' +
    '   <input name="Redis">\n' +
    '   <button id="button35">Click to see the effect</button>')
$('#button35').click(()=> {
    $("#ex35 input[name^='P']" ).val( "Tutorials & Exercises " );
});
// Ex36
$("body").append("<div id='ex36'></div>");
$('#ex36').append(
    '<p>PHP Tutorial</p>\n' +
    '<p>Python Tutorial</p>\n' +
    '<p>Java Tutorial</p>  \n' +
    '  <button id="button36">Click to see the effect</button> ');
$('#button36').click(()=> {
    $("#ex36 p").before( "<i>w3resource.com</i>" );
});
// Ex37
$("body").append("<div id='ex37'></div>");
$('#ex37').append(
    '<p>PHP Tutorial</p>\n' +
    '<p>Python Tutorial</p>\n' +
    '<p>Java Tutorial</p>  \n' +
    '  <button id="button37">Click to see the effect</button>');
$('#button37').click(()=> {
    $("#ex37 p").before( $('b') );
});
// Ex38
$("body").append("<div id='ex38'></div>");
$('#ex38').append(
    '<p>PHP Tutorial</p><b>w3resource</b>\n' +
    '<button id="button38">Click to see the effect</button> ');
$('#button38').click(()=> {
    $("#ex38").find('p').before( $('b') );
});
// Ex39
$("body").append("<div id='ex39'></div>");
$('#ex39').append(
    '<p>Click or double click here.</p>\n' +
    '  <p id="result"></p>');
$("#ex39 p").bind( "click", function( event ) {
    var str = "( " + event.pageX + ", " + event.pageY + " )";
    $( "#result" ).text( "Click happened! " + str );
});
$( "#ex39 p" ).bind( "dblclick", function() {
    $( "#result" ).text( "Double-click happened");
});
$( "#result" ).bind( "mouseenter mouseleave", function( event ) {
    $( this ).toggleClass( "over" );
});
// Ex40
$("body").append("<div id='ex40'></div>");
$('#ex40').append(
    '<form>\n' +
    '<input id="target" type="text" value="Field 1">\n' +
    '<input type="text" value="Field 2">\n' +
    '</form>\n' +
    '<p>Set and remove focus from field1\n' +
    '</p>');
$( "#target" ).blur(function() {
    console.log( "Remove focus from fields1!" );
});

// Ex41
$("body").append("<div id='ex41'></div>");
$('#ex41').append(
    '  <form>\n' +
    '  <fieldset>\n' +
    '   <textarea rows="4" cols="50">\n' +
    'At w3resource.com you will learn how to make a website. We offer free tutorials in all web development technologies. \n' +
    '</textarea>\n' +
    '    <input type="button" value="Input Button">\n' +
    '     </fieldset>\n' +
    '</form>\n' +
    '  <p></p>\n' +
    '<button id="button41">Click to see the effect</button> ');
$('#button41').click(()=> {
    let input = $('#ex41').find( ":button" ).addClass( "marked" );
    $('#ex41').find( "p" ).text( "No. of butttons(s): " + input.length  );
});



