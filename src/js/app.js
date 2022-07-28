import "../css/styles.scss";
import $ from "jquery";
/**
 * Import extra javascript files
 */
import "./additional";
//SAU require( './additional' );


$('body').append($("<textarea>Something</textarea>"));
$('body').append($("<p>Paragraph</p>"));
$('body').append($("<textarea>Something</textarea>"));
$('body').append($("<p>Paragraph</p>"));

//1
$("textarea, p").css('border', '2px solid red');

//2
//$("textarea, p").css('background-color', 'red');

//3
$('body').append($("<p>New Paragraph Appended</p>"));

//4
$('body').append("<div class=\"beforeAdd\"></div>");
$('.beforeAdd').append("<p>Text</p>");
$('.beforeAdd').append("<p>Text</p>");
$('body').append("<div class=\"afterAdd\"></div>");
$('.afterAdd').append("<p>Text</p>");
$('.afterAdd').append("<p>Text</p>");

$('div.beforeAdd').find('p').addClass("background");
$('div.afterAdd').find('p').addBack().addClass("background");

//5
$("body").append("<p>Exercitiu nou</p>");
$("p:last").addClass("w3r_font_color");

//6
$("p:last").addClass("w3r_background");

//7
$("p").addClass(function (index, currentClass) {
    if (currentClass === "w3r_font_color w3r_background")
        return "w3r_ex7";
});

//8
$("p").after("<div>Inserted new Div</div>");

//9
$("p").after(document.createTextNode("New Text Node"));

//10
$("p").after($("input"));

//11
//12
//13
//14
//15
//16

//17
$('body').append("<p>" + $("*").length + "</p");

//18
$('body').append("<p>All elements within app: " + $("#app").length + "</p");

//19
$('body').append("<p id=\"pid\">jQuery</p><button id=\"button1\">Click to see the animation</button>");
$("#button1").click(function () {
    $("#pid").animate({
        width: "70%",
        opacity: 0.4,
        marginLeft: "0.6in",
        fontSize: "3em",
        borderWidth: "10px"
    })
})

//20
$("body").append("<button id=\"left\"><</button><button id=\"right\">></button><div class=\"block\"></div>");
$("#left").click(function () {
    $(".block").animate({ "left": "-=70px" }, "fast");
})
$("#right").click(function () {
    $(".block").animate({ "left": "+=70px" }, "fast");
})

//21
$("body").append("<p><button id=\"run\">Click to Run </button></p><div class=\"block-new\"></div><div class=\"block-new\"></div><div class=\"block-new\"></div><div class=\"block-new\"></div>");
$("#run").click(function () {
    $(".block-new").animate({ "left": "+=30px" }, "slow");
})

//22
$("body").append("<div class=\"new-div\">  <div id=\"div1\"></div>" +
    "<div id=\"div2\"></div>" +
    "<div id=\"div3\"></div>" +
    "<button id=\"button2\">Click to see the effect</button></div>");

$("#button2").click(function () {
    $("#div1, #div2, #div3:animated").toggleClass("colored");
});

function slide() {
    $("#div1, #div2").slideToggle("fast", slide);
}
slide();

//23
$("body").append("<div class=\"new-div append-here\"><strong> Exercises</strong>"  +
"<p>JavaScript</p>" +
"<p>jQuery</p>" +
"<button id=\"button3\">Click to see the changes</button> </div>");
$("#button3").click(function() { 
    $(".append-here").find("p").append(" Some text");
})

//24
$("body").append("<div class=\"new-div append-jquery\"><strong> Exercises</strong>"  +
"<p>JavaScript</p>" +
"<p>jQuery</p>" +
"<button id=\"button4\">Click to see the changes</button> </div>");
$("#button4").click(function() { 
    $(".append-jquery").find("p").append($("<p>A new paragraph maybe?</p>"));
})

//25
$("body").append("<div class=\"new-div append-element\"><strong> Exercises</strong>"  +
"<p>JavaScript</p>" +
"<p>jQuery</p>" +
"<button id=\"button5\">Click to see the changes</button> </div>");
$("#button5").click(function() { 
    $(".append-element").find("p").append(document.createTextNode(" A text node"));
})

//26
$("body").append("<div class=\"new-div append-spans\"><span> Exercises  </span>" + 
"<p  id=\"myid\">jQuery</p>" + 
"<button id=\"button6\">Click to see the effect</button></div>");
$("#button6").click(function() { 
    $(".append-spans").find("span").appendTo("#myid");
})

//27
$("body").append("<div class=\"new-div check\"><input id=\"check1\" type=\"checkbox\" checked=\"checked\">" +
"<label for=\"check1\">Check me</label></div>");
$("#check1").change(function() {
    console.log($(this).attr('checked'));
    console.log($(this).is(":checked"));
});

//28
$("body").append("<div class=\"new-div emph\"><p>jQuery Exercises, Practice,  <em title=\"Real life jQuery or  all.\">Solution</em>.</p>" +
"<p  id=\"id28\"></p>" +
"<button  id=\"button7\">Click to see the effect</button></div>");
$("#button7").click(function() { 
    $('#id28').append("<p>" + $(".emph").find("em").filter(":first").attr("title") + "</p>");
});

//29
$("body").append("<div class=\"new-div de\">" +
"<p><a hreflang=\"en\">Language en</p>" +
"<p><a hreflang=\"de\">Language de</p>" +
"<p><a hreflang=\"es\">Language es</p>" +
"<p id=\"id29\"></p>" +
"<button  id=\"button8\">Click to see the effect</button></div>");
$("#button8").click(function() { 
        $('#id29').append("<p>" + $(".de a[hreflang=de]").text() + "</p>");
});

//30
$("body").append("<div class=\"new-div divs\">" +
"<div  name=\"tutorial-php\"><p>PHP</p></div>" +
"<div  name=\"java-articles\"<p>Java</p></div>" + 
"<div  name=\"python-tutorial-and-exercises\"><p>Python</p></div>" +
"<button  id=\"button9\">Click to see the effect</button></div>");
$("#button9").click(function() { 
    $(".divs div[name*=tutorial]").css("background-color", "yellow");
});

//31
