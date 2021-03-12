/* global $ */
/* global window */

$(() => {
  // Map form pop up appears
  $('.create-map-cta').on('click', event => {
    event.preventDefault();

    $('#create-map-popup').toggle();
  });

  $('.edit-map-cta').on('click', event => {
    event.preventDefault();

    $('#edit-map-popup').toggle();
  });

  $('.add-pin-cta').on('click', event => {
    event.preventDefault();

    $('#add-pin-popup').toggle();
  });

  // Map form pop up disappears
  $('.close-button').on('click', event => {
    // $('.form-popup').toggle();
    $(event.target).closest('.form-popup').toggle();
  });

  // Create new map to database
  $('.map-form').on('submit', event => {
    event.preventDefault();

    $.post({
      url: '/api/maps',
      data: $('form').serialize(),
    })
      .then(() => {
        window.location.replace('http://localhost:8080/maps');
      })
      .catch(err => console.log(err));
  });

});
