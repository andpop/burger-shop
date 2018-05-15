const hamburgermenu_link = document.querySelector('.hamburger-menu-link');
const hamburgermenu_content = document.querySelector('.hamburger-menu__content');
const hamburgermenu_close   = document.querySelector('.hamburger-menu__close');

hamburgermenu_link.addEventListener('click', function(event) {
  event.preventDefault();
  hamburgermenu_content.style.display = 'flex';
  // hamburger__menu.style.display = 'none';
  document.body.style.overflow = 'hidden';
}) 

hamburgermenu_close.addEventListener('click', function(event) {
  event.preventDefault();
  hamburgermenu_content.style.display = '';
  // hamburger__menu.style.display = '';
  document.body.style.overflow = '';
})