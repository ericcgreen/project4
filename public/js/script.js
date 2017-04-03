$(document).ready(function(){

$("#star-1").click(function(){
  $(".star-bar").css("width", "20%");
  $("#star-val").val(1);
})
$("#star-2").click(function(){
  $(".star-bar").css("width", "40%");
  $("#star-val").val(2);
})
$("#star-3").click(function(){
  $(".star-bar").css("width", "60%");
  $("#star-val").val(3);
})
$("#star-4").click(function(){
  $(".star-bar").css("width", "80%");
  $("#star-val").val(4);
})
$("#star-5").click(function(){
  $(".star-bar").css("width", "100%");
  $("#star-val").val(5);
})

})
