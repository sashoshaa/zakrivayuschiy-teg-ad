/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

// Предотвращаем перезагрузку страницы при любых действиях с формами
document.addEventListener('submit', function(e) {
  e.preventDefault();
  return false;
});

// Отключаем стандартное поведение всех кнопок
document.addEventListener('click', function(e) {
  const button = e.target.closest('button');
  if (button) {
    e.preventDefault();
  }
});

// Основная логика для лайков
const likeHeartArray = document.querySelectorAll('.like-icon');
const likeButtonArray = document.querySelectorAll('.card__like-button');
const iconButtonArray = document.querySelectorAll('.card__icon-button');

iconButtonArray.forEach((iconButton, index) => {
  iconButton.onclick = (event) => {
    event.preventDefault();
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
    return false;
  };
});

likeButtonArray.forEach((button, index) => {
  button.onclick = (event) => {
    event.preventDefault();
    toggleIsLiked(likeHeartArray[index], button);
    return false;
  };
});

function toggleIsLiked(heart, button) {
  heart.classList.toggle('is-liked');
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  if ([...heart.classList].includes('is-liked')) {
    setTimeout(
      () => (button.querySelector('.button__text').textContent = 'Unlike'),
      500
    );
  } else {
    setTimeout(
      () => (button.querySelector('.button__text').textContent = 'Like'),
      500
    );
  }
}

// Специально для кнопки Сохранить на память
const saveButton = document.querySelector('.button__save');
if (saveButton) {
  saveButton.onclick = function(event) {
    event.preventDefault();
    const modal = document.getElementById('save__modal');
    if (modal) {
      modal.showModal();
    }
    return false;
  };
}

// Специально для кнопки ОК
const okButton = document.querySelector('.button__OK');
if (okButton) {
  okButton.onclick = function(event) {
    event.preventDefault();
    const modal = document.getElementById('save__modal');
    if (modal) {
      modal.close();
    }
    return false;
  };
}
