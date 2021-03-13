function initMap() {
  const mapId = 2;
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 49.2827, lng: -123.1207 },
  });
  const addMarker = function (coords) {
    console.log('coords', coords);
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(coords),
      map: map
    });
  };
  $.get({
    url: `/api/maps/${mapId}/points`,
    datatype: 'json'
  })
    .then(points => {
      console.log('points', points)
      console.log('latitude', points[0]);
      for (let point of points) {
        console.log(point);
        console.log(point.latitude);
        console.log(point.longitude);
        addMarker({
          lat: point.latitude,
          lng: point.longitude,
        })
      }
    })
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    pointMasterFunction(geocoder, map);
  });
}

const addPoint = ({ latitude, longitude }, data) => {
  console.log('addPoint called')
  const mapId = 2;
  const title = data[0].value;
  const description = data[1].value;
  const image_url = data[2].value;
  $.post({
    url: `/api/maps/${mapId}/points`,
    data: { user_id: 1, map_id: mapId, description: description, latitude: latitude, title: title, image_url: image_url, longitude: longitude }
  })
}


function pointMasterFunction(geocoder, resultsMap) {

  const address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      console.log('results', results)
      //results here is an object, containing a formatted address,
      //and a place_id
      resultsMap.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
      console.log('ma point', marker);
      marker.addListener("click", () => {
        console.log('results', results[0].geometry.location.lat());
        $('#add-pin-popup').toggle();
        $("#add-pin-form").on("submit", function (event) {
          event.preventDefault();
          const latitude = results[0].geometry.location.lat();
          const longitude = results[0].geometry.location.lng();
          const coordinates = { latitude, longitude }
          const data = $(this).serializeArray();
          console.log('data', data);
          addPoint(coordinates, data);
        });
        //and now, we can generate the popup, have the user input info with Ajax, and then save their info to the db.
      });
    } else {
      alert(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });
}

