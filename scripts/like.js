/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

// Глобальное предотвращение перезагрузки страницы
(function() {
  // Предотвращаем отправку любых форм
  document.addEventListener('submit', function(e) {
    e.preventDefault();
    return false;
  }, true);
  
  // Предотвращаем стандартное поведение всех кнопок
  document.addEventListener('click', function(e) {
    const button = e.target.closest('button');
    if (button) {
      e.preventDefault();
    }
  }, true);
})();

// Основная логика при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
  
  const likeHeartArray = document.querySelectorAll('.like-icon');
  const likeButtonArray = document.querySelectorAll('.card__like-button');
  const iconButtonArray = document.querySelectorAll('.card__icon-button');

  // Обработчики для иконок сердечек
  iconButtonArray.forEach((iconButton, index) => {
    iconButton.addEventListener('click', function(event) {
      event.preventDefault();
      if (likeHeartArray[index] && likeButtonArray[index]) {
        toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
      }
    });
  });

  // Обработчики для кнопок Like
  likeButtonArray.forEach((button, index) => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      if (likeHeartArray[index]) {
        toggleIsLiked(likeHeartArray[index], button);
      }
    });
  });

  function toggleIsLiked(heart, button) {
    heart.classList.toggle('is-liked');
    setButtonText(heart, button);
  }

  function setButtonText(heart, button) {
    const textElement = button.querySelector('.button__text');
    if (!textElement) return;
    
    if (heart.classList.contains('is-liked')) {
      setTimeout(() => {
        textElement.textContent = 'Unlike';
      }, 500);
    } else {
      setTimeout(() => {
        textElement.textContent = 'Like';
      }, 500);
    }
  }
  
  // Убеждаемся, что кнопка Сохранить на память работает правильно
  const saveButton = document.querySelector('.button__save');
  if (saveButton) {
    // Сохраняем оригинальный обработчик
    const originalOnClick = saveButton.onclick;
    
    // Добавляем свой обработчик
    saveButton.addEventListener('click', function(event) {
      event.preventDefault();
      const modal = document.getElementById('save__modal');
      if (modal) {
        modal.showModal();
      }
    });
  }
  
  // Убеждаемся, что кнопка OK работает правильно
  const okButton = document.querySelector('.button__OK');
  if (okButton) {
    okButton.addEventListener('click', function(event) {
      event.preventDefault();
      const modal = document.getElementById('save__modal');
      if (modal) {
        modal.close();
      }
    });
  }
});
