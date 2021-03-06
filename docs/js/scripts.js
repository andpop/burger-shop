// Состав бургера

$('.burger__composition').on('click', e => {
  e.preventDefault();
});

// ============ Полноэкранное гамбургер-меню ============================================
var hamburgermenuLink      = document.querySelector('.hamburger-menu-link');
var hamburgermenuContent   = document.querySelector('.hamburger-menu__content');
var hamburgermenuClose     = document.querySelector('.hamburger-menu__close');
var hamburgermenuItemLinks = document.querySelectorAll('.hamburger-menu__link');

hamburgermenuLink.addEventListener('click', event => {
  event.preventDefault();
  hamburgermenuContent.style.display = 'flex';
  document.body.style.overflow       = 'hidden';
  $('.wrapper').toggleClass('disableOPS');
});

hamburgermenuClose.addEventListener('click', event => {
  event.preventDefault();
  hamburgermenuContent.style.display = '';
  document.body.style.overflow       = '';
  $('.wrapper').toggleClass('disableOPS');
});

for (let i = 0; i<hamburgermenuItemLinks.length; i++) {
  hamburgermenuItemLinks[i].addEventListener('click', event => {
    hamburgermenuContent.style.display = '';
    document.body.style.overflow       = '';
    $('.wrapper').toggleClass('disableOPS');
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
  commentButton.addEventListener("click", event => {
    event.preventDefault();

    // Находим активный отзыв, к которому относится нажатая кнопка
    const activeComment = event.target.closest(".comments__brief");

    // Создаем новый popup, данные будут взяты из активного отзыва
    const popup = createCommentPopup(activeComment);
    document.body.appendChild(popup);
    document.body.style.overflow = 'hidden';
    $('.wrapper').toggleClass('disableOPS');
});
}

function createCommentPopup(activeComment) {
  //Выделяем автора и текст активного отзыва
  const authorElementFromHTML  = activeComment.children[0],
        contentElementFromHTML = activeComment.children[1];

  //Создаем новый popup
  const popupElement  = document.createElement("div"),
        popupTemplate = document.querySelector("#popup-comment-template");
  
  popupElement.classList.add("popup");
  popupElement.innerHTML = popupTemplate.innerHTML;
  
  const authorElement  = popupElement.querySelector(".comments__name"),
        contentElement = popupElement.querySelector(".comments__content");
  
  authorElement.innerHTML  = authorElementFromHTML.innerHTML;
  contentElement.innerHTML = contentElementFromHTML.innerHTML;

  // Щелчок вне сообщения - закрыть popup
  popupElement.addEventListener("click", event => {
    if (event.target.classList.contains('popup')) {
      document.body.removeChild(popupElement);
      document.body.style.overflow = '';
      $('.wrapper').toggleClass('disableOPS');
    };
  });

  // Щелчок на крестике - закрыть popup
  const closeElement = popupElement.querySelector(".popup__close");
  closeElement.addEventListener("click", event => {
    event.preventDefault();
    document.body.removeChild(popupElement);
    document.body.style.overflow = '';
    $('.wrapper').toggleClass('disableOPS');
  });

  $(document).on('keydown', e => {
    const escCode = 27;
    if (e.keyCode == escCode) {
      if ($(document.body).has(popupElement).length > 0) {
        document.body.removeChild(popupElement);
        document.body.style.overflow = '';
        $('.wrapper').toggleClass('disableOPS');
      }
    };
  });
  
  
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
  if ($('.wrapper').hasClass('disableOPS')) return;
  
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
      if ((direction == 'up') || (direction == 'down')) {
        const swipeDirection = direction == 'up' ? 'down' : 'up';
        scrollSection(swipeDirection);  
      };
    }
  });
};


//============================= Обработка формы заказа ===============================

// Крссбраузерная функция определения нажатого символа
// event.type должен быть keypress
function getChar(event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }
  if (event.which != 0 && event.charCode != 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }
  return null; // спец. символ
}


const formOrder = $('#form-order');
const telOrder  = $('#tel-order');

// В поле "Телефон" нельзя вводить буквы
telOrder.on('keypress', e => {
  const inputChar = getChar(e),
        pattern   = /[a-zA-Zа-яА-Я]/;

  if (pattern.test(inputChar)) e.preventDefault();  
});

