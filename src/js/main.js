var map;
var posA;

var atmList = document.getElementById('atmList');
var findBtn = document.getElementById('findBtn');

function createListItem(atmLoc, i) {


    lat = atmLoc.geometry.location.lat();
    lng = atmLoc.geometry.location.lng();
    var posB = atmLoc.geometry.location;

    var staticURL = `https://maps.googleapis.com/maps/api/staticmap?center=${atmLoc.vicinity}&zoom=14&size=600x300&maptype=roadmap&markers=color:blue%7C${lat},${lng}&key=AIzaSyCSHF4jFvTp_vWpZC4hcALtZQ0gsnxX7wQ`;

    distance(posA, posB);


    atmList.innerHTML +=  `<li>
                             <h2 class='bank-name'>${atmLoc.name}</h2>
                             <h4 class='distance'>${d} m</h4>
                             <img class='map-img' src='${staticURL}'></div>
                             <hr>
                           </li>`;
}


//prompt for location and check if geoloc is supported
findBtn.addEventListener('click', function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
  }
});

function initMap(position) {
  // get user's position
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  posA = new google.maps.LatLng(latitude, longitude);

  userPos = {
    lat: latitude,
    lng: longitude
  };

  // map center on user location
  map = new google.maps.Map(document.getElementById('map'), {
    center: userPos,
    zoom: 12
  });

  //find ATMs and rank them by distance from user
  var findATM = {
    location: userPos,
    rankBy: google.maps.places.RankBy.DISTANCE,
    type: ['atm']
  };

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(findATM, callback);

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < 10; i++) {
      createListItem(results[i], i);
    }
  }
}

var d;
var rad = function(x) {
  return x * Math.PI / 180;
};
var distance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  d = R * c;
  d = Math.round(d);
  return d; // returns the distance in meter
};
