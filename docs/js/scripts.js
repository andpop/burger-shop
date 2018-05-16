

// Обработка полноэкранного гамбургер-меню
var hamburgermenu_link       = document.querySelector('.hamburger-menu-link');
var hamburgermenu_content    = document.querySelector('.hamburger-menu__content');
var hamburgermenu_close      = document.querySelector('.hamburger-menu__close');
var hamburgermenu_item_links = document.querySelectorAll('.hamburger-menu__link');

hamburgermenu_link.addEventListener('click', function(event) {
  event.preventDefault();
  hamburgermenu_content.style.display = 'flex';
  document.body.style.overflow        = 'hidden';
});

hamburgermenu_close.addEventListener('click', function(event) {
  event.preventDefault();
  hamburgermenu_content.style.display = '';
  document.body.style.overflow        = '';
});

var l = hamburgermenu_item_links.length;
for (let i = 0; i<l; i++) {
  hamburgermenu_item_links[i].addEventListener('click', function(event) {
    hamburgermenu_content.style.display = '';
    document.body.style.overflow        = '';
  })
};

// Обработка аккордеона в секции "Команда"
var teamacco_items = document.querySelectorAll('.team-acco__item');
var l              = teamacco_items.length;
for (let i = 0; i<l; i++) {
  teamacco_items[i].addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (teamacco_items[i].classList.contains('team-acco__item--active')) {
      teamacco_items[i].classList.remove('team-acco__item--active');
    } 
    else {      
      for (let j = 0; j < l; j++) {
        teamacco_items[j].classList.remove('team-acco__item--active');
      }  
      
      teamacco_items[i].classList.add('team-acco__item--active');
    }
  })
};