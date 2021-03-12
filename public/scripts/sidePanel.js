/* global $ */

$(() => {
  // Load map points
  const createPointItem = point => {
    let $point = $('<p>')
      .text(point.title)
      .addClass('pin-text');
    return $point;
  };

  const renderPoints = points => {
    $('#pin-list').empty();

    for (let point of points) {
      $('#pin-list').append(createPointItem(point));
    }
  };

  const loadPoints = () => {
    const mapId = 2;
    $.get({
      url: `/api/maps/${mapId}/points`,
      dataType: 'json'
    })
      .then(res => renderPoints(res))
      .catch(err => console.log(err));
  };

  loadPoints();

  // Load user created maps
  const data =
  [
    {
      "id": 1,
      "user_id": 1,
      "title": "Construction Sites",
      "description": "Current constructions going on around Vancouver. Be careful of manholes!",
      "created_on": "2021-03-12T04:11:30.291Z"
    },
    {
      "id": 2,
      "user_id": 3,
      "title": "Food is Life",
      "description": "The title says it all. Food 4eva!!!",
      "created_on": "2021-03-12T04:11:30.291Z"
    },
    {
      "id": 3,
      "user_id": 4,
      "title": "Bird Watching Spots",
      "description": "Grab a chair and sit at these spots to look at birds.",
      "created_on": "2021-03-12T04:11:30.291Z"
    }
  ];

  const createMapItem = map => {
    let $map = $('<p>').text(map.title);
    return $map;
  };

  const renderMaps = maps => {
    $('#my-maps').empty();

    for (let map of maps) {
      $('#my-maps').append(createMapItem(map));
    }
  };

  renderMaps(data);

  // const loadMaps = () => {
  //   const userId = req.session.userId;
  //   $.get({
  //     url: `/api/users/${userId}`,
  //     dataType: 'json'
  //   })
  //     .then(res => renderMaps(res))
  //     .catch(err => console.log(err));
  // };
  // loadMaps();
});
