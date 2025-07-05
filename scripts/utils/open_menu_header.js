export function openHeaderMenu () {
  const burger = document.querySelector('.burger-menu');
  const menu = document.querySelector('.header-menu');
  const closeBtn = document.querySelector('.close-menu');
  const overlay = document.querySelector('.overlay');
  const body = document.body;

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('active');
    body.classList.add('menu-open');
  }

  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  }

  burger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
}