//загрузка nav меню на страницы
let loadMenu = `
  <header class="main-header-top">
    <div class="header-logo">
      <img src="../../images/image2.png">
    </div>
    
    <ul>
      <li><a href="../../index.html">Home</a></li>
      <li><a href="../../pages/html.html">HTML</a></li>
      <li><a href="../../pages/css.html">CSS</a></li>
      <li><a href="../../pages/js.html">JS</a></li>
    </ul>
  </header>
`;

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('menu').innerHTML = loadMenu;
});