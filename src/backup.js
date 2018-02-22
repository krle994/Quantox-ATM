var userPos;
var atmList = document.getElementById('atmList');
var findBtn = document.getElementById('findBtn');

function createListItem (atmList, location) {

  var lat = location.geometry.location.lat();
  var lng = location.geometry.location.lng();

  var posA = google.maps.LatLng(userPos.lat, userPos.lng)
  var posB = google.maps.LatLng(lat,lng)
  var distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(posA, posB) / 1000).toFixed(2);


  var template = `
             <div>
               <h2 class="bank-name">${location.name}</h2>
               <h4 class="distance">${distance}</h4>
               <img class="map-img" src="https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=400x400&markers=${lat},${lng}&key=AIzaSyCSHF4jFvTp_vWpZC4hcALtZQ0gsnxX7wQ">
               <hr>
             </div>`;

  atmList.innerHTML = template;
}



findBtn.addEventListener('click', function() {


      function getAtmList() {

        //prompt for location and check if geoloc is supported
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {

              // get user's position
              userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              // map center on user location
              var map = new google.maps.Map(document.getElementById('map'), {
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

              function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  for (var i = 0; i < results.length; i++) {
                  createListItem(atmList, results[i]);
                  if (i == 9) {
                    break;
                  }
                }
              }
            }
          });
        }
      }
      getAtmList();
    });
