import $ from "jquery"

let setBorders = ()=>{
    $('textarea').css("border", "2px solid red");
    $('h3').css("border", "2px solid red");
}
let setBackground = ()=>{
    $('textarea').css("background-color", "red");
    $('h3').css("background-color", "red");
}
//ex1
let setup0 = () =>{
    let body = $('body');
    body.append($("<textarea>jQuery </textarea> "));
    body.append($("<textarea class = 'sec'>JavaScript </textarea> "));
    body.append($("<h3>jQuery</h3>"));
    body.append($("<h3>JavaScript</h3>"));
    body.append($("<button> Click to check the effect</button>"));
    body.css("margin-left","3vw");
    $('.sec').css("margin-left","3vw");
    $('textarea').addClass('text');
    body.css('color',"#296010");
    body.css('width',"96vw");
    $('h3').css('margin-right',"2vw");
    $('button').click("mousedown", setBorders,false);
}
//ex2
let setup1 = () => {
    let body = $('body');
    body.append($("<textarea>TutoRIAL </textarea> "));
    body.append($("<h3>jQuery</h3>"));
    body.append($("<h3>Exercises</h3>"));
    let h3 = $('h3');
    h3.first().css("width","98vw");
    h3.last().css("width","20vw");
    body.append($("<button> Click to check the effect</button>"));
    $('button').click("mousedown", setBackground,false);
}
//ex3
let setup2 = () => {
    $('body').append($("<p>jQuery </p> "));
}
//ex4
let setup3 = () =>{
    $('body').append($("<div></div> "));
    let div = $('div');
    div.append($("<p>JavaScript </p>"));
    div.append($("<p>jQuery </p> "));
    let p =  $('p');
    p.css("border","2px solid blue");
    p.css("padding","10px 10px 10px 10px");
    div.css("border","2px solid blue");
    div.css("padding","10px 20px 10px 20px");
    div.find('p').addClass("background");
    //$('div').find('p').addBack().addClass("background");
    $('.background').css("background-color","gray");
}
//ex5 & 6
let setup4 = () =>{
    let list = ["PHP", "Java", "Python"];
    list.forEach(el =>{
        $('body').append($("<p>"+ el + "</p> "));
    })
    let p =  $('p');
    p.css("margin", "8px");
    p.css("font-size", "16px");

    $('p:last-child').addClass("w3_front_color");
    $('p:last-child').addClass("w3_background");
    $('.w3_front_color').css("color","red");
    $('.w3_background').css("background", "orange");
}

//ex7
let setup5 = () =>{
    $('body').append("<p class=\"w3r_bg_orange\">The best way we learn anything is by practice and exercise questions.</p>");
    $('p').css("background","white");
    $('.w3r_bg_orange').css("background","orange");
    $('.w3r_bg_orange').addClass("w3r_bg_red");
    $('.w3r_bg_red').css("color","red");
}
let setup6 = ()=>{
    let list = ["PHP", "Java", "Python","Clion"];
    list.forEach(el =>{
        $('body').append($("<p>"+ el + "</p> "));
    })
    let lastP =  $('p').last();
    //add html element a.k.a. ex8
    lastP.after("<div>After all paragraphs</div>");
    let myEl = document.createElement("div");
    myEl.innerHTML = "napolitane";
    //add dom element a.k.a. ex9
    lastP.after(myEl);
    //add jQuery element a.k.a. ex10
    lastP.after($("<p>napolitane 2.0</p>"));
    //count all elements in html, including meta's, scripts using * selector a.k.a. ex17
    console.log($('*').length);
    //count all elements inside a container using * selector a.k.a. ex18
    let container = $('body');
    console.log(container.find('*').length);
}
// exercise 19
let animateParagraph = () =>{
    let animation = {
        width: "70%",
        opacity: 0.4,
        marginLeft: "0.6in",
        fontSize: "3em",
        borderWidth: "10px"
    }
    $('#iddiv').find('p').animate(
        animation
    );
}

let setup7 = () => {
    $('body').append(
        $(
            " <div  id=\"iddiv\"> \n" +
            "<span>This is a span</span>\n" +
            "  <p>This is a Paragraph</p>\n" +
            " <button id=\"button1\">Click to see the effect</button> \n" +
            "  </div>\n")
    );
    $('#button1').click(animateParagraph);
}

