// why it doesn't work on firefox?
$(document).ready(function(){
  var card = $(".card");
  var poster = $("#js-poster");
  var posterH = $("#js-poster").height();

  $(document).on("mousemove",function(e) {  
    var ax = -($(window).innerWidth()/2- e.pageX)/20;
    var ay = ($(window).innerHeight()/2- e.pageY)/10;
    var zoom = Math.abs(e.pageY)/posterH;
    card.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg) scale("+zoom+");-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg) scale("+zoom+");-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg) scale("+zoom+")");
  });
})