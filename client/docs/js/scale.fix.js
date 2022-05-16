// Handle hightlighting query parameter of start & length using Markjs
var wls = new URLSearchParams(window.location.search);
if (wls.has('highlights')) {
  var range_array = JSON.parse(wls.get('highlights'));
  var ranges = range_array.map(position => ({start: position[0], length: position[1]}));
  var context = document.querySelector("body > div > section");
  var instance = new Mark(context);
  instance.markRanges(ranges);
}

var metas = document.getElementsByTagName('meta');
var i;
if (navigator.userAgent.match(/iPhone/i)) {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
    }
  }
  document.addEventListener("gesturestart", gestureStart, false);
}
function gestureStart() {
  for (i=0; i<metas.length; i++) {
    if (metas[i].name == "viewport") {
      metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
    }
  }
}
