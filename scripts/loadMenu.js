//загрузка nav меню на страницы
document.addEventListener('DOMContentLoaded', function () {
  fetch('/partials/menu.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('menu').innerHTML = data;
    })
    .catch(error => console.log('Ошибка загрузки меню:', error));
});