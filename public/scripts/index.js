/* global $ */

$(() => {
  // const mapData = [
  //   {
  //     id: 1,
  //     user_id: 1,
  //     title: "Construction Sites",
  //     description: "Current constructions going on around Vancouver. Be careful of manholes!",
  //     created_on: "2021-03-10T21:24:14.466Z"
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     title: "Food is Life",
  //     description: "The title says it all. Food 4eva!!!",
  //     created_on: "2021-03-10T21:24:14.466Z"
  //   },
  //   {
  //     id: 3,
  //     user_id: 4,
  //     title: "Bird Watching Spots",
  //     description: "Grab a chair and sit at these spots to look at birds.",
  //     created_on: "2021-03-10T21:24:14.466Z"
  //   }
  // ];
  // const mapData = {
  //   id: 1,
  //   user_id: 1,
  //   title: "Construction Sites",
  //   description: "Current constructions going on around Vancouver. Be careful of manholes!",
  //   created_on: "2021-03-10T21:24:14.466Z"
  // };


  // console.log($map);



  const createMapRow = map => {
    const $map = $(`
      <div class="maplist-item img-right">
      <div class="map-description left">
        <h1>${map.title}</h1>
        <p class="description-text">${map.description}</p>
        <div class="map-cta">
          <button class="button-text">Check Out Map</button>
        </div>
      </div>
      <div class="img-mask">
        <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg" alt="map" class="map-img">
      </div>
    </div>
    `);
    return $map;
  };

  const renderMapRows = maps => {
    $('.index-maps-container').empty();

    for (let map of maps) {
      $('.index-maps-container').append(createMapRow(map));
    }
  };

  const loadMaps = () => {
    $.get({
      url: '/api/maps',
      dataType: 'json'
    })
      .then(res => renderMapRows(res))
      .catch(err => console.log(err));
  };

  loadMaps();
});
