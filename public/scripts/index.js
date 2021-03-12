/* global $ */

$(() => {
  const createMapRowDefault = map => {
    const $map = $(`
      <div class="maplist-item img-right">
      <div class="map-description left">
        <h1>${map.title}</h1>
        <p class="description-text">${map.description}</p>
        <div class="map-cta">
            <a class="anchor-button button-text" href='/maps'>Check Out Map</a>
        </div>
      </div>
      <div class="img-mask">
        <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg" alt="map" class="map-img">
      </div>
    </div>
    `);
    return $map;
  };

  const createMapRowAlt = map => {
    const $map = $(`
      <div class="maplist-item img-left">
      <div class="img-mask">
        <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg" alt="map" class="map-img">
      </div>
      <div class="map-description right">
        <h1>${map.title}</h1>
        <p class="description-text">${map.description}</p>
        <div class="map-cta">
            <a class="anchor-button button-text" href='/maps'>Check Out Map</a>
        </div>
      </div>
    </div>
    `);
    return $map;
  };


  const renderMapRows = maps => {
    $('.index-maps-container').empty();

    for (let i = 0; i < maps.length; i++) {
      if (i % 2 === 0) {
        $('.index-maps-container').append(createMapRowDefault(maps[i]));
      } else {
        $('.index-maps-container').append(createMapRowAlt(maps[i]));
      }
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
