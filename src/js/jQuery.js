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
    $( "#Ex20 .block" ).animate({ "left": "+=50px" }, "slow" );
});

$( "#left" ).click(function(){
    $( "#Ex20 .block" ).animate({ "left": "-=50px" }, "slow" );
});

    //Exercitiul 21

$('<div>',{
    id:'Ex21',
}).appendTo("body");
$("#Ex21").append("<h2>Exercitiul 21</h2>");
$("#Ex21").append("<div class=\"block\"></div");
$("#Ex21").append("<div class=\"block\"></div>");
$("#Ex21").append("<div class=\"block\"></div>");
$("#Ex21").append("<div class=\"block\"></div>");

$("#Ex21").append("<button id='button10'>Click to Run >></button>");

$("#button10").click(function(){
    $("#Ex21 .block:first").animate({
        left:100
    },{
        duration:2000,
        step: function (now){
            $("#Ex21 .block").css("left",now);
        }
    });
});

    //Exercitiul 22

$('<div>',{
    id:'Ex22',
}).appendTo("body");
$("#Ex22").append("<h2>Exercitiul 22</h2>");
$("#Ex22").append("<div id=\"div1\"></div>");
$("#Ex22").append("<div id=\"div2\"></div>");
$("#Ex22").append("<div id=\"div3\"></div>");
$("#Ex22").append("<button id='button11'>Click to see the effect</button>");

$("#button11").click(function (){
        $("#Ex22 div:animated").toggleClass("colored");
});
function animateIt(){
    $("#Ex22 #div1,#Ex22 #div2").slideToggle("slow",animateIt);
}
animateIt();

    // Exercitiul 23

$('<div>',{
    id:'Ex23',
}).appendTo("body");
$("#Ex23").append("<h2>Exercitiul 23</h2>");
$("#Ex23").append("<p>JavaScript</p>");
$("#Ex23").append("<p>jQuery</p>");
$("#Ex23").append("<button id='button12'>Click to see the changes</button>");

$("#button12").click(function (){
    $("#Ex23 p ").append(document.createTextNode("  Exercises"));
});

    // Exercitiul 24

$('<div>',{
    id:'Ex24',
}).appendTo("body");
$("#Ex24").append("<h2>Exercitiul 24</h2>");
$("#Ex24").append("<strong style='margin-left: 20px;'> Exercises</strong>");
$("#Ex24").append("<p>JavaScript</p>");
$("#Ex24").append("<p>jQuery</p>");
$("#Ex24").append("<button id='button13'>Click to see the changes</button>");

$("#button13").click(function (){
    $("#Ex24 p ").append($("#Ex24 strong"));
});

    // Exercitiul 25

$('<div>',{
    id:'Ex25',
}).appendTo("body");
$("#Ex25").append("<h2>Exercitiul 25</h2>");
$("#Ex25").append("<p>JavaScript</p>");
$("#Ex25").append("<p>jQuery</p>");
$("#Ex25").append("<button id='button14'>Click to see the changes</button>");

$("#button14").click(function (){
    $("#Ex25 p ").append("  Exercises");
});

    // Exercitiul 26

$('<div>',{
    id:'Ex26',
}).appendTo("body");
$("#Ex26").append("<h2>Exercitiul 26</h2>");
$("#Ex26").append("<span> Exercises  </span>");
$("#Ex26").append("<p  id=\"myid\">jQuery</p>");
$("#Ex26").append("<button id='button15'>Click to see the changes</button>");

$("#button15").click(function (){
    //$("#Ex26 p ").append($("#Ex26 span")); // var1
    $("#Ex26 span ").appendTo("#myid"); // var2
});

    // Exercitiul 27

$('<div>',{
    id:'Ex27',
}).appendTo("body");
$("#Ex27").append("<h2>Exercitiul 27</h2>");
$("#Ex27").append("<input id=\"check1\" type=\"checkbox\" checked=\"checked\"> <label for=\"check1\">Check me</label>");

$("input").change(function (){
    let $input = $(this);
    console.log(".attr('checked')");
    console.log(".prop('checked'): " + $input.prop("checked"));
    console.log(".is(':checked' ): " + $input.is(":checked"));
})
    .change();

    // Exercitiul 28

$('<div>',{
    id:'Ex28',
}).appendTo("body");
$("#Ex28").append("<h2>Exercitiul 28</h2>");
$("#Ex28").append("<p>jQuery Exercises, Practice, <em title=\"Real life jQuery or all.\">Solution</em>.</p> <p id=\"id1\"></p>");
$("#Ex28").append("<button id='button16'>Click to see the effect</button>");

