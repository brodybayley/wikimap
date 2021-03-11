/* global $ */
/* global document */
/* global window */

$(() => {
  $('.nav-user').on('click', () => {
    $('.nav-dropdown-content').toggle();
  });

  $(document).click(event => {
    if ($(event.target).closest('.dropdown').length === 0) {
      $('.nav-dropdown-content').hide();
    }
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