// Обработка отправки формы
formOrder.on('submit', e => {
  e.preventDefault();
  // console.log("Form submitting...")

  // AJAX-запрос

  var   message = '';
  const form    = $(e.target),
        dataXHR = form.serialize(),
        urlXHR  = form.attr('action'),
        typeXHR = form.attr('method');

  const ajax = $.ajax({
    type    : typeXHR,
    url     : urlXHR,
    dataType: 'JSON',
    data    : dataXHR,
  });

  ajax.done( msg => {
    let status  = msg.status,
        message = msg.message;
    if (status == "OK") {
      // Очищаем поля формы
      $('#form-order')[0].reset();
    };

    const popup = createOrderPopup(message);
    document.body.appendChild(popup);
    document.body.style.overflow = 'hidden';
    $('.wrapper').toggleClass('disableOPS');
  }).fail(function(jqXHR, textStatus) {
    const popup = createOrderPopup(`Ошибка при формировании заказа. <br> Статус: ${textStatus}`);
    document.body.appendChild(popup);
    document.body.style.overflow = 'hidden';
    $('.wrapper').toggleClass('disableOPS');
});

  function createOrderPopup(message) {
    //Создаем новый popup
    const popupElement  = document.createElement("div"),
          popupTemplate = document.querySelector("#popup-form-template");
    
    popupElement.classList.add("popup");
    popupElement.innerHTML = popupTemplate.innerHTML;
    
    const messageElement = popupElement.querySelector(".popup__message");
    
    messageElement.innerHTML = message;
  
    // Щелчок вне сообщения - закрыть popup
    popupElement.addEventListener("click", event => {
      if (event.target.classList.contains('popup')) {
        document.body.removeChild(popupElement);
        document.body.style.overflow = '';
        $('.wrapper').toggleClass('disableOPS');
      };
    });
  
    // Щелчок на кнопке - закрыть popup
    const closeElement = popupElement.querySelector(".btn");
    closeElement.addEventListener("click", event => {
      event.preventDefault();
      document.body.removeChild(popupElement);
      document.body.style.overflow = '';
      $('.wrapper').toggleClass('disableOPS');
    });

    // Нажатие ESC - закрыть popup
    $(document).on('keydown', e => {
      const escCode = 27;
      if (e.keyCode == escCode) {
        if ($(document.body).has(popupElement).length > 0) {
          document.body.removeChild(popupElement);
          document.body.style.overflow = '';
          $('.wrapper').toggleClass('disableOPS');
        }
      };
    });
  
    return popupElement;
  }

});


//============================== Карта Яндекс =============================================
ymaps.ready(init);

var placemarks = [
  {
    latitude      : 59.97,
    longitude     : 30.31,
    hintContent   : 'ул. Литераторов, д. 19',
    balloonContent: 'Самые вкусные бургеры! <br> Заходите с 09:00 до 20:00 на ул. Литераторов, д. 19'
  },
  {
    latitude      : 59.94,
    longitude     : 30.25,
    hintContent   : 'Малый проспект, д. 64',
    balloonContent: 'Самые вкусные бургеры! <br> Заходите с 09:00 до 20:00 на Малый проспект, д. 64'
  },
  {
    latitude      : 59.93,
    longitude     : 30.34,
    hintContent   : 'наб. реки Фонтанки, д. 56',
    balloonContent: 'Самые вкусные бургеры! <br> Заходите с 09:00 до 20:00 на наб. реки Фонтанки, д. 56'
  }

];

function init () {
  var myMap = new ymaps.Map('map', {
    center   : [59.94, 30.32],
    zoom     : 12,
    behaviors: ['drag']
  });
  myMap.controls.add('zoomControl');

  placemarks.forEach(obj => {
    let placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
      hintContent   : obj.hintContent,
      balloonContent: obj.balloonContent
    }, {
      iconImageHref  : './img/contacts/map-marker.svg',
      iconImageSize  : [46, 57],
      iconImageOffset: [-26, -52]
    });
    myMap.geoObjects.add(placemark);
  });


  // var placemark = new ymaps.Placemark([59.97, 30.31], {
  //   hintContent   : 'ул. Литераторов, д. 19',
  //   balloonContent: 'Самые вкусные бургеры! <br> Заходите с 09:00 до 20:00 на ул. Литераторов, д. 19'
  // }, {
  //   iconImageHref  : './img/contacts/map-marker.svg',
  //   iconImageSize  : [46, 57],
  //   iconImageOffset: [-26, -52]
  // });

  // myMap.geoObjects.add(placemark);
};


// $('popup__container').on('keyup', e => {
//   console.log(e.keyCode);
// });