//ex 20

let setup8 = () =>{
    $('body').append(
        $(
            "<body>\n" +
            "<button id=\"left\"><</button>\n" +
            "<button id=\"right\">></button>\n" +
            "<div class=\"block\"></div>\n" +
            "</body>")
    );
    $('div').css({
        'position': 'absolute',
        'background-color' : '#B0E0E6',
        'left' : '40px',
        'width': '80px',
        'height': '80px',
        'margin' : '5px'
    });
    let left = 0;

    $('#left').click( function() {
        left -= 3;
        if(left < 0)
            left = 0;
        $('.block').animate({
            left: left + "%"
        });
    });
    $('#right').click( function() {
        left += 3;
        if(left > 90)
            left = 90;
        $('.block').animate({
            left: left + "%"
        });
    });
}
//ex 21
let setup9= ()=>{
    $('body').append(
        $("" +
            "<p><button id=\"run\">Click to Run </button></p>\n" +
            "<div class=\"block\"></div>\n" +
            "<div class=\"block\"></div>\n" +
            "<div class=\"block\"></div>\n" +
            "<div class=\"block\"></div>")
    );
    let pos = 40;
    $('.block').each(function(){
        $(this).css({
            'position': 'absolute',
            'background-color': '#B0E0E6',
            'left': pos + 'px',
            'width': '80px',
            'height': '80px',
            'margin': '5px'
        });
        pos += 90;
    });
    // am facut cu margin, cred ca se putea si cu left dar habar n-am cum:/
    $('#run').click( function() {
        $('.block').animate({
            now : '+=10'
        }, {
        duration:1000,
        step: function (now){
            $(this).css("margin-left", now + '%');
        }
        });
    });
}

function animateIt() {
    $( "#div1,#div2" ).slideToggle( "slow", animateIt );
}
//ex 22, background doesn't change , f**k
let setup10= ()=>{
    $('body').append(
        $("<div id=\"div1\"></div>\n" +
            "<div id=\"div2\"></div>\n" +
            "<div id=\"div3\"></div>\n" +
            "<button id=\"button1\">Click to see the effect</button>"
        )
    );
    $('div').each(function(){
        $(this).css({
            'background': '#B0E0E6',
            'border': '1px solid #e30ae8',
            'width': '20px',
            'height': '30px',
            'margin': '0 5px',
            'float': 'left'
        });
    });

    $("<style>.colored{background: #000000;} </style>").appendTo('head');

    animateIt();
    $('#button1').click( function() {
        $('div:animated').toggleClass("colored");
    });
}
//ex 23
let setup11 = () => {
    $('body').append(
        $("<p>javaScript</p>\n" +
            "<p>jQuery</p>\n" +
            "<button id=\"button1\">Click to see the effect</button>"
        )
    );
    $('#button1').click(function() {
        $('p').each(function () {
            $(this).append(" Exercises");
        });
    });
}
//ex 24
let setup12 = () => {
    $('body').append(
        $("<p>javaScript</p>\n" +
            "<p>jQuery</p>\n" +
            "<button id=\"button1\">Click to see the effect</button>"
        )
    );
    $('#button1').click(function() {
        $('p').each(function () {
            $(this).append($("<span> Exercises</span>"));
        });
    });
}
//ex 25
let setup13 = () => {
    $('body').append(
        $("<p>javaScript</p>\n" +
            "<p>jQuery</p>\n" +
            "<button id=\"button1\">Click to see the effect</button>"
        )
    );
    $('#button1').click(function() {
        $('p').each(function () {
            let myEl = document.createElement("span");
            myEl.innerHTML = " Exercises";
            $(this).append(myEl);
        });
    });
}

//ex26
let setup14 = () => {
    $('body').append(
        $("<span> exercise </span>\n" +
            "<p id = \"myId\">jQuery</p>\n" +
            "<button id=\"button1\">Click to see the effect</button>"
        )
    );
    $('#button1').click(function() {
        $('span').each(function () {
            let myEl = document.createElement("span");
            myEl.innerHTML = " Exercises";
            $(this).appendTo("#myId");
        });
    });
}

