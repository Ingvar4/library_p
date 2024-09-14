//загрузка footer на страницы
let loadFooter = `
  <footer> 
    <p>©Copyright 2024 by nobody. All rights reversed.</p>
  </footer>
`;

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('footer').innerHTML = loadFooter;
});