/* global $ */

$(() => {
  $('.nav-user').on('click', () => {
    $('.nav-dropdown').toggle();
  });

  $('#nav-logout').on('click', event => {
    event.preventDefault();

    $.post('/logout')
      .then(() => {
        window.location.replace('http://localhost:8080/');
      })
      .catch(err => console.log(err));

  });
});