//ex27
let setup15 = () => {
    $('body').append(
        $("<input id=\"check1\" type=\"checkbox\" checked=\"checked\">\n" +
            "<label for=\"check1\">Check me</label>"
        )
    );
    let str =  $('#check1').attr("checked") === "checked" ? "checked" : "unchecked";
    $('#check1').change(function (){
        str =  str === "checked" ? "unchecked" : "checked";
       $("label[for = 'check1']").html(str);
    });
}

//ex 28

let setup16 = () => {
    $('body').append(
        $("<p>jQuery Exercises, Practice,  <em title=\"Real  life jQuery or  all.\">Solution</em>.</p>\n" +
            "<p  id=\"id1\"></p>\n" +
            "<button  id=\"button1\">Click to see the effect</button>"
        )
    );

    $('#button1').click(function (){
        $('#id1').html( $('em').first().attr("title"));
    });
}
//ex 29
let setup17 = () => {
    $('body').append(
        $("<p><a href=\"w3resource.com\" hreflang=\"es\">href language es</a></p>" +
            "<p><a href=\"w3resource.com\" hreflang=\"de\">href language de</a></p>" +
            "<p><a href=\"w3resource.com\" hreflang=\"en\">href language en</a></p>" +
            "<button id=\"button1\">Click to see the effect</button>"
        )
    );

    $('#button1').click(function (){
        $('a').each(
            function(){
                if($(this).attr("hreflang") === "de"){
                    $(this).css("border", "2px solid red");
                }
            }
        );
    });
}
//ex 30-32
let setup18 = () => {
    $('body').append(
        $("<div name=\"tutorial-php\">\n" +
            "<p>PHP</p>\n" +
            "</div>\n" +
            "<div name=\"java-articles\"<p>Java</p>\n" +
            "</div>\n" +
            "<div name=\"python-tutorial-and-exercises\">\n" +
            "<p>Python</p>\n" +
            "</div>\n" +
            "\n" +
            "<button  id=\"button1\">Click to see the effect</button>"
        )
    );
    //30
    $('#button1').click(function (){
        $("div[name*='tutorial']").css("background" , "yellow");
    });
    //31
    $('#button1').click(function (){
        $("div[name~='tutorial']").css("background" , "yellow");
    });
    //32
    $('#button1').click(function (){
        $("div[name$='tutorial']").css("background" , "yellow");
    });

}
//33
let setup19 = () => {
    $('body').append(
        $("<div>\n" +
            "<label>\n" +
            "<input type=\"radio\" name=\"color\"  value=\"Red\">\n" +
            "<span>name?</span>\n" +
            "</label>\n" +
            "</div>\n" +
            "<div>\n" +
            "<label>\n" +
            "<input type=\"radio\" name=\"color\"  value=\"Green\">\n" +
            "<span>value?</span>\n" +
            "</label>\n" +
            "</div>\n" +
            "<div>\n" +
            "<label>\n" +
            "<input type=\"radio\" name=\"color\"  value=\"Black\">\n" +
            "<span>value?</span>\n" +
            "</label>\n" +
            "</div>\n" +
            "<button id=\"button1\">Click to see the  effect</button>"
        )
    );
    $('#button1').click(function () {
        $("input[value='Red']").next().text (" Red " );
    });
}

//34
let setup20 = () => {
    $('body').append(
        $("<body>\n" +
            "<div>\n" +
            "<input type=\"radio\" name=\"color\"  value=\"Red\">\n" +
            "<span>Red</span>\n" +
            "</div>\n" +
            "<div>\n" +
            "<input type=\"radio\" value=\"Cold Fusion\">\n" +
            "<span>Sky</span>\n" +
            "</div>\n" +
            "<div>\n" +
            "<input type=\"radio\" name=\"accept\"  value=\"Evil Plans\">\n" +
            "<span>Sea</span>\n" +
            "</div>\n" +
            "<button id=\"button1\">Click to see the  effect</button>\n" +
            "</body>"
        )
    );
    $('#button1').click(function () {
        $("input[name !='color']").next().append("<b> not a color</b>");
    });
}
setup20();

