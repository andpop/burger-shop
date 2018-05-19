

// Обработка полноэкранного гамбургер-меню
var hamburgermenuLink      = document.querySelector('.hamburger-menu-link');
var hamburgermenuContent   = document.querySelector('.hamburger-menu__content');
var hamburgermenuClose     = document.querySelector('.hamburger-menu__close');
var hamburgermenuItemLinks = document.querySelectorAll('.hamburger-menu__link');

hamburgermenuLink.addEventListener('click', function(event) {
  event.preventDefault();
  hamburgermenuContent.style.display = 'flex';
  document.body.style.overflow       = 'hidden';
});

hamburgermenuClose.addEventListener('click', function(event) {
  event.preventDefault();
  hamburgermenuContent.style.display = '';
  document.body.style.overflow       = '';
});

for (let i = 0; i<hamburgermenuItemLinks.length; i++) {
  hamburgermenuItemLinks[i].addEventListener('click', function(event) {
    hamburgermenuContent.style.display = '';
    document.body.style.overflow       = '';
  })
};

// Обработка аккордеона в секции "Команда"
var teamAccoItems = document.querySelectorAll('.team-acco__item');
for (let i = 0; i<teamAccoItems.length; i++) {
  teamAccoItems[i].addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (teamAccoItems[i].classList.contains('team-acco__item--active')) {
      teamAccoItems[i].classList.remove('team-acco__item--active');
    } 
    else {      
      for (let j = 0; j < teamAccoItems.length; j++) {
        teamAccoItems[j].classList.remove('team-acco__item--active');
      }  
      
      teamAccoItems[i].classList.add('team-acco__item--active');
    }
  })
};

// Обработка аккордеона в секции "Меню"
var menuAccoItems = document.querySelectorAll('.menu-acco__item');
for (let i = 0; i<menuAccoItems.length; i++) {
  menuAccoItems[i].addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (menuAccoItems[i].classList.contains('menu-acco__item--active')) {
      menuAccoItems[i].classList.remove('menu-acco__item--active');
    } 
    else {      
      for (let j = 0; j < menuAccoItems.length; j++) {
        menuAccoItems[j].classList.remove('menu-acco__item--active');
      }  
      
      menuAccoItems[i].classList.add('menu-acco__item--active');
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
  // Щелчок вне сообщения - закрыть popup
  popupElement.addEventListener("click", function (event) {
    if (event.target.classList.contains('popup')) {
      document.body.removeChild(popupElement);
      document.body.style.overflow = '';
    };
  });

  const popup                  = document.querySelector("#popupTemplate");
        popupElement.innerHTML = popup.innerHTML;

  const closeElement = popupElement.querySelector(".popup__close");
  // Щелчок на крестике - закрыть popup
  closeElement.addEventListener("click", function(event) {
    event.preventDefault();
    document.body.removeChild(popupElement);
    document.body.style.overflow = '';
  });
  
  const contentElement           = popupElement.querySelector(".popup__content");
        contentElement.innerHTML = content;

  return popupElement;
}