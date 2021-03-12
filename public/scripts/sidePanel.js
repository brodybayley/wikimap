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

  const loadMaps = () => {
    const userId = 1;
    $.get({
      url: `/api/users/${userId}`,
      dataType: 'json'
    })
      .then(res => renderMaps(res))
      .catch(err => console.log(err));
  };
  loadMaps();
});
