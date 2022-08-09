import $ from 'jquery';

$('#button1').click(function(){
   $('textarea').css('border', '3px solid black').add('p')
       .css('border', '3px solid black');
});

$('#button2').click(function(){
   $('textarea').css('background', 'red').add('p')
       .css('background', 'red');
});