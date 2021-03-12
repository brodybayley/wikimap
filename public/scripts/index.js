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
  const mapData = {
    id: 1,
    user_id: 1,
    title: "Construction Sites",
    description: "Current constructions going on around Vancouver. Be careful of manholes!",
    created_on: "2021-03-10T21:24:14.466Z"
  };

  const $map = $(`
    <div class="map-card">
      <div class="img-mask">
        <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg" alt="map" class="map-thumbnail">
      </div>
      <div class="map-heading">${mapData.title}</div>
    </div>
  `);

  console.log($map);

  $('#index-maps-container').append($map);

  // const loadMaps = () => {
  //   $.ajax({
  //     url: '/',
  //     method: 'GET',
  //     dataType: 'json'
  //   })
  //     .then(res => console.log(res));
  // };

  // loadMaps();
});
