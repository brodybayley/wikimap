
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
        pointMasterFunction(geocoder, map);
    });
}

const addPoint = (results) => {
    console.log('addPoint called')
    const mapId = 1;
    const lat = results[0].geometry.location.latitude
    const long = results[0].geometry.location.longitude
    const title = results[0].address_components.formatted_address
    //     point.map_id,
    //     point.user_id,
    //     point.title,
    //     point.description,
    //     point.longitude,
    //     point.latitude,
    //     point.image_url
    //   ];
    $.post(`/api/points/${mapId}/points`, { user_id: 1, map_id: mapId, latitude: lat, title: 'testTitle', image: 'testImage', longitude: long })
        .then((res) => {
            console.log('res', res);
        }
        )
        .catch((err) => {
            console.log('err', err)
        })
    // return db.query(`INSERT INTO POINTS (user_id, map_id, title, latitude, longitude)
    //      VALUES ($1, $2, $3, $4, $5)
    //      RETURNING *;`, [userId, mapId, title, latitude, longitude])
}


function pointMasterFunction(geocoder, resultsMap) {

    const address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
            console.log('results', results)
            addPoint(results);
            //results here is an object, containing a formatted address,
            //and a place_id.
            resultsMap.setCenter(results[0].geometry.location);
            let marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
            console.log('ma point', marker);
            marker.addListener("click", () => {
                console.log(results);
                $('#create-pin-popup').toggle();
                $("#point-form").on("submit", function (event) {
                    console.log('hello!')
                    event.preventDefault();
                    console.log('this is this', this);
                    const data = $(this).serializeArray();
                    console.log('data', data);
                    const title = data[0].value;
                    const description = data[1].value;
                    const image_url = data[2].value;
                    console.log('things!', title, description, image_url);

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

