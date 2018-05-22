

// ============ Полноэкранное гамбургер-меню ============================================
var hamburgermenuLink      = document.querySelector('.hamburger-menu-link');
var hamburgermenuContent   = document.querySelector('.hamburger-menu__content');
var hamburgermenuClose     = document.querySelector('.hamburger-menu__close');
var hamburgermenuItemLinks = document.querySelectorAll('.hamburger-menu__link');

hamburgermenuLink.addEventListener('click', event => {
  event.preventDefault();
  hamburgermenuContent.style.display = 'flex';
  document.body.style.overflow       = 'hidden';
});

hamburgermenuClose.addEventListener('click', event => {
  event.preventDefault();
  hamburgermenuContent.style.display = '';
  document.body.style.overflow       = '';
});

for (let i = 0; i<hamburgermenuItemLinks.length; i++) {
  hamburgermenuItemLinks[i].addEventListener('click', event => {
    hamburgermenuContent.style.display = '';
    document.body.style.overflow       = '';
  })
};

// =========== Аккордеон в секции "Команда" =====================================
var teamAccoItems = document.querySelectorAll('.team-acco__item');
for (let i = 0; i<teamAccoItems.length; i++) {
  teamAccoItems[i].addEventListener('click', event => {
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

// =========== Аккордеон в секции "Меню" ===================================
var menuAccoItems = document.querySelectorAll('.menu-acco__item');
for (let i = 0; i<menuAccoItems.length; i++) {
  menuAccoItems[i].addEventListener('click', event => {
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
      
      // Удаляем все дополнительные блоки с меню
      let additionalMenuItems = document.querySelectorAll('.menu-acco__item--additional');
      for (let j = 0; j < additionalMenuItems.length; j++) additionalMenuItems[j].remove();

      // Создаем дополнительный блок, содержимое копируем из выбранного элемента меню
      let additionalMenuItem = document.createElement("div");
      let activeMenuItem     = event.target.closest(".menu-acco__item");

      additionalMenuItem.innerHTML = activeMenuItem.innerHTML;
      additionalMenuItem.classList.add("menu-acco__item", "menu-acco__item--additional");
      let sectionMenu = document.querySelector(".menu");
      sectionMenu.appendChild(additionalMenuItem);

      // Добавляем обработчики для закрытия дополнительного блока
      additionalMenuItem.addEventListener('click', event => {
        event.preventDefault();
        let additionalMenuItem = document.querySelector(".menu-acco__item--additional");
        additionalMenuItem.remove();        
      });
      let closePictogram = document.querySelector(".menu-acco__close");
      closePictogram.addEventListener("click", event => {
        event.preventDefault();
        let additionalMenuItem = document.querySelector(".menu-acco__item--additional");
        additionalMenuItem.remove();        
      });

    }
  })
};


// ================== Popup для полного текста отзывов ====================================
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
  popupElement.addEventListener("click", event => {
    if (event.target.classList.contains('popup')) {
      document.body.removeChild(popupElement);
      document.body.style.overflow = '';
    };
  });

  const popup                  = document.querySelector("#popupTemplate");
        popupElement.innerHTML = popup.innerHTML;

  const closeElement = popupElement.querySelector(".popup__close");
  // Щелчок на крестике - закрыть popup
  closeElement.addEventListener("click", event => {
    event.preventDefault();
    document.body.removeChild(popupElement);
    document.body.style.overflow = '';
  });
  
  const contentElement = popupElement.querySelector(".popup__content");
  
  contentElement.innerHTML = content;

  return popupElement;
}


// ============== Слайдер с бургерами ============================================

const sliderList  = document.querySelector(".slider__list");
const sliderItems = document.querySelectorAll(".slider__item");

const numberItems = sliderItems.length;
setSliderWidth(numberItems);

// Определяем, на сколько процентов нужно изменять свойство right у списка, чтобы показать следующий/предыдущий слайд
const shiftProcent = 100 / numberItems;

var currentSlide = 1;
showNthSlide(currentSlide, shiftProcent);

const prevSlide = document.querySelector(".slider-scroll__link--prev");
const nextSlide = document.querySelector(".slider-scroll__link--next");

prevSlide.addEventListener("click", (event) => {
  event.preventDefault();
  currentSlide--;
  if (currentSlide <= 0) currentSlide = numberItems;
  showNthSlide(currentSlide, shiftProcent);
})

nextSlide.addEventListener("click", (event) => {
  event.preventDefault();
  currentSlide++;
  if (currentSlide > numberItems) currentSlide = 1;
  showNthSlide(currentSlide, shiftProcent);
})


function setSliderWidth(numberItems) {
  let slider      = document.querySelector(".slider"),
      sliderWidth = numberItems * 100  +"%";
  
  slider.style.width = sliderWidth;
  ;}

function showNthSlide(n, shiftProcent) {
  let right = (n-1) * shiftProcent;

  sliderList.style.right = right + "%";
}
  

//======================== OnePageScroll ==================================
const sections              = $('.section');
const display               = $('.maincontent');
const verticalNavItems      = $('.vertical-nav__item');
let   inScroll              = false;
const inertionMouseDuration = 300;                                           // за 300 миллисекунд гасится инерция мыши на Mac
const mobileDetect          = new MobileDetect(window.navigator.userAgent);
const isMobile              = mobileDetect.mobile();

const performTransition = sectionNomer => {
  const shiftProcent = `${-sectionNomer*100 }%`;

  if (sectionNomer < 0) return;
  
  if (!inScroll) {
    inScroll = true;
    
    sections
      .eq(sectionNomer)
      .addClass('section--active')
      .siblings()
      .removeClass('section--active');
  
    verticalNavItems
      .eq(sectionNomer)
      .addClass('vertical-nav__item--active')
      .siblings()
      .removeClass('vertical-nav__item--active');

    display.css({
      "transform"        : `translateY(${shiftProcent})`,
      "-webkit-transform": `translateY(${shiftProcent})`
    });
      
  };
  
  // Задержка анимации в миллисекундах
  const transitionDuration = parseInt(display.css('transition-duration')) * 1000;
  setTimeout( () => {
    inScroll = false;
  }, transitionDuration + inertionMouseDuration);      
}

const scrollSection = direction => {
  const activeSection = sections.filter('.section--active');
  const nextSection   = activeSection.next();
  const prevSection   = activeSection.prev();

  if (direction == "up") {
    performTransition(prevSection.index());
  } else {
    performTransition(nextSection.index());
  };
}

$(document).on({
  wheel : e => {
    const deltaY = e.originalEvent.deltaY;
    
    let direction = deltaY < 0 ? 'up' : 'down';
    scrollSection(direction);
  },
  keydown: e => {
    const upCode = 38, pageUpCode = 33, downCode = 40, pageDownCode = 34;
    // console.log(e.keyCode);
    if ((e.keyCode == upCode) || (e.keyCode == pageUpCode))
      scrollSection('up');
    if ((e.keyCode == downCode) || (e.keyCode == pageDownCode))
      scrollSection('down');
  }
} );

verticalNavItems.on('click', function(e) {
  e.preventDefault();
  const activeNavItem = $(this);
  activeNavItem
    .addClass('vertical-nav__item--active')
    .siblings()
    .removeClass('vertical-nav__item--active'); 
  const sectionNomer = $('.vertical-nav__item--active').index('.vertical-nav__item');
  performTransition(sectionNomer);
});

$('.arrow-scroll').on('click', e => {
  e.preventDefault();
  performTransition(1);
});

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();
  const sectionNomer = $(e.currentTarget).data('scroll-to');
  performTransition(sectionNomer);
});

if (isMobile) {
  $(document).swipe({
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      const swipeDirection = direction == 'up' ? 'down' : 'up';
      scrollSection(swipeDirection);  
    }
  });
};
