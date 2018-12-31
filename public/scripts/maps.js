var this_js_file = $('script[src*=maps]');
function initMap() {
  var lat = this_js_file.attr('lat');
  var lng = this_js_file.attr('lng');
  console.log(lat + " " + lng);
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(lat, lng)
  });
}
