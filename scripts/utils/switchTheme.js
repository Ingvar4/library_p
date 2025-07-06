export function switchTheme () {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  // Проверка: сохранённая тема в localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else {
    // Если темы нет, смотрим системную настройку
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  // Обработчик переключения темы
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
} 