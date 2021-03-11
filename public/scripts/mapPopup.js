/* global $ */

$(() => {
  $('.create-map-cta').on('click', event => {
    event.preventDefault();

    $('.form-popup').toggle();
  });

  $('#close-button').on('click', () => {
    $('.form-popup').toggle();
  });

  $('.map-form').on('submit', event => {
    event.preventDefault();
    const title = $('#input-map-title').val();
    const description = $('#input-map-description').val();
    console.log(title);
    console.log(description);
    const serializedForm = $('form').serialize();
    console.log('leform', serializedForm);
    $.ajax.post({url: '/api/map'}, {data: serializedForm});
    //this post needs addMaps


// const addMap = map => {
//   const queryStr = `
//     INSERT INTO maps (user_id, title, description)
//     VALUES ($1, $2, $3)
//     RETURNING *
//   `;

//   const values = [map.user_id, map.title, map.description];

//   return db
//     .query(queryStr, values)
//     .then(res => res.rows);
// };
    //$.ajax({ url: '/tweets', method: 'POST', data: $(this).serialize() })
  });
});
