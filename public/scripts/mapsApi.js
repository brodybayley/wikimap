// const addMarker = function (coords) {
//     console.log('coords', coords);
//     let marker = new google.maps.Marker({
//         position: new google.maps.LatLng(coords),
//         map: map
//     });
// };

// let infoWindow = new google.maps.InfoWindow({
//   content:'<h1>Hello</h1>'
// });
// marker.addListener('click', function() {
//   infoWindow.open(map, marker);
// });

function initMap() {
    const mapId = 2;
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
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
    const mapId = 1;
    const title = data[0].value;
    const description = data[1].value;
    const image_url = data[2].value;
    //     point.map_id,
    //     point.user_id,
    //     point.title,
    //     point.description,
    //     point.longitude,
    //     point.latitude,
    //     point.image_url
    //   ];
    $.post({
        url: `/api/points/${mapId}/points`,
        // data: $('#point-form').serialize()
        data: { user_id: 1, map_id: mapId, description: description, latitude: latitude, title: title, image_url: image_url, longitude: longitude }
    })
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
                    console.log('hello!')
                    console.log('this is this', this);
                    const data = $(this).serializeArray();
                    console.log('data', data);
                    addPoint(coordinates, data);
                    // const title = data[0].value;
                    // const description = data[1].value;
                    // const image_url = data[2].value;
                    // console.log('things!', title, description, image_url);
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

