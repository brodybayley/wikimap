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

    $.ajax({
      method: 'POST',
      url: '/api/maps',
      data: $('form').serialize()
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err));
  });
});
