
var docHeight = 9999,
  windowHeight = -1,
  thisY = 0,		
  lastY = 0,
  blocker = true,
  IE = document.all?true:false;

setDocHeight = function() {
  var d = document;
  window.setTimeout(function() {
    docHeight = Math.max(
      Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
      Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
      Math.max(d.body.clientHeight, d.documentElement.clientHeight))
  }, 0);
}
setWindowHeight = function() {
  window.setTimeout(function() {
    if (document.body && document.body.offsetWidth)
      windowHeight = document.body.offsetHeight;
    if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth )
      windowHeight = document.documentElement.offsetHeight;
    if (window.innerHeight && window.innerWidth)
      windowHeight = window.innerHeight;
  }, 0);
}
getYPosition = function() {
  if (self.pageYOffset) return self.pageYOffset;
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}
infiniteScroll = function() {
  thisY = getYPosition();

  if(thisY != lastY && blocker) 
    blocker = false;

  lastY = thisY;

  if(!blocker) {
    if(windowHeight + thisY >= docHeight) {
      blocker = true;
      window.scroll(0, 0);
      lastY = 0;
    } else if(thisY === 0) {
      blocker = true;
      window.scroll(0, windowHeight);
      lastY = windowHeight;
    }	
  }
}
initialize = function() {
  setDocHeight();
  setWindowHeight();
  setInterval("infiniteScroll()", 1);
}

if(IE) {
  window.attachEvent('onresize', setWindowHeight);
  window.attachEvent('onload', initialize);
} else {
  window.addEventListener('resize', setWindowHeight, false);
  window.addEventListener('load', initialize, false);
}

jQuery(document).ready(function(){
  console.log(getCookie('opened'));
  if(getCookie('opened')===1){
      jQuery('#overlay').remove();
  }else{
    jQuery('#overlay').click(function(e){
      setCookie('opened',1,1);
      jQuery('#overlay').fadeOut();
      jQuery('#overlay').delay(400).remove();
    })
  }
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}