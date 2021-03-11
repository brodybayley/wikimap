const tabs = document.querySelectorAll('[data-tab-target]')
console.log('tabs:', tabs)
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})

//JS for kebab menu
const kebab = document.querySelector('.kebab'),
  middle = document.querySelector('.middle'),
  cross = document.querySelector('.cross'),
  dropdown = document.querySelector('.dropdown');

kebab.addEventListener('click', function () {
  middle.classList.toggle('active');
  cross.classList.toggle('active');
  dropdown.classList.toggle('active');
})

// Controls back arrow
function goBack() {
  window.history.back();
}

