/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
*/

// Ждем полной загрузки страницы
window.addEventListener('load', function() {
  
  // 1. Полностью отключаем перезагрузку для всех форм
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      return false;
    });
  });
  
  // 2. Для всех кнопок отключаем стандартное поведение
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });
  
  // 3. Логика для лайков
  const likeHearts = document.querySelectorAll('.like-icon');
  const likeButtons = document.querySelectorAll('.card__like-button');
  const iconButtons = document.querySelectorAll('.card__icon-button');
  
  // Обработчики для иконок
  iconButtons.forEach((iconBtn, idx) => {
    iconBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (likeHearts[idx] && likeButtons[idx]) {
        likeHearts[idx].classList.toggle('is-liked');
        updateButtonText(likeHearts[idx], likeButtons[idx]);
      }
    });
  });
  
  // Обработчики для кнопок Like
  likeButtons.forEach((btn, idx) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (likeHearts[idx]) {
        likeHearts[idx].classList.toggle('is-liked');
        updateButtonText(likeHearts[idx], btn);
      }
    });
  });
  
  function updateButtonText(heart, btn) {
    const textSpan = btn.querySelector('.button__text');
    if (!textSpan) return;
    
    if (heart.classList.contains('is-liked')) {
      setTimeout(() => { textSpan.textContent = 'Unlike'; }, 500);
    } else {
      setTimeout(() => { textSpan.textContent = 'Like'; }, 500);
    }
  }
  
  // 4. Явно обрабатываем кнопку "Сохранить на память"
  const saveBtn = document.querySelector('.button__save');
  if (saveBtn) {
    saveBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = document.getElementById('save__modal');
      if (modal) {
        modal.showModal();
      }
    });
  }
  
  // 5. Явно обрабатываем кнопку "OK"
  const okBtn = document.querySelector('.button__OK');
  if (okBtn) {
    okBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = document.getElementById('save__modal');
      if (modal) {
        modal.close();
      }
    });
  }
  
});

// 6. Дополнительная защита на уровне документа
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
    e.preventDefault();
  }
}, true);

document.addEventListener('submit', function(e) {
  e.preventDefault();
}, true);
