/* global $ */

$(() => {
  $('.create-map-cta').on('click', event => {
    event.preventDefault();

    $('.form-popup').toggle();
  });

  $('#close-button').on('click', () => {
    $('.form-popup').toggle();
  });
});
