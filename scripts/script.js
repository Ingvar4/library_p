/*
САЙДБАР СТАТЬИ. ПЛАВНАЯ ПРОКРУТКА.
*/

document.addEventListener("DOMContentLoaded", function() {
  const sidebarLinks = document.querySelectorAll(".sidebar a");
  const sections = document.querySelectorAll("h3");

  // Функция для прокрутки к нужной секции по клику
  sidebarLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth"
      });
    });
  });

  // Функция для изменения активной ссылки
  function setActiveLink() {
    sidebarLinks.forEach(link => {
      link.classList.remove("active");
    });
    if (currentSection) {
      document.querySelector(`.sidebar a[href="#${currentSection.id}"]`).classList.add("active");
    }
  }

  // Используем IntersectionObserver для отслеживания активных секций
  let currentSection = null;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentSection = entry.target;
        setActiveLink();
      }
    });
  }, { threshold: 0.7 });

  sections.forEach(h3 => {
    observer.observe(h3);
  });
});

