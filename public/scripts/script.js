/* global $ */
/* global document */
/* global window */

$(() => {

  const tabs = document.querySelectorAll('[data-tab-target]');
  const tabContents = document.querySelectorAll('[data-tab-content]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.tabTarget);
      tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
      });
      tabs.forEach(tab => {
        tab.classList.remove('active');
      });
      tab.classList.add('active');
      target.classList.add('active');
    });
  });

  //JS for kebab menu
  const kebab = document.querySelector('.kebab'),
    middle = document.querySelector('.middle'),
    cross = document.querySelector('.cross'),
    dropdown = document.querySelector('.kebab-dropdown');

  kebab.addEventListener('click', () => {
    middle.classList.toggle('active');
    cross.classList.toggle('active');
    dropdown.classList.toggle('active');
  });

  // Controls back arrow
  function goBack() {
    window.history.back();
  }

  $('#arrow-back-button').on('click', event => {
    event.preventDefault();

    $('#custom-point-feed').toggle();
    $('#custom-map-feed').toggle();
  });

  $('.kebab-container').on('click', event => {
    event.preventDefault();

    $('.kebab-dropdown').toggle();
  });

});




