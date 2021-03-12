/* global $ */

$(() => {

  const data =
    {
      "id": 1,
      "user_id": 1,
      "title": "Construction Sites",
      "description": "Current constructions going on around Vancouver. Be careful of manholes!",
      "created_on": "2021-03-12T04:11:30.291Z"
    };

  const createMapItem = map => {

    let $map = $('<p>').text(map.title);
    return $map;
  };

  console.log(createMapItem(data));

  const renderMaps = maps => {
    $('#my-maps').empty();

    for (let map of maps) {
      $('#my-maps').append(createMapItem(map));
    }
  };

  renderMaps();

  const loadMaps = () => {
    const userId = req.session.userId;
    $.get({
      url: `/api/users/${userId}`,
      dataType: 'json'
    })
      .then(res => renderMaps(res))
      .catch(err => console.log(err));
  };
  loadMaps();
});
