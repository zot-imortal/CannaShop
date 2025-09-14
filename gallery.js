document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('modal');
  const modalImage = document.querySelector('.modal-image');
  const modalCaption = document.querySelector('.modal-caption');
  const closeModal = document.querySelector('.close-modal');

  // Анимация появления изображений
  galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    setTimeout(() => {
      item.style.transition = 'opacity 0.5s ease-in-out';
      item.style.opacity = '1';
    }, index * 200); // Задержка для эффекта последовательности
  });

  // Открытие модального окна при клике
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-image');
      const overlayText = item.querySelector('.gallery-overlay p').textContent;
      modalImage.src = img.src;
      modalCaption.textContent = overlayText;
      modal.style.display = 'block';
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease-in-out';
        modal.style.opacity = '1';
      }, 50);
    });
  });

  // Закрытие модального окна
  closeModal.addEventListener('click', () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  });

  // Закрытие при клике вне изображения
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  });
});