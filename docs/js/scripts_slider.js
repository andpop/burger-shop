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
  