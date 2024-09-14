//загрузка nav меню на страницы
export function loadMenu() {
  fetch('/partials/menu.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('menu').innerHTML = data;
    })
    .catch(error => console.log('Ошибка загрузки меню:', error));
}