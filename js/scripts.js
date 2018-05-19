

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

for (let i = 0; i<hamburgermenu_item_links.length; i++) {
  hamburgermenu_item_links[i].addEventListener('click', function(event) {
    hamburgermenu_content.style.display = '';
    document.body.style.overflow        = '';
  })
};

// Обработка аккордеона в секции "Команда"
var teamacco_items = document.querySelectorAll('.team-acco__item');
for (let i = 0; i<teamacco_items.length; i++) {
  teamacco_items[i].addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (teamacco_items[i].classList.contains('team-acco__item--active')) {
      teamacco_items[i].classList.remove('team-acco__item--active');
    } 
    else {      
      for (let j = 0; j < teamacco_items.length; j++) {
        teamacco_items[j].classList.remove('team-acco__item--active');
      }  
      
      teamacco_items[i].classList.add('team-acco__item--active');
    }
  })
};

// Обработка аккордеона в секции "Меню"
var menuacco_items = document.querySelectorAll('.menu-acco__item');
for (let i = 0; i<menuacco_items.length; i++) {
  menuacco_items[i].addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (menuacco_items[i].classList.contains('menu-acco__item--active')) {
      menuacco_items[i].classList.remove('menu-acco__item--active');
    } 
    else {      
      for (let j = 0; j < menuacco_items.length; j++) {
        menuacco_items[j].classList.remove('menu-acco__item--active');
      }  
      
      menuacco_items[i].classList.add('menu-acco__item--active');
    }
  })
};



// Popup для полного текста отзывов
const commentButtonList = document.querySelectorAll(".comments__btn");

for (let commentButton of commentButtonList) {
  commentButton.addEventListener("click", function(event) {
    event.preventDefault();
    const full_comment = getFullCommentHTML(this);
    const successPopup = createPopup(full_comment);
    document.body.appendChild(successPopup);
    document.body.style.overflow = 'hidden';

});
}

function getFullCommentHTML(commentButton) {
  let fullComment        = 'Полного комментария нет';
  let fullCommentElement = commentButton.nextElementSibling;
  if (!commentButton.classList.contains('comments__btn--mobile')) 
    fullCommentElement = commentButton.nextElementSibling.nextElementSibling;
  if (fullCommentElement) {
    if (fullCommentElement.classList.contains('full_commentContent')) {
      fullComment = fullCommentElement.innerHTML;
    }
  }
  return fullComment;
};

function createPopup(content) {
  const popupElement = document.createElement("div");
  popupElement.classList.add("popup");

  const popup                  = document.querySelector("#popupTemplate");
        popupElement.innerHTML = popup.innerHTML;

  const closeElement = popupElement.querySelector(".popup__close");
  closeElement.addEventListener("click", function(event) {
    event.preventDefault();
    document.body.removeChild(popupElement);
    document.body.style.overflow = '';

  });
  // const popupContainer = popupElement.querySelector(".popup__container");
  // popupContainer.addEventListener("click", function () {
  //   console.log("Click!");
  // });
  const contentElement           = popupElement.querySelector(".popup__content");
        contentElement.innerHTML = content;

  return popupElement;
}