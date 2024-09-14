//загрузка footer на страницы
export function loadFooter() {
  fetch('/partials/footer.txt')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.log('Ошибка загрузки меню:', error));
}