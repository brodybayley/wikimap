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
    const data = $('form').serialize();
    console.log('leform', data);
    // $.ajax.post({url: '/api/map'}, {data: data}, addMap(data));
    //this post needs addMaps

    $.ajax({
      method: 'POST',
      url: '/api/maps',
      data
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })


    // const submitProperty = function(data) {
    //   return $.ajax({
    //     method: "POST",
    //     url: "/api/properties",
    //     data,
    //   });
    // }


    /*
    newPropertyForm.on('submit', function (event) {
      event.preventDefault();

      views_manager.show('none');

      const data = $(this).serialize();
      submitProperty(data)
      .then(() => {
        views_manager.show('listings');
      })
      .catch((error) => {
        console.error(error);
        views_manager.show('listings');
      })
    });


    //apiRoutes.js /api/properties
    router.post('/properties', (req, res) => {
      const userId = req.session.userId;
      database.addProperty({...req.body, owner_id: userId})
        .then(property => {
          res.send(property);
        })
        .catch(e => {
          console.error(e);
          res.send(e);
        });
    });


    //sql query database file
    const addProperty = function(property) {
      const queryString = `
      INSERT INTO properties (
        owner_id
        , title
        , description
        , thumbnail_photo_url
        , cover_photo_url
        , cost_per_night
        , parking_spaces
        , number_of_bathrooms
        , number_of_bedrooms
        , country
        , street
        , city
        , province
        , post_code)
      VALUES (
        $1
        , $2
        , $3
        , $4
        , $5
        , $6
        , $7
        , $8
        , $9
        , $10
        , $11
        , $12
        , $13
        , $14
      )
      RETURNING *
      `;

      const queryParams = [
        property.owner_id
        , property.title
        , property.description
        , property.thumbnail_photo_url
        , property.cover_photo_url
        , property.cost_per_night
        , property.parking_spaces
        , property.number_of_bathrooms
        , property.number_of_bedrooms
        , property.country
        , property.street
        , property.city
        , property.province
        , property.post_code
      ];

      return db
        .query(queryString, queryParams)
        .then(res => res.rows[0]);
    };

    */


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
