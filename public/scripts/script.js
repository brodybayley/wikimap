/* global $ */
/* global document */

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

  $('#arrow-back-button').on('click', event => {
    event.preventDefault();
    $('#custom-point-feed').toggle();
    $('#custom-map-feed').toggle();
  });

  /* when a user clicks, toggle the 'is-animating' class */
  $(".heart").on('click touchstart', function () {
    $(this).toggleClass('is_animating');
    $(this).toggleClass('liked');
  });

  /*when the animation is over, remove the class*/
  $(".heart").on('animationend', function () {
    $(this).toggleClass('is_animating');
  });
});