$("#button16").click(function (){
   let firstEmTitle = $("em").attr("title");
   $("#id1").text(firstEmTitle);
});

    // Exercitiul 29

$('<div>',{
    id:'Ex29',
}).appendTo("body");
$("#Ex29").append("<h2>Exercitiul 29</h2>");
$("#Ex29").append("<p><a href=\"w3resource.com\" hreflang=\"es\">href language es</a></p> " +
                    "<p><a href=\"w3resource.com\" hreflang=\"de\">href language de</a></p>" +
                    "<p><a href=\"w3resource.com\" hreflang=\"en\">href language en</a></p>");
$("#Ex29").append("<button id='button17'>Click to see the effect</button>");

$("#button17").click(function (){
    $("a[hreflang|='de']").css("border","2px solid red");
});

    // Exercitiul 30

$('<div>',{
    id:'Ex30',
}).appendTo("body");
$("#Ex30").append("<h2>Exercitiul 30</h2>");
$("#Ex30").append("<div name=\"tutorial-php\">" +
                "<p>PHP</p>" +
                "</div>" +
                "<div name=\"java-articles\"><p>Java</p>" +
                "</div>" +
                "<div name=\"python-tutorial-and-exercises\"> <p>Python</p>" +
                "</div>");
$("#Ex30").append("<button id='button18'>Click to see the effect</button>");

$("#button18").click(function (){
    $("#Ex30 div[name*='tutorial']").css("background","yellow");
});

    // Exercitiul 31

$('<div>',{
    id:'Ex31',
}).appendTo("body");
$("#Ex31").append("<h2>Exercitiul 31</h2>");
$("#Ex31").append("<div name=\"tutorial-php\">" +
    "<p>PHP</p>" +
    "</div>" +
    "<div name=\"java tutorial\"><p>Java</p>" +
    "</div>" +
    "<div name=\"python-tutorial-and-exercises\"> <p>Python</p>" +
    "</div>");
$("#Ex31").append("<button id='button19'>Click to see the effect</button>");

$("#button19").click(function (){
    $( "div[name~='tutorial']" ).css( "background", "yellow" );
});

    // Exercitiul 32

$('<div>',{
    id:'Ex32',
}).appendTo("body");
$("#Ex32").append("<h2>Exercitiul 32</h2>");
$("#Ex32").append("<div  name='tutorial-php'>" +
                    "<p>PHP</p>" +
                    "</div>" +
                    "<div  name='JAVAtutorial' <p style='margin-left: 20px;'>Java</p>" +
                    "</div>" +
                    "<div  name='python-tutorial'>" +
                    "<p>Python</p>" +
                    "</div>");
$("#Ex32").append("<button id='button20'>Click to see the effect</button>");

$("#button20").click(function (){
    $( "#Ex32 div[name$='tutorial']" ).css( "background", "yellow" );
});

    // Exercitiul 33

$('<div>',{
    id:'Ex33',
}).appendTo("body");
$("#Ex33").append("<h2>Exercitiul 33</h2>");
$("#Ex33").append("<div>" +
                    "<label>" +
                    "<input type='radio' name='color' value='Red'>" +
                    "<span>name?</span>" +
                    "</label>" +
                    "</div>" +
                    "<div>" +
                    "<label>" +
                    "<input type='radio' name='color' value='Green'>" +
                    "<span>value?</span>" +
                    "</label>" +
                    "</div>" +
                    "<div>" +
                    "<label>" +
                    "<input type='radio' name='color' value='Black'>" +
                    "<span>value?</span>" +
                    "</label>" +
                    "</div>");
$("#Ex33").append("<button id='button21'>Click to see the effect</button>");

$("#button21").click(function (){
    $( "#Ex33 input[value='Red']" ).next().text( " Red " );
});

    // Exercitiul 34

$('<div>',{
    id:'Ex34',
}).appendTo("body");
$("#Ex34").append("<h2>Exercitiul 34</h2>");
$("#Ex34").append("<input type='radio' name='color'  value='Red'>" +
                    "<span>Red</span>" +
                    "</div>" +
                    "<div>" +
                    "<input type='radio' value='Cold Fusion'>" +
                    "<span>Sky</span>" +
                    "</div>" +
                    "<div>" +
                    "<input type='radio' name='accept'  value='Evil Plans'>" +
                    "<span>Sea</span>" +
                    "</div>");
