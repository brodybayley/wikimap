/* global $ */
/* global window */

$(() => {
  $('.nav-user').on('click', () => {
    $('.nav-dropdown-content').toggle();
  });

  $('#nav-logout').on('click', event => {
    event.preventDefault();

    $.post('/logout')
    .then(() => {
      window.location.replace('http://localhost:8080/');
    })
    .catch(err => console.log(err));
  });

  // window.onclick = () => {
  //   $('.nav-dropdown-content').toggle();
  // };

});
