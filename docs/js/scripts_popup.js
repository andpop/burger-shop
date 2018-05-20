

// Popup для полного текста отзывов
const commentButtonList = document.querySelectorAll(".comments__btn");

for (let commentButton of commentButtonList) {
  commentButton.addEventListener("click", function(event) {
    event.preventDefault();
    const full_comment = getFullCommentHTML(this);
    const successPopup = createPopup(full_comment);

    document.body.appendChild(successPopup);
});
}



function getFullCommentHTML(commentButton) {
  let   fullComment        = 'Полного комментария нет';
  const fullCommentElement = commentButton.nextElementSibling.nextElementSibling;
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
  closeElement.addEventListener("click", function() {
    document.body.removeChild(popupElement);
  });
  const popupContainer = popupElement.querySelector(".popup__container");
  popupContainer.addEventListener("click", function () {
    console.log("Click!");
  });

  const contentElement           = popupElement.querySelector(".popup__content");
        contentElement.innerHTML = content;

  return popupElement;
}