$("#Ex34").append("<button id='button22'>Click to see the effect</button>");

$("#button22").click(function (){
    $( "#Ex34 input[name!='color']").next().append("<b>: not a color</b>");
});

    // Exercitiul 35

$('<div>',{
    id:'Ex35',
}).appendTo("body");
$("#Ex35").append("<h2>Exercitiul 35</h2>");
$("#Ex35").append("<input name='PHP'> <input name='Python'> <input name='Redis'>");
$("#Ex35").append("<button id='button23'>Click to see the effect</button>");

$("#button23").click(function (){
    $( "#Ex35 input[name^='P']").val("Tutorials & Exercises");
});

    // Exercitiul 36

$('<div>',{
    id:'Ex36',
}).appendTo("body");
$("#Ex36").append("<h2>Exercitiul 36</h2>");
$("#Ex36").append("<p>PHP Tutorial</p>\n" +
                    "<p>Python Tutorial</p>\n" +
                    "<p>Java Tutorial</p>");
$("#Ex36").append("<button id='button24'>Click to see the effect</button>");

$("#button24").click(function (){
    $( "#Ex36 p" ).before( "<i style='margin-left: 20px;'>some HTML</i>" );
});

    // Exercitiul 37

$('<div>',{
    id:'Ex37',
}).appendTo("body");
$("#Ex37").append("<h2>Exercitiul 37</h2>");
$("#Ex37").append("<p>PHP Tutorial</p>\n" +
                    "<p>Python Tutorial</p>\n" +
                    "<p>Java Tutorial</p>");
$("#Ex37").append("<button id='button25'>Click to see the effect</button>");

$("#button25").click(function (){
    $( "#Ex37 p" ).before(document.createTextNode("DOM element")) ;
});

    // Exercitiul 38

$('<div>',{
    id:'Ex38',
}).appendTo("body");
$("#Ex38").append("<h2>Exercitiul 38</h2>");
$("#Ex38").append("<p>PHP Tutorial</p><b>w3resource</b>");
$("#Ex38").append("<button id='button26'>Click to see the effect</button>");

$("#button26").click(function (){
    $( "#Ex38 p" ).before($("b")) ;
});

    // Exercitiul 39

$('<div>',{
    id:'Ex39',
}).appendTo("body");
$("#Ex39").append("<h2>Exercitiul 39</h2>");
$("#Ex39").append("<p>Click or double click here.</p>\n" +
                    " <p id=\"result\"></p>");

$("#Ex39 p").bind("click",function (event){
        let s = "(" + event.pageX + "," + event.pageY + ")";
        $("#result").text("Click happened!" + s);
});

$("#Ex39 p").bind("dblclick", function (){
    $( "#result" ).text( "Double-click happened");
});

$( "#Ex39 #result" ).bind( "mouseenter mouseleave", function() {
    $( this ).toggleClass( "over" );
});

    // Exercitiul 40

$('<div>',{
    id:'Ex40',
}).appendTo("body");
$("#Ex40").append("<h2>Exercitiul 40</h2>");
$("#Ex40").append("<form>\n" +
                    "<input id=\"target\" type=\"text\" value=\"Field 1\">\n" +
                    "<input type=\"text\" value=\"Field 2\">\n" +
                    "</form>\n" +
                    "<p>Set and remove focus from field1\n" +
                    "</p>");

$( "#target" ).blur(function() {
    console.log( "Remove focus from fields1!" );
});

    // Exercitiul 41

$('<div>',{
    id:'Ex41',
}).appendTo("body");
$("#Ex41").append("<h2>Exercitiul 41</h2>");
$("#Ex41").append("<form>\n" +
                " <fieldset>\n" +
                " <textarea rows=\"4\" cols=\"50\">\n" +
                " At w3resource.com you will learn how to make a website. We offer free tutorials in all web development technologies. \n" +
                " </textarea>\n" +
                " <input type=\"button\" value=\"Input Button\">\n" +
                " </fieldset>\n" +
                " </form>\n" +
                " <p></p>");
$("#Ex41").append("<button id='button27'>Click to see the effect</button>");
$("#button27").click(function (){
    let inp = $("#Ex41 :button").addClass("marked");
    $("#Ex41 p").text("Nr. of buttons(s): " + inp.length);
});


