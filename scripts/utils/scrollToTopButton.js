export function scrollToTopButton () {
  const btn = document.getElementById('scrollToTopButton');

  btn.addEventListener('click', scrollToTop);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY > 700) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });
}