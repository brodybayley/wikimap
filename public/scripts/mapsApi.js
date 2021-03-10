
const addMarker = coords => {
    let marker = new google.maps.Marker({
        position: coords,
        map: map
    });
};

// let infoWindow = new google.maps.InfoWindow({
//   content:'<h1>Hello</h1>'
// });
// marker.addListener('click', function() {
//   infoWindow.open(map, marker);
// });

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
    });
    const geocoder = new google.maps.Geocoder();
    document.getElementById("submit").addEventListener("click", () => {
        geocodeAddress(geocoder, map);
    });
}

const addPoint = (result) => {
    const userId = req.params.userId;
    const mapId = req.params.map_id;
    const lat = results[0].geometry.location.latitude
    const long = results[0].geometry.location.longitude
    const title = results[0].address_components.formatted_address
    return db.query(`INSERT INTO POINTS (user_id, map_id, title, latitude, longitude)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *;`, [userId, mapId, title, latitude, longitude])
}



function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            console.log('results', results)
            addPoint(result);
            //results here is an object, containing a formatted address,
            //and a place_id.
            resultsMap.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
        } else {
            alert(
                "Geocode was not successful for the following reason: " + status
            );
        }
    });
}
