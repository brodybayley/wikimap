/* global $ */

$(() => {
  const data = [
    {
      "id": 3,
      "map_id": 1,
      "user_id": 1,
      "title": "Manhole Discovered",
      "description": "description",
      "longitude": 49.266239,
      "latitude": -123.162111,
      "image_url": "https://images.unsplash.com/photo-1577896021507-78957e4b77d2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y29uc3RydWN0aW9uc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    },
    {
      "id": 4,
      "map_id": 1,
      "user_id": 3,
      "title": "New Building at CityHall",
      "description": "description",
      "longitude": 49.26333,
      "latitude": -123.11514,
      "image_url": "https://images.unsplash.com/photo-1575371495064-0df0980c3d4c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y29uc3RydWN0aW9uc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
    }
  ];

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

  renderPoints(data);



  // const data =
  //   {
  //     "id": 1,
  //     "user_id": 1,
  //     "title": "Construction Sites",
  //     "description": "Current constructions going on around Vancouver. Be careful of manholes!",
  //     "created_on": "2021-03-12T04:11:30.291Z"
  //   };

  // const createMapItem = map => {

  //   let $map = $('<p>').text(map.title);
  //   return $map;
  // };

  // console.log(createMapItem(data));

  // const renderMaps = maps => {
  //   $('#my-maps').empty();

  //   for (let map of maps) {
  //     $('#my-maps').append(createMapItem(map));
  //   }
  // };

  // renderMaps();

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
